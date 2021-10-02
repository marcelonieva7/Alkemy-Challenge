import React from 'react';
import {
  Box,
  Stack,
  SimpleGrid,
  GridItem,
  Button,
  useColorModeValue,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  chakra,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import operationModel from '../models/operations.model';

const AdminForm = ({ operation, onSubmit, setDate, date, edit }) => {
  const dateParse = date.toISOString().slice(0, 10);
  const { amount, typeOf, description } = operation || {};
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: joiResolver(operationModel) });

  return (
    <Box mt={2}>
      <Box colSpan={{ md: 2 }} mt={[5, null, 0]}>
        <chakra.form
          overflow={{ sm: 'hidden' }}
          rounded={[null, 'md']}
          shadow="base"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack
            bg={useColorModeValue('white', 'gray.700')}
            p={[null, 6]}
            px={4}
            py={5}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={6} isInvalid={errors.typeOf}>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.50')}
                  fontSize="sm"
                  fontWeight="md"
                  htmlFor="typeOf"
                >
                  Tipo
                </FormLabel>
                <InputGroup size="sm">
                  <Select
                    defaultValue={typeOf}
                    focusBorderColor="brand.400"
                    id="typeOf"
                    mt={1}
                    name="typeOf"
                    rounded="md"
                    shadow="sm"
                    size="sm"
                    w="full"
                    {...register('typeOf')}
                  >
                    <option disabled>Tipo de operacion</option>
                    <option disabled={typeOf !== 'expense' && edit} value="expense">
                      Gasto
                    </option>
                    <option disabled={typeOf !== 'income' && edit} value="income">
                      Ingreso
                    </option>
                  </Select>
                </InputGroup>
                <FormErrorMessage>{errors.typeOf && errors.typeOf.message}</FormErrorMessage>
              </FormControl>
              <FormControl as={GridItem} colSpan={6} isInvalid={errors.amount}>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.50')}
                  fontSize="sm"
                  fontWeight="md"
                  htmlFor="amount"
                >
                  Monto
                </FormLabel>
                <Input
                  defaultValue={amount}
                  focusBorderColor="brand.400"
                  id="amount"
                  mt={1}
                  name="amount"
                  placeholder="Ej 1050"
                  rounded="md"
                  shadow="sm"
                  size="sm"
                  w="full"
                  {...register('amount')}
                />
                <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
              </FormControl>
              <FormControl as={GridItem} colSpan={6} isInvalid={errors.description}>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.50')}
                  fontSize="sm"
                  fontWeight="md"
                  htmlFor="description"
                >
                  Concepto
                </FormLabel>
                <Input
                  defaultValue={description}
                  focusBorderColor="brand.400"
                  id="description"
                  mt={1}
                  name="description"
                  placeholder="Ej. comida"
                  rounded="md"
                  shadow="sm"
                  size="sm"
                  type="text"
                  w="full"
                  {...register('description')}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl as={GridItem} colSpan={6} isInvalid={errors.created_at}>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.50')}
                  fontSize="sm"
                  fontWeight="md"
                >
                  Fecha
                </FormLabel>
                <SingleDatepicker date={date} name="date-input" onDateChange={setDate} />
                <Input
                  defaultValue={dateParse}
                  display="none"
                  focusBorderColor="brand.400"
                  id="created_at"
                  mt={1}
                  name="created_at"
                  placeholder="Ej. comida"
                  rounded="md"
                  shadow="sm"
                  size="sm"
                  type="date"
                  w="full"
                  {...register('created_at')}
                />
                <FormErrorMessage>
                  {errors.created_at && errors.created_at.message}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </Stack>
          <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            px={{ base: 4, sm: 6 }}
            py={3}
            textAlign="right"
          >
            <Button _focus={{ shadow: '' }} fontWeight="md" isLoading={isSubmitting} type="submit">
              Enviar
            </Button>
          </Box>
        </chakra.form>
      </Box>
    </Box>
  );
};

export default AdminForm;
