import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Container, Input, Typography } from "@mui/joy";
import { Link, useNavigate } from "@tanstack/react-router";
import { logout, useAuth } from "../services/firebase.config";
import { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../services/auth/google_login";

export const Route = createFileRoute('/login')({
  component: LoginWrapper,
})

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#3f51b5",
};


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuth();
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        minWidth="300px"
        maxWidth="400px"
        width="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}>
        <Typography variant="h1" sx={titleStyle}>
          Login
        </Typography>
        <Input
          fullWidth
          type="text"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <Input
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Box display="flex" justifyContent="space-evenly" gap={2}>
          <Button
            onClick={() => signInWithEmailAndPassword(email, password)}
            loading={loading}>
            Login
          </Button>
          <Button onClick={signInWithGoogle} loading={loading}>
            Login with Google
          </Button>
        </Box>
        <Box>
          <Link to="/reset">Forgot Password</Link>
        </Box>
        <Box>
          Don't have an account? <Link to="/register">Register</Link> now.
        </Box>
      </Box>
    </Box>
  );
}

function Logout() {
  const [user] = useAuth();
  const handleClick = () => {
    logout();
  };
  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mt={5}>
        <Typography variant="h1" sx={titleStyle}>
          Hello, {user.displayName}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Button onClick={handleClick}>Logout</Button>
      </Box>
    </>
  );
}

function LoginWrapper() {
  const [user] = useAuth();
  return <Container>{user ? <Logout /> : <Login />}</Container>;
}