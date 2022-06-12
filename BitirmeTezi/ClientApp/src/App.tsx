import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Browse from "./components/Browse";
import NotFoundPage from "./components/NotFoundPage";
import "./custom.css";
import { BrowserRouter } from "react-router-dom";

export default () => (
  <Layout>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route exact path='/stream/:stream' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={LogIn} />
        <Route path='/browse' component={Browse} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  </Layout>
);
