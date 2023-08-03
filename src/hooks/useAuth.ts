// src/hooks/useAuth.ts
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { User } from '../interfaces/User';
import { useAsyncStorage } from './useAsyncStorage';
import useDatabaseData from './useDatabaseData';
import { useNeighborhood } from './useNeighborhood';

export const useAuth = () => {
  const {setIsLoggedIn, setUserId} = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isNeighborhoodColorStored, setIsNeighborhoodColorStored] =
    useState(false);
  const {assignNeighborhoodToNewUser} = useNeighborhood();
  const {
    getItem: getAsyncStorageItem,
    setItem: setAsyncStorageItem,
    removeItem: removeAsyncStorageItem,
  } = useAsyncStorage();

  // Use the useDatabaseData hook to get the user data
  const {get: getUser, add: addUser} = useDatabaseData<User>('users');

  // Use the useDatabaseData hook to get the neighborhood data
  const {get: getNeighborhood} = useDatabaseData<{
    color: string;
  }>('neighborhoods');

  useEffect(() => {
    const init = async () => {
      // Log that the init function is being called
      console.log('useAuth init called');

      const userData = await getAsyncStorageItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);

        console.log('useAuth init setUserId user.id', user.id);
        setUserId(user.id);
        setIsLoggedIn(true);

        // Get neighborhood color from database
        const neighborhoodData = await getNeighborhood(
          'id',
          user.neighborhoodId,
        );
        if (neighborhoodData) {
          const neighborhoodColor = neighborhoodData.color;

          // Store neighborhood color in AsyncStorage
          await setAsyncStorageItem('neighborhoodColor', neighborhoodColor);
          setIsNeighborhoodColorStored(true);

          // Log the value of neighborhoodColor to the console
          console.log('useAuth init neighborhoodColor:', neighborhoodColor);
        }
      }
      setInitializing(false);
    };
    init();
  }, []);

  const login = async (whatsAppNumber: string) => {
    // Log that the login function is being called
    console.log('useAuth login called');

    try {
      // Use the getUser function to get the user data
      const fetchedUserData = await getUser('whatsAppNumber', whatsAppNumber);

      if (fetchedUserData) {
        // Log that the user was retrieved
        console.log('useAuth login fetchedUserData inside if', fetchedUserData);

        // Save the user information to local storage
        await setAsyncStorageItem('user', JSON.stringify(fetchedUserData));
        setUser(fetchedUserData);
        console.log(
          'useAuth login setUserId fetchedUserData.id',
          fetchedUserData.id,
        );
        setUserId(fetchedUserData.id);
        setIsLoggedIn(true);

        // Get neighborhood color from database
        const fetchedNeighborhoodData = await getNeighborhood(
          'id',
          fetchedUserData.neighborhoodId,
        );
        if (fetchedNeighborhoodData) {
          const neighborhoodColor = fetchedNeighborhoodData.color;

          // Store neighborhood color in AsyncStorage
          await setAsyncStorageItem('neighborhoodColor', neighborhoodColor);
          setIsNeighborhoodColorStored(true);

          // Log the value of neighborhoodColor to the console
          console.log('useAuth login neighborhoodColor:', neighborhoodColor);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    fullName: string,
    whatsAppNumber: string,
    isAdmin: boolean,
  ) => {
    // Log the name of the file and the name of the function
    console.log('useAuth.ts - register function called');

    // Log the values of the function arguments
    console.log('useAuth.ts - register - fullName:', fullName);
    console.log('useAuth.ts - register - whatsAppNumber:', whatsAppNumber);
    console.log('useAuth.ts - register - isAdmin:', isAdmin);

    // Create a new user object
    const newUser: User & {neighborhoodId?: string; id?: string} = {
      fullName,
      whatsAppNumber,
      isAdmin,
      id: '',
      neighborhoodId: '',
    };

    // Log the value of the newUser object
    console.log('useAuth.ts - register - newUser:', newUser);

    // Assign a neighborhood to the user
    const neighborhoodId = await assignNeighborhoodToNewUser(newUser);

    // Log the value of the neighborhoodId variable
    console.log('useAuth.ts - register - neighborhoodId:', neighborhoodId);

    // Add the neighborhoodId to the newUser object
    newUser.neighborhoodId = neighborhoodId;

    // Log the value of the newUser variable
    console.log('useAuth.ts - register - newUser:', newUser);

    // Save the new user to the database and get the generated ID
    const storedUser = await addUser(newUser);

    // Log the value of the userId variable
    console.log('useAuth.ts - register - userId:', storedUser);

    // Add the generated ID to the newUser object
    newUser.id = storedUser.id;

    console.log('useAuth register setUserId storedUser', storedUser);
    console.log('useAuth register setUserId newUser.id', newUser.id);

    // Update the userId state in the AuthContext
    setUserId(newUser.id);

    // Save the user information to local storage
    await setAsyncStorageItem('user', JSON.stringify(newUser));

    // Update the isLoggedIn state in the AuthContext
    setIsLoggedIn(true);

    // Get neighborhood color from database
    const neighborhoodData = await getNeighborhood(
      'id',
      newUser.neighborhoodId,
    );

    if (neighborhoodData) {
      const neighborhoodColor = neighborhoodData.color;

      // Store neighborhood color in AsyncStorage
      await setAsyncStorageItem('neighborhoodColor', neighborhoodColor);
      setIsNeighborhoodColorStored(true);

      // Log the value of neighborhoodColor to the console
      console.log('useAuth register neighborhoodColor:', neighborhoodColor);
    }
  };

  const logout = async () => {
    // Log that the logout function is being called
    console.log('useAuth logout called');

    // Remove the user information from local storage
    await removeAsyncStorageItem('user');

    // Update the user state
    setUser(null);

    // Update the userId state in the AuthContext
    setUserId(null);

    // Update the isLoggedIn state in the AuthContext
    setIsLoggedIn(false);

    // Remove neighborhood color from AsyncStorage
    await removeAsyncStorageItem('neighborhoodColor');
    setIsNeighborhoodColorStored(false);
  };

  return {
    login,
    register,
    logout,
    user,
    initializing,
    isNeighborhoodColorStored,
  };
};
