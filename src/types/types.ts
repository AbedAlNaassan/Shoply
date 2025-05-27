export type RootStackParamList = {
  Home: {screen: string};
  Login: {screen: string};
  Welcome: undefined;
  Register: {screen: string};
  ProductList: {screen: string};
  ProductDetails: {id: string};
  Verification: undefined;
  Forgot: undefined;
  Profile: undefined;
  AddProduct: undefined;
  Camera: {
    onPhotoTaken: (photoUri: string) => void;
  };
  EditProduct: {id: string};
  Search: undefined;
  Cart: undefined;
};

export type RefreshTokenRequest = {
  refreshToken: string;
  token_expires_in?: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export interface Products {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: {url: string}[];
  user: {
    _id: string;
    email: string;
    username?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
