import { useState } from "react";
import { Card, CardContent, CardHeader, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string } from "yup";
import { useFormik } from "formik";

import "./register.scss";
import { registerUser } from "../../api";
import { LoadingState } from "../../enums";

const validationSchema = object({
  email: string().email("Enter a valid email").required("Email is required"),
  firstName: string().min(3, "First name must contain at least 3 characters").required("First name is required"),
  lastName: string().min(3, "Last name must contain at least 3 characters").required("Last name is required"),
  password: string().min(5, "Password should be of minimum 5 characters length").required("Password is required"),
});

export function Register() {
  const [loadState, setLoadState] = useState(LoadingState.Idle);
  const isLoading = loadState === LoadingState.Fetching;
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadState(LoadingState.Fetching);
        await registerUser(values);
        setLoadState(LoadingState.Completed);
      } catch (error) {
        setLoadState(LoadingState.Failed);
      }
    },
  });

  return (
    <div className="container">
      <Card variant="outlined" sx={{ minWidth: "500px" }}>
        <CardHeader title="Register"></CardHeader>
        <CardContent>
          {loadState === LoadingState.Failed && (
            <Alert variant="outlined" severity="error">
              Failed to register
            </Alert>
          )}
          <form className="form" onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              id="email"
              name="email"
              label="Email"
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              id="firstName"
              name="firstName"
              label="First Name"
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              id="lastName"
              name="lastName"
              label="Last Name"
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <LoadingButton loading={isLoading} type="submit" variant="outlined" sx={{ marginTop: "16px" }}>
              Register
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
