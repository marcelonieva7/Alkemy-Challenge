/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import { updateteOperation, saveOperation } from '../api';

import AdminForm from './AdminForm';

const AdminModal = ({ isOpen, onClose, operation, edit, dispatch }) => {
  const { id, created_at } = operation;

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const date = created_at ? new Date(created_at) : new Date();

    setDate(date);
  }, [created_at]);

  const onSubmit = ({ description, amount, typeOf }) => {
    const created_at = date.toISOString();
    const data = {
      description,
      amount,
      created_at,
      typeOf,
    };

    if (edit) {
      const updateData = async (id, data) => {
        try {
          const updated = await updateteOperation(Number(id), data);

          dispatch({ type: 'UPDATE_DATA_OK', payload: updated });
          onClose();
        } catch (err) {
          dispatch({ type: 'GET_DATA_ERROR', payload: err });
        }
      };

      updateData(id, data);

      return;
    }

    const saveData = async (data) => {
      try {
        const saved = await saveOperation(data);

        dispatch({ type: 'SAVE_DATA_OK', payload: saved });
        onClose();
      } catch (err) {
        dispatch({ type: 'GET_DATA_ERROR', payload: err });
      }
    };

    saveData(data);
    onClose();
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{edit ? 'Editar' : 'Crear'} operación</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AdminForm
              date={date}
              edit={edit}
              operation={operation}
              setDate={setDate}
              onSubmit={onSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminModal;
