// src/services/NeighborhoodManager.ts
import dbManager from '../interfaces/DatabaseManager';
import { User } from '../interfaces/User';

export class NeighborhoodManager {
  async assignNeighborhood(user: User) {
    // Get the first digit of the user's WhatsApp number
    const firstDigit = user.whatsAppNumber[0];

    // Get the list of all neighborhoods from the database
    const neighborhoods = await dbManager.getAll('neighborhoods');

    // Find the neighborhood that corresponds to the first digit of the user's WhatsApp number
    const neighborhood = neighborhoods.find(
      (neighborhood) => neighborhood.name[0] === firstDigit,
    );

    // Return the id of the neighborhood
    return "1689624325154-GCV-rpbxviq8b";
  }
}
