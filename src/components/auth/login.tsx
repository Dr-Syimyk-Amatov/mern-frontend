import { useState } from "react";
import { Card, CardHeader, CardContent, TextField, Alert } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";

import { useAuth } from "../../hooks";
import { LoadingState } from "../../enums";

const validationSchema = object({
  email: string().email("Enter a valid email").required("Email is required"),
  password: string().required("Password is required"),
});

export function Login() {
  const { login } = useAuth();
  const [loadState, setLoadState] = useState(LoadingState.Idle);
  const isLoading = loadState === LoadingState.Fetching;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadState(LoadingState.Fetching);
        await login(values);
        setLoadState(LoadingState.Completed);
      } catch (error) {
        setLoadState(LoadingState.Failed);
      }
    },
  });

  return (
    <div className="container">
      <Card variant="outlined" sx={{ minWidth: "500px" }}>
        <CardHeader title="Login"></CardHeader>
        <CardContent>
          {loadState === LoadingState.Failed && (
            <Alert variant="outlined" severity="error">
              Wrong login or password
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
              Login
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
