import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { runInThisContext } from 'vm';
import { WebApi } from '../api/WebApi';

type MyState = {email: string, password: string}

class Home extends React.Component<{}, MyState> {
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

export default connect()(Home);
