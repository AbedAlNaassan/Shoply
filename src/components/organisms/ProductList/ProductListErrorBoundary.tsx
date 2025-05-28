import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

interface ProductListErrorBoundaryProps {
  children: React.ReactNode;
}

interface ProductListErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ProductListErrorBoundary extends React.Component<
  ProductListErrorBoundaryProps,
  ProductListErrorBoundaryState
> {
  state: ProductListErrorBoundaryState = {hasError: false};

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ProductList Error Boundary caught:', error, errorInfo);
    // You could also log this to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorBoundaryContainer}>
          <Text style={styles.errorBoundaryText}>
            Something went wrong. Please try again later.
          </Text>
          {this.state.error && (
            <Text style={styles.errorBoundaryDebugText}>
              Error: {this.state.error.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

export default ProductListErrorBoundary;
