import { useState } from "react";
import { LoginDTO, UserDTO } from "../interface/dataTransfertObject";
import { JsonSignInResponse } from "../interface/jsonResponse";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT_LOGIN = "/auth/login";

function ConnectionMenu() {
  const [user, setUser] = useState<undefined | UserDTO>();
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData: LoginDTO = { username: usernameInputValue, password: passwordInputValue };
      const response = await fetch(`${API_URL}${ENDPOINT_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      })
      const statusCode = response.status
      if (statusCode == 401) {
        alert("No such account exists")
        return;
      }
      if (statusCode != 200) {
        alert("An error occurred while processing the login information")
        return;
      }
      const loggedUserResponse: JsonSignInResponse = await response.json();
      const loggedUser: UserDTO = loggedUserResponse.data;
      setUser(loggedUser);
    } catch (error) {
      alert("An error occurred while attempting to log in")
    }
  }

  const handleLogout = () => {
    try {
      setUser(undefined);
    } catch (error) {
      alert("An error occurred while attempting to log of")
    }
  }

  if (user) {
    return (
      <>
        <div className="logout-spacer">
          <span>{user.username}</span>
          <button className="background-negative" onClick={handleLogout}>logout</button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <form
          action={`${API_URL}${ENDPOINT_LOGIN}`}
          method="POST"
          onSubmit={handleLogin}>
          <div>
            <label htmlFor="username-field">Username</label>
            <input
              type="text"
              name="username"
              id="username-field"
              onChange={(e) => setUsernameInputValue(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password-field">Password</label>
            <input
              type="password"
              name="password"
              id="password-field"
              onChange={(e) => setPasswordInputValue(e.target.value)} />
          </div>
          <button type="submit" className="background-positive">Login</button>
        </form>
      </>
    )
  }
}

export default ConnectionMenu