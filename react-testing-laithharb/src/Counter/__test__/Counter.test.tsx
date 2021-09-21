import Counter from "../Counter";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header renders with correct text", () => {
  const { getByTestId } = render(<Counter />);
  const headerElm = getByTestId("header");

  // assertion
  expect(headerElm.textContent).toBe("My Counter");
});

test("counter initially start with text of 0", () => {
  const { getByTestId } = render(<Counter />);
  const counterElm = getByTestId("counter");

  // assertion
  expect(counterElm.textContent).toBe("0");
});

test("input contains intial value of 1", () => {
  const { getByTestId } = render(<Counter />);
  const inputElm = getByTestId("input");

  // assertion
  expect(inputElm).toHaveValue(1);
});

test("add button renders with +", () => {
  const { getByTestId } = render(<Counter />);
  const addBtn = getByTestId("add-btn");

  // assertion
  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const { getByTestId } = render(<Counter />);
  const subtractBtn = getByTestId("subtract-btn");

  // assertion
  expect(subtractBtn.textContent).toBe("-");
});
