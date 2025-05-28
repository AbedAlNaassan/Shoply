import React from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import {styles} from './styles';

interface ProductListFooterProps {
  loading: boolean;
  hasNextPage: boolean;
  productsLength: number;
  onLoadMore: () => void;
}

const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentType<P> => {
  return class ErrorBoundary extends React.Component<P, {hasError: boolean}> {
    state = {hasError: false};

    static getDerivedStateFromError() {
      return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

const ProductListFooter: React.FC<ProductListFooterProps> = ({
  loading,
  hasNextPage,
  productsLength,
  onLoadMore,
}) => {
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        testID="loading-indicator"
      />
    );
  }

  if (hasNextPage && productsLength > 0) {
    return (
      <View style={styles.loadMoreButton}>
        <Button
          title="Load More"
          onPress={onLoadMore}
          testID="load-more-button"
        />
      </View>
    );
  }

  return null;
};

export default withErrorBoundary(ProductListFooter);
