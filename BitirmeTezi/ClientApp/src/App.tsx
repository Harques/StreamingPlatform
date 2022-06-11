import * as React from 'react';
import { Redirect, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Browse from './components/Browse';
import './custom.css'

export default () => (
    <Layout>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route path='/home' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={LogIn} />
        <Route path='/browse' component={Browse} />
    </Layout>
);
