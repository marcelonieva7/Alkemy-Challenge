import React, { useEffect, useState, useReducer } from 'react';
import { Center, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';

import List from '../components/List';
import AdminModal from '../components/AdminModal';
import AdminAlert from '../components/AdminAlert';
import { getAllExpenses, getAllIncomes } from '../api';

const Operations = () => {
  const initialState = {
    incomes: [],
    expenses: [],
    isLoading: true,
    error: null,
  };

  const reducer = (state, action) => {
    const { type } = action;

    switch (type) {
      case 'GET_DATA_OK': {
        return {
          ...state,
          incomes: action.payload.incomes,
          expenses: action.payload.expenses,
          isLoading: false,
          error: null,
        };
      }
      case 'UPDATE_INCOME_OK': {
        const updatedIncomes = state.incomes.map((income) => {
          if (income.id === action.payload.id) return action.payload;

          return income;
        });

        return {
          ...state,
          incomes: updatedIncomes,
          isLoading: false,
          error: null,
        };
      }
      case 'UPDATE_EXPENSE_OK': {
        const updatedExpenses = state.expenses.map((expense) => {
          if (expense.id === action.payload.id) return action.payload;

          return expense;
        });

        return {
          ...state,
          expenses: updatedExpenses,
          isLoading: false,
          error: null,
        };
      }
      case 'SAVE_INCOME_OK': {
        const updatedIncomes = [action.payload, ...state.incomes].sort((a, b) => {
          return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
        });

        return {
          ...state,
          incomes: updatedIncomes,
          isLoading: false,
          error: null,
        };
      }
      case 'SAVE_EXPENSE_OK': {
        const updatedExpenses = [action.payload, ...state.expenses].sort((a, b) => {
          return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
        });

        return {
          ...state,
          expenses: updatedExpenses,
          isLoading: false,
          error: null,
        };
      }
      case 'DELETE_INCOME_OK': {
        const updatedIncomes = state.incomes.filter(({ id }) => id !== action.payload);

        return {
          ...state,
          incomes: updatedIncomes,
          isLoading: false,
          error: null,
        };
      }
      case 'DELETE_EXPENSE_OK': {
        const updatedExpenses = state.expenses.filter(({ id }) => id !== action.payload);

        return {
          ...state,
          expenses: updatedExpenses,
          isLoading: false,
          error: null,
        };
      }
      case 'GET_DATA_ERROR': {
        return {
          ...state,
          expenses: [],
          incomes: [],
          isLoading: false,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { incomes, expenses, isLoading, error } = state;

  const [operation, setOperation] = useState({});
  const [editModal, setEditModal] = useState(true);
  const [category, setCategory] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

  const onOpenModal = (_id, isEdit, type) => {
    const finOperation = _id
      ? type === 'ingreso'
        ? incomes.find(({ id }) => id === _id)
        : expenses.find(({ id }) => id === _id)
      : {};

    setOperation(finOperation);
    setEditModal(isEdit);
    onOpen();
  };

  const onOpenAlert = (id, type) => {
    setOperation({ id, type });
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
        const { data: incomes } = await getAllIncomes();
        const { data: expenses } = await getAllExpenses(category);

        dispatch({ type: 'GET_DATA_OK', payload: { incomes, expenses } });
      } catch (err) {
        dispatch({ type: 'GET_DATA_ERROR', payload: err });
      }
    };

    fetchData();
  }, [category]);

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
            {incomes.map((dat, idx) => (
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
              !incomes.length && (
                <Center>
                  <Heading>Sin Operaciones</Heading>
                </Center>
              )
            )}
          </TabPanel>
          <TabPanel>
            <FormControl colSpan={6}>
              <FormLabel
                color={useColorModeValue('gray.700', 'gray.50')}
                fontSize="sm"
                fontWeight="md"
                htmlFor="expenseCategory"
              >
                Categoria
              </FormLabel>
              <InputGroup mb={3} size="sm">
                <Select
                  focusBorderColor="brand.400"
                  id="expenseCategory"
                  mt={1}
                  name="expenseCategory"
                  rounded="md"
                  shadow="sm"
                  size="sm"
                  value={String(category)}
                  onChange={({ target }) => setCategory(Number(target.value))}
                >
                  <option disabled>Categoria</option>
                  <option value="0">Todas</option>
                  <option value="1">Libreria</option>
                  <option value="2">Alimentos</option>
                  <option value="3">Vestimenta</option>
                  <option value="4">Transporte</option>
                  <option value="5">Otro</option>
                </Select>
              </InputGroup>
            </FormControl>
            {expenses.map((dat, idx) => (
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
              !expenses.length && (
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
        type={operation.type}
        onClose={onClose1}
      />
      <AdminModal
        dispatch={dispatch}
        edit={editModal}
        isOpen={isOpen}
        operation={operation}
        setCategory={setCategory}
        onClose={onClose}
      />
    </>
  );
};

export default Operations;
