import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders <App /> component intialy", () => {
  render(<App />);

  const headingElm = screen.getByText("TODOs");
  expect(headingElm).toBeVisible();

  const labelFormElm = screen.getByLabelText("What needs to be done?");
  expect(labelFormElm).toBeVisible();

  const inputElm = screen.getByRole("textbox");
  expect(inputElm).toBeVisible();

  const buttonElm = screen.getByRole("button", { name: "Add #1" });
  expect(buttonElm).toBeVisible();
});
