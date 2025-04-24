/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  maxWidth: "450px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

interface RegisterProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setIsLogin }: RegisterProps) => {
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const newErrors: any = {};

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.password || formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await axios.post("http://localhost:8080/api/auth/register", formValues);
      alert("Registered successfully!");
      setIsLogin(true);
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <TextField
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formValues.firstName}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formValues.lastName}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                name="username"
                placeholder="johndoe123"
                value={formValues.username}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={formValues.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                fullWidth
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />

            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
          </Box>

          <Divider>or</Divider>

          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setIsLogin(true)}
            >
              Sign in
            </span>
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default Register;
