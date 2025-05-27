// ProductList/ProductListFooter.tsx
import React from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

interface ProductListFooterProps {
  loading: boolean;
  hasNextPage: boolean;
  productsLength: number;
  onLoadMore: () => void;
}

const withErrorBoundary = (WrappedComponent: React.ComponentType<any>) => {
  return class ErrorBoundary extends React.Component<any, {hasError: boolean}> {
    state = {hasError: false};

    static getDerivedStateFromError() {
      return {hasError: true};
    }

    render() {
      if (this.state.hasError) {
        return null; // Or render a fallback UI
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

ProductListFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  productsLength: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default withErrorBoundary(ProductListFooter);
