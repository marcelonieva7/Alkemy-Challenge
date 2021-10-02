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

import { deleteOperation } from '../api';

const AdminAlert = ({ isOpen, onClose, dispatch, id, error }) => {
  const cancelRef = useRef();

  const deleteData = async (id) => {
    try {
      const deleted = await deleteOperation(id);

      dispatch({ type: 'DELETE_DATA_OK', payload: deleted });
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
                    deleteData(id);
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
