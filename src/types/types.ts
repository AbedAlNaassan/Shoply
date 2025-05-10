// types.ts (or any file where you store types)
export type RootStackParamList = {
  Home: {screen: string};
  Login: {screen: string};
  Welcome: {screen: string};
  Register: {screen: string};
  ProductList: {screen: string};
  ProductDetails: {id: string};
  Verification: {screen: string};

  // add other screens here as needed
};
