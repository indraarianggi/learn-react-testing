import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer from "./Drawer";

// Mock a component form 3rd party library (SwipeableDrawer)
jest.mock("@material-ui/core", () => ({
  ...jest.requireActual("@material-ui/core"),
  SwipeableDrawer: jest.fn(() => <div>HELLOOOOOO</div>),
}));

describe("Drawer Component", () => {
  it('should shows no "HELLOOOOOO"', () => {
    render(<Drawer />);
    expect(screen.queryByText("HELLOOOOOO")).toBeInTheDocument();
  });

  it('should shows "HELLOOOOOO" when button "Open Drawer" is clicked', () => {
    render(<Drawer />);
    userEvent.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.getByText("HELLOOOOOO")).toBeInTheDocument();
  });
});
