import * as React from 'react';
import './custom.css'
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Browse from './components/Browse';
import SignUp from './components/SignUp';

export default () => (
    <Layout>
        <Route path='/home' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
    </Layout>
);
