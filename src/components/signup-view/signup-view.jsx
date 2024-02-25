import React from "react";
import { useState } from "react";

export const SignUpView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    fetch("https://movie-api-project24-2fb853d4fde0.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("signup successful");
        window.location.reload();
      } else {
        console.log("Error response:", response.status, response.statusText);
        alert("Signup failed");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
        <label>Password:</label>
        <input  
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Email:</label>
        <input 
        type="email" 
        value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Birthday:</label>
        <input 
        type="date" 
        value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
