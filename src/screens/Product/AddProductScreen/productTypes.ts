import {z} from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  location: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type ProductForm = z.infer<typeof productSchema>;

export type MarkerType = {
  name: string;
  latitude: number;
  longitude: number;
};

export type AssetType = {
  uri?: string;
  fileName?: string;
  type?: string;
  width?: number;
  height?: number;
};
