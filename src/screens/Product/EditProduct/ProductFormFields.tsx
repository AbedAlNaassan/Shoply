import React from 'react';
import {Text, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';

type Props = {
  control: any;
  errors: any;
  styles: any;
};

const ProductFormFields: React.FC<Props> = ({control, errors, styles}) => {
  return (
    <>
      {/* Product Name */}
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

      {/* Description */}
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
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      {/* Price */}
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

export default ProductFormFields;
