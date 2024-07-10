import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "farzana@sigmaschool.co" && password === "password") {
      dispatch(login({ username, password}));
      navigate("/");
    } else {
      setError("Please eneter a valid username and password.");
    }
  };

  return (
    <Container>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}