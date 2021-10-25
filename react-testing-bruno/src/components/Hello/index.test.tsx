import { render, screen } from "@testing-library/react";
import Hello from "./index";

it('should renders "Hello World"', () => {
  render(<Hello />);

  const myElement = screen.getByText(/Hello World/);
  expect(myElement).toBeInTheDocument();
});
