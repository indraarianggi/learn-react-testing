import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Drawer from "../example3/Drawer";
import Example4 from "./Example4";

// Mock a component from our own application
jest.mock("../example3/Drawer");
mocked(Drawer).mockImplementation(() => <div>Mocked Drawer</div>);

describe("Example4 Component", () => {
  it("should renders Drawer from Example3", () => {
    render(<Example4 />);

    expect(
      screen.queryByText("Hello Drawer Component!")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Mocked Drawer")).toBeInTheDocument();
  });
});
