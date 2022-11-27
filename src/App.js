import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import useStyles from "./styles.js";
import "./styles.css";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Posts from "./components/Posts/Posts"
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  //let classes = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route path="/auth" exact element={() => (!user ? <Auth /> : <Navigate to="/posts" />)}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
