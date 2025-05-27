// ProductList/types.ts
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types/types';

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

export interface ProductImage {
  url: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  images: ProductImage[];
}

export interface ProductListProps {
  scrollEnabled?: boolean;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
  };
}
