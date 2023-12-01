import React, { FormEvent, useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Header from "../../components/Header";

const Login = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/login");
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    const nameFromForm = event.currentTarget.recipeName.value;
    const password = event.currentTarget.instructions.value;

    const postResponse = await fetch("http://127.0.0.1:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromForm,
        password: Number(password),
      }),
    });

    const postData = await postResponse.json();
    console.log(postData);
    console.log("We send the POST");
  };

  return (
    <div>
      <NavigationBar />
      <Header
        src="/bg-2.png"
        alt="Background2"
        width={1920}
        height={877.28}
        className="background2"
      />
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <label>
          Username
          <input type="text" id="username"></input>
        </label>
        <label>
          password
          <input type="password" id="password"></input>
        </label>
        <button type="submit" id="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
