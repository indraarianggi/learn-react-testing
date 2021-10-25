import type { NextPage } from "next";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Learn Testing React App</h1>
      <Counter description="My Counter" defaultCount={0} />
    </div>
  );
};

export default Home;
