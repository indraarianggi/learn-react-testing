import { shallow } from "enzyme";

import App from "./App";
import PersonLists from "./components/PersonLists";

describe("App", () => {
  let appWrapper: any;

  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("renders a person list", () => {
    const personList = appWrapper.find(PersonLists);

    expect(personList).toHaveLength(1);
  });

  it("has state", () => {
    const appState = appWrapper.state();

    expect(appState).not.toBeNull();
  });

  it("has a people property on state", () => {
    const appState: any = appWrapper.state();

    expect(appState.people).toBeDefined();
  });

  it("passes people property of state to personList as prop", () => {
    const personList = appWrapper.find(PersonLists);

    expect(personList.props().people).toEqual(appWrapper.state().people);
  });
});
