import React, { useEffect, useState } from 'react';
import { Center, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import List from '../components/List';
import { getAllOperations } from '../api';

const Operations = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const onOpenModal = (id) => {
    alert('edit ' + id);
  };

  const onOpenAlert = (id) => {
    alert('delete ' + id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllOperations();

        setDatos(data);
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
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Ingresos</Tab>
          <Tab>Gastos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {datos.map((dat, idx) => {
              if (dat.typeOf === 'income')
                return (
                  <List
                    key={idx}
                    admin
                    idx={idx}
                    onOpenAlert={onOpenAlert}
                    onOpenModal={onOpenModal}
                    {...dat}
                  />
                );
            })}
            {loading ? (
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
              !datos.length && (
                <Center>
                  <Heading>Sin Operaciones</Heading>
                </Center>
              )
            )}
          </TabPanel>
          <TabPanel>
            {datos.map((dat, idx) => {
              if (dat.typeOf === 'expense')
                return (
                  <List
                    key={idx}
                    admin
                    idx={idx}
                    onOpenAlert={onOpenAlert}
                    onOpenModal={onOpenModal}
                    {...dat}
                  />
                );
            })}
            {loading ? (
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
              !datos.length && (
                <Center>
                  <Heading>Sin Operaciones</Heading>
                </Center>
              )
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Operations;
