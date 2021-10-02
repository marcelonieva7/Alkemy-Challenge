import React, { useEffect, useState, useReducer } from 'react';
import { Center, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, Button } from '@chakra-ui/react';

import List from '../components/List';
import AdminModal from '../components/AdminModal';
import AdminAlert from '../components/AdminAlert';
import { getAllOperations } from '../api';

const Operations = () => {
  const initialState = {
    operations: [],
    isLoading: true,
    error: null,
  };

  const reducer = (state, action) => {
    const { type } = action;

    switch (type) {
      case 'GET_DATA_OK': {
        return {
          ...state,
          operations: action.payload,
          isLoading: false,
          error: null,
        };
      }
      case 'UPDATE_DATA_OK': {
        const updatedOperations = state.operations.map((operation) => {
          if (operation.id === action.payload.id) return action.payload;

          return operation;
        });

        return {
          ...state,
          operations: updatedOperations,
          isLoading: false,
          error: null,
        };
      }
      case 'SAVE_DATA_OK': {
        const updatedOperations = [action.payload, ...state.operations].sort((a, b) => {
          return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
        });

        return {
          ...state,
          operations: updatedOperations,
          isLoading: false,
          error: null,
        };
      }
      case 'DELETE_DATA_OK': {
        const updatedOperations = state.operations.filter(({ id }) => id !== action.payload);

        return {
          ...state,
          operations: updatedOperations,
          isLoading: false,
          error: null,
        };
      }
      case 'GET_DATA_ERROR': {
        return {
          ...state,
          operations: [],
          isLoading: false,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { operations, isLoading, error } = state;

  const [operation, setOperation] = useState({});
  const [editModal, setEditModal] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

  const onOpenModal = (_id, isEdit) => {
    const finOperation = _id ? operations.find(({ id }) => id === _id) : {};

    setOperation(finOperation);
    setEditModal(isEdit);
    onOpen();
  };

  const onOpenAlert = (id) => {
    setOperation({ id });
    onOpen1();
  };

  useEffect(() => {
    if (error) {
      onOpen1();
    }
  }, [error, onOpen1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllOperations();

        dispatch({ type: 'GET_DATA_OK', payload: data });
      } catch (err) {
        dispatch({ type: 'GET_DATA_ERROR', payload: err });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Button alignSelf="flex-end" my="6" onClick={() => onOpenModal(null, false)}>
        Crear nueva operación
      </Button>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Ingresos</Tab>
          <Tab>Gastos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {operations
              .filter(({ typeOf }) => typeOf === 'income')
              .map((dat, idx) => (
                <List
                  key={idx}
                  admin
                  idx={idx}
                  onOpenAlert={onOpenAlert}
                  onOpenModal={onOpenModal}
                  {...dat}
                />
              ))}
            {isLoading ? (
              <Center>
                <Spinner
                  color="blue.500"
                  emptyColor="gray.200"
                  size="xl"
                  speed="0.65s"
                  thickness="4px"
                />
              </Center>
            ) : (
              !operations.length && (
                <Center>
                  <Heading>Sin Operaciones</Heading>
                </Center>
              )
            )}
          </TabPanel>
          <TabPanel>
            {operations
              .filter(({ typeOf }) => typeOf === 'expense')
              .map((dat, idx) => (
                <List
                  key={idx}
                  admin
                  idx={idx}
                  onOpenAlert={onOpenAlert}
                  onOpenModal={onOpenModal}
                  {...dat}
                />
              ))}
            {isLoading ? (
              <Center>
                <Spinner
                  color="blue.500"
                  emptyColor="gray.200"
                  size="xl"
                  speed="0.65s"
                  thickness="4px"
                />
              </Center>
            ) : (
              !operations.length && (
                <Center>
                  <Heading>Sin Operaciones</Heading>
                </Center>
              )
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <AdminAlert
        dispatch={dispatch}
        error={error}
        id={operation.id}
        isOpen={isOpen1}
        onClose={onClose1}
      />
      <AdminModal
        dispatch={dispatch}
        edit={editModal}
        isOpen={isOpen}
        operation={operation}
        onClose={onClose}
      />
    </>
  );
};

export default Operations;
