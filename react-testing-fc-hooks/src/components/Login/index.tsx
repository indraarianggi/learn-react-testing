import React, { useEffect, useState } from "react";

type LoginProps = {
  email?: string;
  password?: string;
  dispatch?: any;
};

const Login = ({
  email: propsEmail,
  password: propsPassword,
  dispatch,
}: LoginProps) => {
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(propsEmail || "");
  const [password, setPassword] = useState<string>(propsPassword || "");

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateEmail = (text: string) => /@/.test(text);

  const validateForm = () => {
    setIsLoginDisabled(password.length < 8 || !validateEmail(email));
  };

  const handleEmailBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value.trim();
    setEmail(emailValue);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value.trim();
    setPassword(passwordValue);
  };

  const handleSubmit = () => {
    dispatch("submit(email, password");
    setIsLoginDisabled(true);
  };

  return (
    <form>
      <input
        type="email"
        placeholder="email"
        onBlur={handleEmailBlur}
        data-value={email}
      />
      <input
        type="password"
        placeholder="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <input
        type="button"
        value="Submit"
        disabled={isLoginDisabled}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default Login;
