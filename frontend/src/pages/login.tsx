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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hgcghvj");

    setSubmitted(true);

    const nameFromForm = event.currentTarget.username.value;
    const passwordFromForm = event.currentTarget.password.value;
    try {
    const postResponse = await fetch("http://127.0.0.1:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameFromForm,
        password: passwordFromForm,
      }),
    });

    const postData = await postResponse.json();
    console.log(postData);
    console.log("We send the POST");
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      // Handle network error here (e.g., display error message to the user)
    }
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
      <div className="login-container">
        <form onSubmit={handleForm} className="login">
        <h1>Login</h1>
          <label>
            Username
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>
          <label>
            password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button type="submit" id="submit-btn" className="login-button">
            Login
          </button>
          {submitted && <p>You loggesd in</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
