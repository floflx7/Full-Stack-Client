import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  let navigate = useNavigate();

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  const onSubmit = () => {
    const data = { username: username, password: password, email: email };

    if (
      (regexMail.test(data.email) == true) &
      (regexPassword.test(data.password) == true)
    ) {
      axios
        .post("http://localhost:3001/auth", {
          username: data.username,
          password: data.password,
          email: data.email,
        })
        .then((response) => {
          alert(response);
          navigate("/login");
        });
    } else {
      alert("Champ(s) non valide");
    }
  };

  return (
    <div>
      <div className="loginContainer">
        <h1>Register</h1>
        <label>Username: </label>
        <div className="sous_text">Entre 3 et 15 caractères</div>

        <input
          autoComplete="off"
          id="inputCreatePost"
          name="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password: </label>
        <div className="sous_text">
          1 Majuscule, 1 Chiffre et 8 caractères minimum
        </div>

        <input
          autoComplete="off"
          type="password"
          id="inputCreatePost"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Email: </label>
        <div className="sous_text">exemple@exemple.com</div>

        <input
          type="mail"
          autoComplete="off"
          id="inputCreatePost"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <button onClick={onSubmit}> Register</button>
      </div>
    </div>
  );
}

export default Registration;
