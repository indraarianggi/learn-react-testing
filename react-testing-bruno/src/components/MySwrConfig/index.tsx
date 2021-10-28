/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { SWRConfig, Cache } from "swr";
import { Fetcher, PublicConfiguration } from "swr/dist/types";
import { IApiError } from "../../interface";

type Provider = { provider?: (cache: Readonly<Cache<any>>) => Cache<any> };

export interface IMySwrConfigProps {
  children?: ReactNode;
  swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider;
}
export const MySwrConfig = ({ children, swrConfig }: IMySwrConfigProps) => {
  return (
    <SWRConfig value={{ fetcher: customFetcher, ...swrConfig }}>
      {children}
    </SWRConfig>
  );
};

export const customFetcher = async (url: string) => {
  const response = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    const json = (await response.json()) as IApiError;
    throw new Error(json.message);
  }

  return response.json();
};
