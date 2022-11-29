import React, { Component } from "react";
import axois from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import axios from "axios";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ForgotPasswordPage from "./pages/forgotPassword";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import NewPost from "./pages/createPost";
import PostPage from "./pages/postpage";
import ResponsiveAppBar from "./components/navBar";
import Profile from "./pages/profile";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import EventsPage from "./pages/events";
import HomePage from "./pages/home";
import AnimalInfo from "./pages/animalInfo";
import AnimalsInfo from "./pages/animalsInfo";
import AnimalTable from "./pages/animalTable";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeFullName(event) {
    this.setState({
      fullName: event.target.value,
    });
  }
  changeUserName(event) {
    this.setState({
      userName: event.target.value,
    });
  }
  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const registered = {
      fullName: this.state.fullName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };
    axios.post("http://localhost:4000/app/signup", registered);
    //   .then((response) => console.log(response.data));

    this.setState({
      fullName: "",
      userName: "",
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <>
        <ResponsiveAppBar />
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage user={{}} />} />
          <Route path="/responsiveAppBar" element={<ResponsiveAppBar />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/new-post" element={<NewPost user={{}} />} />
          <Route path="/post/:id" element={<PostPage user={{}} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/animalInfo" element={<AnimalInfo />} />
          <Route path="/animalData" element={<AnimalTable />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    );
  }
}

export default App;
