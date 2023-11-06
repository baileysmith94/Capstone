import { useState } from "react";

export default function SignUp() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(""); // Use a single 'name' field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
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
          name, // Use the 'name' field
          email,
          password,
        }),
      });
      const result = await response.json();
      setMessage(result.message);

      if (!response.ok) {
        throw result;
      }

      localStorage.setItem('token', result.token);

      setToken(result.token);
      setName(""); // Clear the 'name' field
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
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
        <div className="cred">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="cred">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="cred">
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
