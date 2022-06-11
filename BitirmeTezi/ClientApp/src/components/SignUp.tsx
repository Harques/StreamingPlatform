import Col from 'antd/lib/grid/col';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { AuthService } from '../api/AuthService';
import { WebApi } from '../api/WebApi';
import { History } from 'history'

type MyState = {email: string, password: string, userName: string}
type MyProps = {history: History}

class SignUp extends React.Component<MyProps, MyState> {
  authService: AuthService;  

  constructor(props: any) {
    super(props)    
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.authService = new AuthService();
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
        <h2  style={{textAlign: 'center', marginTop: '10%'}}>Sign Up</h2>
        <div className='w-25 mt-4' style={{marginLeft: 'auto',  marginRight: 'auto'}}>
          <Input placeholder='Username *' className='mt-3' onChange={(e) => this.setState({userName: e.target.value})}></Input>
          <Input placeholder='Email *' className='mt-3' onChange={(e) => this.setState({email: e.target.value})}></Input>
          <Input placeholder='Password *' type='password' className='mt-3' onChange={(e) => this.setState({password: e.target.value})}></Input>
          <div className='row justify-content-around'>
            <Button className='mt-4 col-0 align-self-end' style={{background:'#3f51b5', width:'150px'}} onClick={this.signUp}>Apply</Button>
          </div>
        </div>
      </React.Fragment>
    ) 
  }

  async login() {
    this.props.history.goBack()
  }
  
  async signUp() {
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    var username = this.state.userName.trim();

    console.log(email + " " + password + " " + username)

    var body = JSON.stringify({username: username, email: email, password: password});

    const success = await this.authService.signUp(body)

    if (success) {      
      window.history.replaceState(null, '', "/home");
      this.props.history.push('/home')
    } 
  }

}

export default connect()(SignUp);
