import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "valerie@example.com" && password === "password") {
      dispatch(login({ email, password}));
      navigate("/");
    } else {
      setError("Please eneter a valid email and password.");
    }
  };

  return (
    <Container>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
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