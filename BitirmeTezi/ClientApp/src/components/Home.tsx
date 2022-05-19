import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, NavLink } from 'reactstrap'
import { AuthService } from '../api/AuthService';
import { Component } from 'react';
import { History } from 'history';

type MyState = {email: string, password: string}
type MyProps = {history: History}

class Home extends Component<MyProps, MyState> {
  authService: AuthService;   

  constructor(props: any) {
    super(props)    
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.authService = new AuthService();             
  }
  
  render() {
    return (
      <React.Fragment>
        <h1>Welcome to the World's Best Live Stream Platform!</h1>
        <div className='w-25 mt-4'>
          <Input placeholder='Email' onChange={(e) => this.setState({email: e.target.value})}></Input>
          <Input placeholder='Parola' type='password' className='mt-4' onChange={(e) => this.setState({password: e.target.value})}></Input>
          <div className='row justify-content-around'>
            <Button className='mt-4 col-0 align-self-start' style={{background:'#A200C1', borderColor:'#A200C1'}} onClick={this.login}>Giriş Yap</Button>
            <Button className='mt-4 col-0 align-self-end' style={{background:'#A200C1', borderColor:'#A200C1'}} onClick={this.signUp}>Kayıt Ol</Button>
          </div>
        </div>
      </React.Fragment>
    ) 
  }

  async login() {
    var email = this.state.email.trim();
    var password = this.state.password.trim();

    var body = JSON.stringify({email: email, password: password});
    
    const success = await this.authService.login(body);
    
    if (success) {            
      this.props.history.replace("/counter");
    } 
  }
  
  signUp() {    
    console.log(this.state.email)
    console.log(this.state.password)
  }
}

export default connect()(Home);
