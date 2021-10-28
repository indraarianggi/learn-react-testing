import React from "react";
import useSWR from "swr";
import { IApiError, TCountryOptions } from "../../interface";

export interface ICarBrands {
  country: TCountryOptions;
}

const CarBrands = ({ country }: ICarBrands) => {
  const { isValidating, error, data } = useSWR<string[], IApiError>(
    `/api/cars/${country}`
  );

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error && <div>Loading...</div>}
      {error && <div>{error.message}</div>}

      {!data?.length && !isValidating && !error ? (
        <div>No data to show</div>
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CarBrands;
