import React, { useContext } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setUser, setUpdateHighScore } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim().toLowerCase();
      data.password = data.password.trim();
      http
        .post("/login", data)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.token);
          setUser(res.data.user);
          const highScore = localStorage.getItem("highScore") || false;
          if (highScore) {
            http.get(`/users/${res.data.user.id}`).then((res) => {
              console.log(res.data);
              if (res.data.user.highScore < highScore) {
                http
                  .put(`/users/${res.data.user.id}`, { highScore: highScore })
                  .then((res) => {
                    console.log(res.data);
                    localStorage.removeItem("highScore");
                    setUpdateHighScore(true);
                    navigate("/homepage");
                  });
              }
            });
          }
          navigate("/homepage");
        })
        .catch(function (err) {
          console.error(err);
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ my: 2 }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{ maxWidth: "500px" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Login
        </Button>
      </Box>
      <Box sx={{ alignItems: "left", textAlign: "left", width: "500px" }}>
        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Register
          </Link>
        </Typography>
      </Box>

      <ToastContainer />
    </Box>
  );
}

export default Login;
