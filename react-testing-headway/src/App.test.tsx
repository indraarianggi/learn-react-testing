import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { api } from "./api";

test("renders the correct content", () => {
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

// Mock entire module using jest.mock
jest.mock("./api");

test("allows users to add items to their list", async () => {
  const todoText = "Learn React Testing Library";
  const mockCreateItem = (api.createItem = jest.fn());
  mockCreateItem.mockResolvedValueOnce({
    id: 123,
    text: todoText,
  });

  render(<App />);

  const inputElm = screen.getByLabelText("What needs to be done?");
  const btnElm = screen.getByRole("button");

  userEvent.type(inputElm, todoText);
  userEvent.click(btnElm);
  /*
  fireEvent.change(inputElm, {
    target: { value: todoText },
  });
  fireEvent.click(btnElm);
   */

  // assertion of api call
  expect(mockCreateItem).toHaveBeenCalledTimes(1);
  expect(mockCreateItem).toHaveBeenCalledWith(
    "/items",
    expect.objectContaining({ text: todoText })
  );

  // assertion of ui
  await waitFor(() => {
    expect(screen.getByText(todoText)).toBeVisible();
    expect(btnElm.textContent).toEqual("Add #2");
  });
});
