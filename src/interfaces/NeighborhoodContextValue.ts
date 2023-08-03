// src/interfaces/NeighborhoodContextValue.ts
export interface NeighborhoodContextValue {
  neighborhoodId: string | null;
  setNeighborhoodId: (id: string | null) => void;
}