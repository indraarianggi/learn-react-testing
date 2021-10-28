export interface IPhoto {
  id: number;
  title: string;
  thumbnailUrl: string;
  favourite: boolean;
}

export type TCountryOptions = "Germany" | "France" | "Italy";

export interface IApiError {
  message: string;
}
