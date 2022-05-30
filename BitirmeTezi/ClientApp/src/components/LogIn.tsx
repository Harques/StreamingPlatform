import Col from 'antd/lib/grid/col';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { WebApi } from '../api/WebApi';

type MyState = {email: string, password: string}

class LogIn extends React.Component<{}, MyState> {
  api: WebApi;  

  constructor(props: any) {
    super(props)    
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.api = new WebApi();
  }

  componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      console.log("not null");
    } else {
      console.log("null");
    }
  }

  render() {
    return (
      <React.Fragment>
        <h4>Log In</h4>
        <div className='w-25 mt-4'>
          <Input placeholder='Email' onChange={(e) => this.setState({email: e.target.value})}></Input>
          <Input placeholder='Parola' type='password' className='mt-4' onChange={(e) => this.setState({password: e.target.value})}></Input>
          <div className='row justify-content-around'>
            <Button className='mt-4 col-0 align-self-start' style={{background:'#3f51b5'}} onClick={this.login}>Log In</Button>
            <Button className='mt-4 col-0 align-self-end' style={{background:'#3f51b5'}} onClick={this.signUp}>Sign Up</Button>
          </div>
        </div>
        
      </React.Fragment>
    ) 
  }

  async login() {
    var email = this.state.email.trim();
    var password = this.state.password.trim();

    var body = JSON.stringify({email: email, password: password});

    var response = await this.api.post('auth/login', body);

    if (response.status == 200) {
      sessionStorage.setItem('token', response.data.token)
      console.log(response.data.token)
    } else {
      alert(response.data.Error[0])
    }
  }
  
  signUp() {
    console.log(this.state.email)
    console.log(this.state.password)
  }

}

export default connect()(LogIn);
