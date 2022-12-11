import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Button,
  ButtonGroup,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, FormProvider } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
// @ts-ignore
import { ReactComponent as GoogleLogo } from "../assets/google.svg";
// @ts-ignore
import { ReactComponent as GitHubLogo } from "../assets/github.svg";
import { LinkItem, OauthMuiLink } from "./login";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import backendPath from "../utils/backendPath";

const forgotPassSchema = object({
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const ForgotPasswordPage = () => {
  const defaultValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    resolver: zodResolver(forgotPassSchema),
    defaultValues,
  });
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };

  const onSubmitHandler = async (values) => {
    console.log(JSON.stringify(values, null, 4));
    axios
      .post(backendPath + "/app/forgot", values)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setChangedPassword(true);
        }
      })
      .catch((error) => {
        const response = error.response;

        if (response.status === 409) {
          setDoesnotUserExist(true);
        }
      });
    // console.log("Hello");
    // console.log(responses);
    // if (responses.status === 409) {
    //   setDoesUserExist(true);
    // }
  };

  const handleClose = () => {
    setDoesnotUserExist(false);
    setChangedPassword(false);
  };

  const [doesnotUserExist, setDoesnotUserExist] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);

  // 👇 Returned JSX
  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}
    >
      <Snackbar
        open={doesnotUserExist}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          User does not exist!
        </Alert>
      </Snackbar>
      <Snackbar
        open={changedPassword}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Password Changed Successfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: "0 0 5px #ddd" },
              py: "6rem",
              px: "1rem",
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  mb: "1.5rem",
                  pb: { sm: "3rem" },
                }}
              >
                Welcome To Care For Animals!
              </Typography>
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: "1px solid #ddd" } }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{ textAlign: "center", mb: "1.5rem" }}
                    >
                      Forgot Password
                    </Typography>

                    <FormInput
                      label="Enter your email"
                      type="email"
                      name="email"
                      focused
                      required
                    />
                    <FormInput
                      type="password"
                      label="Password"
                      name="password"
                      required
                      focused
                    />
                    <FormInput
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
                      required
                      focused
                    />
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          py: "0.8rem",
                          mt: 2,
                          width: "50%",
                          marginInline: "auto",
                        }}
                        onClick={routeChange}
                      >
                        Cancel
                      </Button>
                      &nbsp;
                      <LoadingButton
                        loading={false}
                        type="submit"
                        variant="contained"
                        sx={{
                          py: "0.8rem",
                          mt: 2,
                          width: "50%",
                          marginInline: "auto",
                        }}
                        // onSubmit={methods.handleSubmit(onSubmitHandler)}
                      >
                        Submit
                      </LoadingButton>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      paddingLeft: { sm: "3rem" },
                      mb: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    Sign up using another provider:
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ paddingLeft: { sm: "3rem" }, rowGap: "1rem" }}
                  >
                    <OauthMuiLink href="">
                      <GoogleLogo style={{ height: "2rem" }} />
                      Google
                    </OauthMuiLink>
                    <OauthMuiLink href="">
                      <GitHubLogo style={{ height: "2rem" }} />
                      GitHub
                    </OauthMuiLink>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                    Already have an account?{" "}
                    <LinkItem to="/login">Login</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
      {changedPassword && <Navigate to="/login" />}
    </Container>
  );
};

export default ForgotPasswordPage;
