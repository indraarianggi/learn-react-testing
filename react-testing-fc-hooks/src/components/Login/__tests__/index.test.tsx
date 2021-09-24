import React from "react";
import { mount, shallow } from "enzyme";
import Login from "../index";

/**
 * Testing UI and Props
 */
describe("<Login /> with no props", () => {
  const container = shallow(<Login />);

  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have an email field", () => {
    expect(container.find('input[type="email"]').length).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      onBlur: expect.any(Function),
      placeholder: "email",
      type: "email",
      "data-value": "",
    });
  });

  it("should have a password field", () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
  });

  it("should have proper props for password field", () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "password",
      type: "password",
      value: "",
    });
  });

  it("should have a submit button", () => {
    expect(container.find('input[type="button"]').length).toEqual(1);
  });

  it("should have proper props for submit button", () => {
    expect(container.find('input[type="button"]').props()).toEqual({
      onClick: expect.any(Function),
      type: "button",
      value: "Submit",
      disabled: true,
    });
  });
});

describe("<Login /> with other props", () => {
  const initialProps = {
    email: "lorem@ipsum.com",
    password: "lalala",
  };

  const container = shallow(<Login {...initialProps} />);

  it("should have proper props for email field", () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      onBlur: expect.any(Function),
      placeholder: "email",
      type: "email",
      "data-value": initialProps.email,
    });
  });

  it("should have proper props for password field", () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "password",
      type: "password",
      value: initialProps.password,
    });
  });

  it("should have proper props for submit button", () => {
    expect(container.find('input[type="button"]').props()).toEqual({
      onClick: expect.any(Function),
      type: "button",
      value: "Submit",
      disabled: true,
    });
  });
});

/**
 * Testing State Updates
 */
describe("<Login /> state updates", () => {
  const initialProps = {
    dispatch: jest.fn(),
  };

  const container = shallow(<Login {...initialProps} />);

  it("should set the email value on blur event with trim", () => {
    // act
    container.find('input[type="email"]').simulate("blur", {
      target: { value: "lorem@ipsum.com" },
    });

    // assertion
    expect(container.find('input[type="email"]').prop("data-value")).toEqual(
      "lorem@ipsum.com"
    );
  });

  it("should set the password value on change event with trim", () => {
    // act
    container.find('input[type="password"]').simulate("change", {
      target: {
        value: "dolorsitamet",
      },
    });

    // assertion
    expect(container.find('input[type="password"]').prop("value")).toEqual(
      "dolorsitamet"
    );
  });

  it("should call the dispatch function and disable the submit button on button click", () => {
    // act
    container.find('input[type="button"]').simulate("click");

    // assertion
    expect(
      container.find('input[type="button"]').prop("disabled")
    ).toBeTruthy();
    expect(initialProps.dispatch).toHaveBeenCalledTimes(1);
  });
});

/**
 * Testing Lifecycle Hooks
 */
describe("<Login /> test effect hooks", () => {
  const container = mount(<Login />);

  it("should have the login disabled by default", () => {
    expect(
      container.find('input[type="button"]').prop("disabled")
    ).toBeTruthy();
  });

  it("should have the login enabled with valid values", () => {
    // act
    container.find('input[type="email"]').simulate("blur", {
      target: {
        value: "lorem@ipsum.com",
      },
    });
    container.find('input[type="password"]').simulate("change", {
      target: {
        value: "validpassword",
      },
    });

    // assertion
    expect(container.find('input[type="button"]').prop("disabled")).toBeFalsy();
  });

  it("should have the login disabled with invalid values", () => {
    // act
    container.find('input[type="email"]').simulate("blur", {
      target: {
        value: "lorem@ipsum.com",
      },
    });
    container.find('input[type="password"]').simulate("change", {
      target: {
        value: "valid", // password less than 8 characters
      },
    });

    // assertion
    expect(
      container.find('input[type="button"]').prop("disabled")
    ).toBeTruthy();
  });
});
