import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import { updateIncome, updateExpense, saveIncome, saveExpense } from '../api';

import AdminForm from './AdminForm';

const AdminModal = ({
  isOpen,
  onClose,
  operation,
  edit,
  dispatch,
  setExpenseCategory,
  setIncomeCategory,
}) => {
  const { id, created_at } = operation;

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const date = created_at ? new Date(created_at) : new Date();

    setDate(date);
  }, [created_at]);

  const onSubmit = ({ description, amount, type, category_id }) => {
    const created_at = date.toISOString();
    const data = {
      description,
      amount,
      created_at,
      category_id,
    };

    if (edit) {
      if (type === 'ingreso') {
        const updateData = async (id, data) => {
          try {
            const updated = await updateIncome(Number(id), data);

            dispatch({ type: 'UPDATE_INCOME_OK', payload: updated });
            onClose();
            setExpenseCategory(0);
            setIncomeCategory(0);
          } catch (err) {
            dispatch({ type: 'GET_DATA_ERROR', payload: err });
          }
        };

        updateData(id, data);

        return;
      }
      const updateData = async (id, data) => {
        try {
          const updated = await updateExpense(Number(id), data);

          dispatch({ type: 'UPDATE_EXPENSE_OK', payload: updated });
          onClose();
          setExpenseCategory(0);
          setIncomeCategory(0);
        } catch (err) {
          dispatch({ type: 'GET_DATA_ERROR', payload: err });
        }
      };

      updateData(id, data);

      return;
    }

    const saveData = async (data) => {
      if (type === 'ingreso') {
        try {
          const saved = await saveIncome(data);

          dispatch({ type: 'SAVE_INCOME_OK', payload: saved });
          onClose();
          setExpenseCategory(0);
          setIncomeCategory(0);
        } catch (err) {
          dispatch({ type: 'GET_DATA_ERROR', payload: err });
        }

        return;
      }
      try {
        const saved = await saveExpense(data);

        dispatch({ type: 'SAVE_EXPENSE_OK', payload: saved });
        onClose();
        setExpenseCategory(0);
        setIncomeCategory(0);
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
