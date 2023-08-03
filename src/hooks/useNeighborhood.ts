// src/hooks/useNeighborhood.ts
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import dbManager from '../interfaces/DatabaseManager';
import { Neighborhood } from '../interfaces/Neighborhood';
import { User } from '../interfaces/User';

export const useNeighborhood = () => {
  const {neighborhoodId} = useContext(AuthContext);

  const getNeighborhoodInfo = async () => {
    // Get the neighborhood from the database
    const neighborhood = await dbManager.get<Neighborhood>(
      'neighborhoods',
      'id',
      neighborhoodId,
    );

    // Return the neighborhood object
    return neighborhood;
  };

  const assignNeighborhoodToNewUser = async (user: User): Promise<string> => {
    // Log the value of user to the console
    // console.log('useNeighborhood assignNeighborhoodToNewUser user:', user);

    if (!user) {
      return '1690209898172-GCV-uqjqnl8pt';
    }

    // Get the first digit of the user's WhatsApp number
    const firstDigit = user.whatsAppNumber[0];

    // Log the value of firstDigit to the console
    // console.log(
    //   'useNeighborhood assignNeighborhoodToNewUser firstDigit:',
    //   firstDigit,
    // );

    // Get the list of all neighborhoods from the database
    const neighborhoods = await dbManager.getAll<Neighborhood>('neighborhoods');

    // Log the value of neighborhoods to the console
    // console.log(
    //   'useNeighborhood assignNeighborhoodToNewUser neighborhoods:',
    //   neighborhoods,
    // );

    // Find the neighborhood that corresponds to the first digit of the user's WhatsApp number
    const neighborhood = neighborhoods.find(
      neighborhood => neighborhood.name[0] === firstDigit,
    );

    // Log the value of neighborhood to the console
    // console.log(
    //   'useNeighborhood assignNeighborhoodToNewUser neighborhood:',
    //   neighborhood,
    // );

    // Return the neighborhoodId
    return '1690209898172-GCV-uqjqnl8pt';
  };

  const createNeighborhood = async (
    name: string,
    createdBy: string,
    color: string,
  ) => {
    // Log that the createNeighborhood function is being called
    // console.log('useNeighborhood createNeighborhood called');

    try {
      // Create a new neighborhood object
      const newNeighborhood: Neighborhood = {
        name,
        createdAt: new Date().toISOString(),
        createdBy,
        color,
      };

      // Log the value of newNeighborhood to the console
      // console.log(
      //   'useNeighborhood createNeighborhood newNeighborhood:',
      //   newNeighborhood,
      // );

      // Save the new neighborhood to the database
      await dbManager.add('neighborhoods', newNeighborhood);
    } catch (error) {
      // Log the error to the console
      // console.error('useNeighborhood createNeighborhood error:', error);
    }
  };

  const deleteNeighborhood = async (id: string) => {
    // Delete the neighborhood from the database
    await dbManager.delete('neighborhoods', id);
  };

  return {
    getNeighborhoodInfo,
    assignNeighborhoodToNewUser,
    createNeighborhood,
    deleteNeighborhood,
  };
};
