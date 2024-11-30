import { useState } from "react";
import { LoginDTO, ConnectedUser } from "../interface/dataTransfertObject";
import { JsonSignInResponse } from "../interface/jsonResponse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { clearUser, setUser } from "../state/user/userSlice";
import { converterConnectedUserDTOToConnectedUser } from "../utils/converters";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT_LOGIN = "/auth/login";

function ConnectionMenu() {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const reduxUser = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

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
      const loggedUser: ConnectedUser = converterConnectedUserDTOToConnectedUser(loggedUserResponse.data) ;

      dispatch(setUser(loggedUser));
    } catch (error) {
      alert("An error occurred while attempting to log in")
    }
  }

  const handleLogout = () => {
    try {
      // setUser(undefined);
      dispatch(clearUser());
    } catch (error) {
      alert("An error occurred while attempting to log of")
    }
  }

  if (reduxUser != null) {
    return (
      <>
        <div className="logout-spacer">
          <span>{reduxUser.username}</span>
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