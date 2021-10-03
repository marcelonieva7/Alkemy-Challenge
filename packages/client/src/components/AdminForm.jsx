/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  const { amount, type, description, category_id } = operation || {};
  const [showCategories, setShowCategories] = useState(type === 'gasto');

  const color = useColorModeValue('gray.700', 'gray.50');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: joiResolver(operationModel) });

  const handleChange = ({ value }) => {
    value === 'gasto' ? setShowCategories(true) : setShowCategories(false);
  };

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
              <FormControl as={GridItem} colSpan={6} isInvalid={errors.type}>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.50')}
                  fontSize="sm"
                  fontWeight="md"
                  htmlFor="type"
                >
                  Tipo
                </FormLabel>
                <InputGroup size="sm">
                  <Select
                    defaultValue={type}
                    focusBorderColor="brand.400"
                    id="type"
                    mt={1}
                    name="type"
                    rounded="md"
                    shadow="sm"
                    size="sm"
                    w="full"
                    {...register('type', { onChange: ({ target }) => handleChange(target) })}
                  >
                    <option disabled>Tipo de operacion</option>
                    <option disabled={type !== 'ingreso' && edit} value="ingreso">
                      Ingreso
                    </option>
                    <option disabled={type !== 'gasto' && edit} value="gasto">
                      Gasto
                    </option>
                  </Select>
                </InputGroup>
                <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
              </FormControl>
              {showCategories && (
                <FormControl as={GridItem} colSpan={6} isInvalid={errors.category_id}>
                  <FormLabel color={color} fontSize="sm" fontWeight="md" htmlFor="category_id">
                    Categoria
                  </FormLabel>
                  <InputGroup size="sm">
                    <Select
                      defaultValue={category_id}
                      focusBorderColor="brand.400"
                      id="category_id"
                      mt={1}
                      name="category_id"
                      rounded="md"
                      shadow="sm"
                      size="sm"
                      {...register('category_id')}
                    >
                      <option disabled>Categoria</option>
                      <option value="1">Libreria</option>
                      <option value="2">Alimentos</option>
                      <option value="3">Vestimenta</option>
                      <option value="4">Transporte</option>
                      <option value="5">Otro</option>
                    </Select>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.category_id && errors.category_id.message}
                  </FormErrorMessage>
                </FormControl>
              )}
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
