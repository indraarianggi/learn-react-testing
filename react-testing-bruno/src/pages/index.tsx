import type { NextPage } from "next";
import Counter from "../components/Counter";
import Example2 from "../mocking_components_functions/example2/Example2";
import Drawer from "../mocking_components_functions/example3/Drawer";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Learn Testing React App</h1>
      {/* <Counter description="My Counter" defaultCount={0} /> */}
      {/* <Example2 onMoney={(n: number) => console.log(n)} /> */}
      <Drawer />
    </div>
  );
};

export default Home;
