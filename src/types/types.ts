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
};

export type RefreshTokenRequest = {
  refreshToken: string;
  token_expires_in?: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
