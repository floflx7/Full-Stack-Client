import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let Navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password, email: email };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        

        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        Navigate("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <label>Email:</label>
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;
