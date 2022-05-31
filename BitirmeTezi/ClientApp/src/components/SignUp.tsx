import Col from 'antd/lib/grid/col';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { WebApi } from '../api/WebApi';

type MyState = {email: string, password: string, userName: string}

class SignUp extends React.Component<{}, MyState> {
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
    console.log(this.state.userName)
  }

}

export default connect()(SignUp);
