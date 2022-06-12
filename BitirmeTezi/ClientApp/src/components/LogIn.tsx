import Col from 'antd/lib/grid/col';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { WebApi } from '../api/WebApi';
import { History } from 'history';
import { AuthService } from '../api/AuthService';

type MyState = {email: string, password: string}
type MyProps = {history: History}

class LogIn extends React.Component<MyProps, MyState> {
  authService: AuthService;  

  constructor(props: any) {
    super(props)    
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.authService = new AuthService();
    this.setState({
      email: '',
      password: ''
    })
    // window.history.pushState(null, '', window.location.href);
    // window.onpopstate = function (event) {
    //    history.go(1);
    // }  
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
        <h2 style={{textAlign: 'center', marginTop: '10%'}}>Giriş</h2>
        <div className='w-25 mt-4' style={{marginLeft: 'auto',  marginRight: 'auto'}}>
          <Input placeholder='E-Posta *' onChange={(e) => this.setState({email: e.target.value})}></Input>
          <Input placeholder='Şifre *' type='password' className='mt-3' onChange={(e) => this.setState({password: e.target.value})}></Input>
          <div className='row justify-content-around'>
            <Button className='mt-4 col-0 align-self-start' style={{background:'#3f51b5', width:'120px'}} onClick={this.login}>Giriş</Button>
            <Button className='mt-4 col-0 align-self-end' style={{background:'#3f51b5', width:'120px'}} onClick={this.signUp}>Kaydol</Button>
          </div>
        </div>
      </React.Fragment>
    ) 
  }

  async login() {
    if (this.state.email !== null && this.state.password !== null) {
      var email = this.state.email.trim();
      var password = this.state.password.trim();
  
      var body = JSON.stringify({email: email, password: password});
  
      var success = await this.authService.login(body)
  
      if (success) {
        this.props.history.replace('/browse')
      } 
    } else {
      alert('Lütfen gerekli alanları doldurunuz.')
    }
  } 
  
  signUp() {
    console.log('signup')
    this.props.history.push('/signup')
  }

}

export default connect()(LogIn);
