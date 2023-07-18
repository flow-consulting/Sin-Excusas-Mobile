// src/hooks/useAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import dbManager from '../interfaces/DatabaseManager';
import { User } from '../interfaces/User';
import { useNeighborhood } from './useNeighborhood';

export const useAuth = () => {
  const { setIsLoggedIn, setUserId } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const { assignNeighborhood, setNeighborhoodId } = useNeighborhood();

  useEffect(() => {
    const init = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setUserId(user.id);
        setIsLoggedIn(true);
        setNeighborhoodId(user.neighborhoodId);
      }
      setInitializing(false);
    };
    init();
  }, []);

  const login = async (whatsAppNumber: string) => {
    try {
      // Get the user from the database
      const user = await dbManager.get(
        'users',
        'whatsAppNumber',
        whatsAppNumber,
      );
      
      // Log the value of user to the console
      console.log('useAuth login user:', user);

      if (user) {
        // Save the user information to local storage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        
        // Update the user state
        setUser(user);
        
        // Update the userId state in the AuthContext
        setUserId(user.id);
        
        // Update the isLoggedIn state in the AuthContext
        setIsLoggedIn(true);
        
        // Update the neighborhoodId state in the NeighborhoodContext
        setNeighborhoodId(user.neighborhoodId);

        // Return the user object
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const register = async (
    fullName: string,
    whatsAppNumber: string,
    isAdmin: boolean,
  ) => {
    // Create a new user object
    const newUser: User & { neighborhoodId?: string; id?: string } = {
      fullName,
      whatsAppNumber,
      isAdmin,
    };
    
    // Assign a neighborhood to the user
    const neighborhoodId = await assignNeighborhood(newUser);
    
    // Add the neighborhoodId to the newUser object
    newUser.neighborhoodId = neighborhoodId;
    
    // Save the new user to the database and get the generated ID
    const userId = await dbManager.add('users', newUser);
    
    // Add the generated ID to the newUser object
    newUser.id = userId;
    
    // Update the userId state in the AuthContext
    setUserId(newUser.id);
    
    // Save the user information to local storage
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    
    // Update the isLoggedIn state in the AuthContext
    setIsLoggedIn(true);
    
    // Update the neighborhoodId state in the NeighborhoodContext
    setNeighborhoodId(neighborhoodId);
  };

  const logout = async () => {
    // Remove the user information from local storage
    await AsyncStorage.removeItem('user');
    
    // Update the user state
    setUser(null);
    
    // Update the isLoggedIn state in the AuthContext
    setIsLoggedIn(false);
  };

  return { login, register, logout, user, initializing };
};
