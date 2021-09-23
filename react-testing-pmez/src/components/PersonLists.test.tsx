import { shallow } from "enzyme";

import PersonLists, { IPeople } from "./PersonLists";

describe("PersonLists", () => {
  it("renders ul element", () => {
    const personListsWrapper = shallow(<PersonLists />);
    const peopleListUls = personListsWrapper.find("ul");

    expect(peopleListUls).toHaveLength(1);
  });

  it("renders no li elements when no people exists", () => {
    const people: IPeople[] = [];
    const personListsWrapper = shallow(<PersonLists people={people} />);
    const peopleListItems = personListsWrapper.find("li");

    expect(peopleListItems).toHaveLength(0);
  });

  it("render one li element when one person exists", () => {
    const people: IPeople[] = [{ firstName: "John", lastName: "Doe" }];
    const personListsWrapper = shallow(<PersonLists people={people} />);
    const peopleListItems = personListsWrapper.find("li");

    expect(peopleListItems).toHaveLength(1);
  });

  it("renders one li element for each person that exists", () => {
    const people: IPeople[] = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Alan", lastName: "Turing" },
    ];
    const personListsWrapper = shallow(<PersonLists people={people} />);
    const peopleListItems = personListsWrapper.find("li");

    expect(peopleListItems).toHaveLength(2);
  });

  it("renders the first and last name of a person", () => {
    const people: IPeople[] = [{ firstName: "John", lastName: "Doe" }];
    const personListsWrapper = shallow(<PersonLists people={people} />);

    expect(personListsWrapper.find("li").text()).toContain(people[0].firstName);
    expect(personListsWrapper.find("li").text()).toContain(people[0].lastName);
  });
});
