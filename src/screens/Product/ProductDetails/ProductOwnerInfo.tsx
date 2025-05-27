import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';

interface ProductOwnerInfoProps {
  user: {
    email: string;
  };
  onEmailOwner: () => void;
  styles: any;
}

const ProductOwnerInfo: React.FC<ProductOwnerInfoProps> = ({
  user,
  onEmailOwner,
  styles,
}) => {
  const width = Dimensions.get('window').width;

  return (
    <View
      style={{
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
      }}>
      <Text style={[styles.title, {fontSize: width * 0.05}]}>
        Owner Details
      </Text>
      <Text
        style={[
          styles.description,
          {fontSize: width * 0.045, marginVertical: 5},
        ]}>
        Email: {user.email}
      </Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#007AFF', marginTop: 10}]}
        onPress={onEmailOwner}>
        <Text style={[styles.buttonText, {color: 'white'}]}>Email Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductOwnerInfo;
