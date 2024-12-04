import React, { FC } from "react";
import Image from "next/image";

const ProviderData: FC<ProviderProps> = ({ providers }) => {
  return (
    <div className="flex flex-col">
      {providers.map((provider) => {
        return (
          <div key={provider.provider_name} className="flex mb-4 items-center">
            <Image
              src={`https://media.themoviedb.org/t/p/original/${provider.logo_path}`}
              alt={provider.provider_name}
              width={36}
              height={36}
            />
            <p className="ml-4 font-semibold">{provider.provider_name}</p>
          </div>
        );
      })}
    </div>
  );
};

const NoProviders = () => {
  return (
    <div className="flex gap-x-8 flex-col">
      <h1>Sorry</h1>
      <p>No providers for this movie in your region</p>
    </div>
  );
};

const Providers: FC<AllProviderProps> = ({ flatrate, buy, rent }) => {
  return (
    <div className="flex gap-x-8 flex-col">
      {flatrate && (
        <div>
          <h1 className="text-lg font-bold text-center mb-4">Stream</h1>
          <ProviderData providers={flatrate} />
        </div>
      )}
      {rent && (
        <div>
          <h1 className="text-lg font-bold text-center mb-4">Rent</h1>
          <ProviderData providers={rent} />
        </div>
      )}
      {buy && (
        <div>
          <h1 className="text-lg font-bold text-center mb-4">Buy</h1>
          <ProviderData providers={buy} />
        </div>
      )}
      {!flatrate && !rent && !buy && <NoProviders />}
    </div>
  );
};

export type AllProviderProps = {
  flatrate?: {
    logo_path: string;
    provider_name: string;
  }[];
  buy?: {
    logo_path: string;
    provider_name: string;
  }[];
  rent?: {
    logo_path: string;
    provider_name: string;
  }[];
};

export type ProviderProps = {
  providers: {
    logo_path: string;
    provider_name: string;
  }[];
};

export default Providers;
