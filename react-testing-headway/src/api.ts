import { IItem } from "./types";

// Simulating API
export const api = {
  createItem: (url: string, newItem: IItem) => {
    return Promise.resolve(newItem);
  },
};
