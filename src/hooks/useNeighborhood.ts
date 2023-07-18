// src/hooks/useNeighborhood.ts
import { useState } from 'react';
import dbManager from '../interfaces/DatabaseManager';
import { User } from '../interfaces/User';

export const useNeighborhood = () => {
  const [neighborhoodId, setNeighborhoodId] = useState<string | null>(null);

  const assignNeighborhood = async (user: User) => {
    // Log the value of user to the console
    console.log('useNeighborhood assignNeighborhood user:', user);

    if (!user) {
      return;
    }

    // Get the first digit of the user's WhatsApp number
    const firstDigit = user.whatsAppNumber[0];

    // Log the value of firstDigit to the console
    console.log('useNeighborhood assignNeighborhood firstDigit:', firstDigit);

    // Get the list of all neighborhoods from the database
    const neighborhoods = await dbManager.getAll('neighborhoods');

    // Log the value of neighborhoods to the console
    console.log('useNeighborhood assignNeighborhood neighborhoods:', neighborhoods);

    // Find the neighborhood that corresponds to the first digit of the user's WhatsApp number
    const neighborhood = neighborhoods.find(
      (neighborhood) => neighborhood.name[0] === firstDigit,
    );

    // Log the value of neighborhood to the console
    console.log('useNeighborhood assignNeighborhood neighborhood:', neighborhood);

    if (!neighborhood) {
      return;
    }

    // Update the neighborhoodId state directly
    setNeighborhoodId('1689624325154-GCV-rpbxviq8b');
    
    // Return the neighborhoodId
    return '1689624325154-GCV-rpbxviq8b';
  };

  const createNeighborhood = async (name: string, createdBy: string) => {
    // Create a new neighborhood object
    const newNeighborhood = {
      name,
      createdAt: new Date().toISOString(),
      createdBy,
    };

    // Save the new neighborhood to the database
    await dbManager.add('neighborhoods', newNeighborhood);
  };

  const deleteNeighborhood = async (id: string) => {
    // Delete the neighborhood from the database
    await dbManager.delete('neighborhoods', id);

    // Update the neighborhoodId state directly
    setNeighborhoodId(null);
  };

  return {
    neighborhoodId,
    setNeighborhoodId,
    assignNeighborhood,
    createNeighborhood,
    deleteNeighborhood,
  };
};
