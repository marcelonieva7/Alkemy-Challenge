import React, { useEffect, useState } from 'react';
import { Center, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import List from '../components/List';
import { getAllOperations } from '../api';

const Home = () => {
  const [datos, setDatos] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, total } = await getAllOperations(10);

        setDatos(data);
        setBalance(total);
      } catch (err) {
        alert(err.message);
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
      {datos.map((dat, idx) => (
        <List key={idx} idx={idx} {...dat} />
      ))}
      {loading ? (
        <Center>
          <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
        </Center>
      ) : !datos.length ? (
        <h2>Vacio</h2>
      ) : (
        <Heading my="3" size="md" textAlign="right">
          Balance total ${balance}
        </Heading>
      )}
    </>
  );
};

export default Home;
