import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const NeighborhoodScreen = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();
  const {user, initializing} = useAuth();

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  if (initializing) {
    return null;
  }

  return (
    <View>
      <Text>NeighborhoodScreen</Text>
      {isAdmin && (
        <Button
          title="Create New Neighborhood"
          onPress={() => navigation.navigate('CreateNeighborhoodScreen')}
        />
      )}
    </View>
  );
};

export default NeighborhoodScreen;
