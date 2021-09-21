import Counter from "../Counter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId: any;

// Function that run before each test
beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

test("header renders with correct text", () => {
  const headerElm = getByTestId("header");

  // assertion
  expect(headerElm.textContent).toBe("My Counter");
});

test("counter initially start with text of 0", () => {
  const counterElm = getByTestId("counter");

  // assertion
  expect(counterElm.textContent).toBe("0");
});

test("input contains intial value of 1", () => {
  const inputElm = getByTestId("input");

  // assertion
  expect(inputElm).toHaveValue(1);
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");

  // assertion
  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");

  // assertion
  expect(subtractBtn.textContent).toBe("-");
});

// Testing functionality
test("change value of input works correctly", () => {
  const inputElm = getByTestId("input");

  // assertion at intial render
  expect(inputElm).toHaveValue(1);

  // fire an event
  fireEvent.change(inputElm, { target: { value: 5 } });

  // assertion after fire an event
  expect(inputElm).toHaveValue(5);
});

test("click on add button adds 1 to counter", () => {
  const addBtn = getByTestId("add-btn");
  const counterElm = getByTestId("counter");

  // assertion at intial render
  expect(counterElm.textContent).toBe("0");

  // fire an event
  fireEvent.click(addBtn);

  // assertion after fire an event
  expect(counterElm.textContent).toBe("1");
});

test("click on subtract button subtracts 1 to counter", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterElm = getByTestId("counter");

  // assertion at intial render
  expect(counterElm.textContent).toBe("0");

  // fire an event
  fireEvent.click(subtractBtn);

  // assertion after fire an event
  expect(counterElm.textContent).toBe("-1");
});

test("changing input value then clicking on add button works correctly", () => {
  const addBtn = getByTestId("add-btn");
  const counterElm = getByTestId("counter");
  const inputElm = getByTestId("input");

  // fire events
  fireEvent.change(inputElm, { target: { value: 5 } });
  fireEvent.click(addBtn);

  // assertion after fire an event
  expect(counterElm.textContent).toBe("5");
});

test("changing input value then clicking on subtract button works correctly", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterElm = getByTestId("counter");
  const inputElm = getByTestId("input");

  // fire events
  fireEvent.change(inputElm, { target: { value: 5 } });
  fireEvent.click(subtractBtn);

  // assertion after fire an event
  expect(counterElm.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterElm = getByTestId("counter");
  const inputElm = getByTestId("input");

  // fire events
  fireEvent.change(inputElm, { target: { value: 10 } });
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  // assertion
  expect(counterElm.textContent).toBe("20");

  // fire events
  fireEvent.change(inputElm, { target: { value: 5 } });
  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  // assertion
  expect(counterElm.textContent).toBe("15");
});

test("counter contains correct className", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterElm = getByTestId("counter");
  const inputElm = getByTestId("input");

  expect(counterElm.className).toBe("");

  fireEvent.change(inputElm, { target: { value: 50 } });
  fireEvent.click(addBtn);
  expect(counterElm.className).toBe("");

  fireEvent.click(addBtn);
  expect(counterElm.className).toBe("green");

  fireEvent.click(addBtn);
  expect(counterElm.className).toBe("green");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterElm.className).toBe("");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterElm.className).toBe("red");
});
