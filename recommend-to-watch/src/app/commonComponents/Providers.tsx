import React, { FC } from "react";
import Image from "next/image";

const ProviderData: FC<ProviderProps> = ({ providers }) => {
  return (
    <>
      {providers.map((provider) => {
        return (
          <div key={provider.provider_name} className="actualProviderContainer">
            <Image
              src={`https://media.themoviedb.org/t/p/original/${provider.logo_path}`}
              alt={provider.provider_name}
              width={36}
              height={36}
            />
            <p className="providerName">{provider.provider_name}</p>
          </div>
        );
      })}
    </>
  );
};

const NoProviders = () => {
  return (
    <div className="providerContainer">
      <h1>Sorry</h1>
      <p>No providers for this movie in your region</p>
    </div>
  );
};

const Providers: FC<AllProviderProps> = ({ flatrate, buy, rent }) => {
  return (
    <div className="flex gap-8 row-start-2 providersContainer">
      {flatrate && (
        <div className="providerContainer">
          <h1>Stream</h1>
          <ProviderData providers={flatrate} />
        </div>
      )}
      {rent && (
        <div className="providerContainer">
          <h1>Rent</h1>
          <ProviderData providers={rent} />
        </div>
      )}
      {buy && (
        <div className="providerContainer">
          <h1>Buy</h1>
          <ProviderData providers={buy} />
        </div>
      )}
      {!flatrate && !rent && !buy && <NoProviders />}
    </div>
  );
};

type AllProviderProps = {
  flatrate?: [
    {
      logo_path: string;
      provider_name: string;
    }
  ];
  buy?: [
    {
      logo_path: string;
      provider_name: string;
    }
  ];
  rent?: [
    {
      logo_path: string;
      provider_name: string;
    }
  ];
};

type ProviderProps = {
  providers: [
    {
      logo_path: string;
      provider_name: string;
    }
  ];
};

export default Providers;
