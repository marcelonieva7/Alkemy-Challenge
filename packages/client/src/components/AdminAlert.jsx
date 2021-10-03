import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

import { deleteIncome, deleteExpense } from '../api';

const AdminAlert = ({ isOpen, onClose, dispatch, id, error, type }) => {
  const cancelRef = useRef();

  const deleteData = async (id, type) => {
    if (type === 'ingreso') {
      try {
        const deleted = await deleteIncome(id);

        dispatch({ type: 'DELETE_INCOME_OK', payload: deleted });
        onClose();
      } catch (err) {
        dispatch({ type: 'GET_DATA_ERROR', payload: err });
      }

      return;
    }
    try {
      const deleted = await deleteExpense(id);

      dispatch({ type: 'DELETE_EXPENSE_OK', payload: deleted });
      onClose();
    } catch (err) {
      dispatch({ type: 'GET_DATA_ERROR', payload: err });
    }
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {error ? 'ERROR' : 'Borrar Operacion'}
          </AlertDialogHeader>

          <AlertDialogBody>
            {error ? error.message : `¿Estas seguro de querer eliminar el esta operación?`}
          </AlertDialogBody>

          <AlertDialogFooter>
            {error ? (
              <Button ref={cancelRef} onClick={onClose}>
                Cerrar
              </Button>
            ) : (
              <>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => {
                    deleteData(id, type);
                  }}
                >
                  Borrar
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AdminAlert;
