import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Browse from "./components/Browse";
import "./custom.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

export default () => (
    <Layout>
        <Route path="/home" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
    </Layout>
);
