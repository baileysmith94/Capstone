import { useState } from "react";

export default function SignUp() {
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const result = await response.json();
      setMessage(result.message);
      setToken(result.token);
      if (!response.ok) {
        throw result;
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="firstName"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="lastName"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
