import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {productSchema, ProductForm, MarkerType} from './productTypes';

export const useProductForm = (initialMarker: MarkerType) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      location: initialMarker,
    },
  });

  return {control, handleSubmit, errors, setValue};
};
