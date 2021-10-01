import React from 'react';
import { Flex, SimpleGrid, useColorModeValue, useBreakpointValue, chakra } from '@chakra-ui/react';

const List = ({ idx, description, typeOf, amount, createdAt }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('gray.500', 'gray.600');
  const bp = useBreakpointValue({ base: 'gray.400', md: bg });

  return (
    <Flex bg={useColorModeValue('white', 'gray.800')} direction={{ base: 'row', md: 'column' }}>
      {useBreakpointValue({ base: true, md: idx === 0 }) && (
        <SimpleGrid
          bg={idx % 2 ? bg : bp}
          color={color}
          columns={{ base: 1, md: 4 }}
          fontSize="md"
          fontWeight="hairline"
          px={{ base: 2, md: 10 }}
          py={{ base: 1, md: 4 }}
          spacingY={3}
          textTransform="uppercase"
          w={{ base: 120, md: 'full' }}
        >
          <span>Tipo</span>
          <chakra.span columns={1} textAlign={{ md: 'center' }}>
            Concepto
          </chakra.span>
          <chakra.span columns={1} textAlign={{ md: 'center' }}>
            Fecha
          </chakra.span>
          <chakra.span columns={1} textAlign={{ md: 'right' }}>
            Monto
          </chakra.span>
        </SimpleGrid>
      )}
      <SimpleGrid
        bg={idx % 2 ? bg : 'gray.400'}
        columns={{ base: 1, md: 4 }}
        fontWeight="hairline"
        px={10}
        py={2}
        spacingY={3}
        w="full"
      >
        <span>{typeOf === 'income' ? 'Ingreso' : 'Gasto'}</span>
        <chakra.span
          overflow="hidden"
          textAlign={{ md: 'center' }}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {description}
        </chakra.span>
        <chakra.span
          overflow="hidden"
          textAlign={{ md: 'center' }}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {createdAt}
        </chakra.span>
        <chakra.span
          overflow="hidden"
          textAlign={{ md: 'right' }}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {amount}
        </chakra.span>
      </SimpleGrid>
    </Flex>
  );
};

export default List;
