import React, { useEffect, useState } from 'react';
import { Center, Heading, useDisclosure, Spinner } from '@chakra-ui/react';

import List from '../components/List';
import AdminAlert from '../components/AdminAlert';
import { getAllOperations } from '../api';
import localCurrency from '../utils/localCurrency';

const Home = () => {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error, onOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, total } = await getAllOperations(10);

        setOperations(data);
        setBalance(localCurrency.format(total.incomes - total.expenses));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Center my="6">
        <Heading>Ultimas diez operaciones</Heading>
      </Center>
      {operations.map((dat, idx) => (
        <List key={idx} idx={idx} {...dat} />
      ))}
      {loading ? (
        <Center>
          <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
        </Center>
      ) : !operations.length ? (
        <h2>Sin Operaciones</h2>
      ) : (
        <Heading my="3" size="md" textAlign="right">
          Balance total {balance}
        </Heading>
      )}
      <AdminAlert error={error} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
