import { useState } from "react";
import type { NextPage } from "next";
import { TCountryOptions } from "../interface";
import CarBrands from "../components/CarBrands";
import { MySwrConfig } from "../components/MySwrConfig";

const Home: NextPage = () => {
  const [country, setCountry] = useState<TCountryOptions>("Germany");

  return (
    <MySwrConfig>
      <h1>Car App</h1>
      <button onClick={() => setCountry("Germany")}>Germany</button>
      <button onClick={() => setCountry("France")}>France</button>
      <button onClick={() => setCountry("Italy")}>Italy</button>

      <CarBrands country={country} />
    </MySwrConfig>
  );
};

export default Home;
