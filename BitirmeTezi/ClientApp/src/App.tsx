import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import "./custom.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

export default () => (
    <Layout>
        <Route path="/home" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
    </Layout>
);
