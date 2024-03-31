import { Card, CardHeader, CardContent, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useAuth } from "../../hooks";

const validationSchema = object({
  email: string().email("Enter a valid email").required("Email is required"),
  password: string().required("Password is required"),
});

export function Login() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className="container">
      <Card variant="outlined" sx={{ minWidth: "500px" }}>
        <CardHeader title="Login"></CardHeader>
        <CardContent>
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
            <Button type="submit" variant="outlined" sx={{ marginTop: "16px" }}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
