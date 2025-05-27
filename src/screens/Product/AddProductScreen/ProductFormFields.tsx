import React from 'react';
import {TextInput, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import {Control, FieldErrors} from 'react-hook-form';
import {ProductForm} from './productTypes';

type ProductFormFieldsProps = {
  control: Control<ProductForm>;
  errors: FieldErrors<ProductForm>;
  styles: any;
};

export const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  control,
  errors,
  styles,
}) => {
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            placeholderTextColor="gray"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        name="description"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="gray"
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Controller
        name="price"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="gray"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}
    </>
  );
};
