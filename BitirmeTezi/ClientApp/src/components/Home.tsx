import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, ListGroupItemHeading, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom';
import { pathToFileURL } from 'url';

type MyState = {email: string, password: string}

class Home extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props)    
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Welcome to the World's Best Live Stream Platform!</h1>
        <div className='w-25 mt-4'>
          <Input placeholder='Email' onChange={(e) => this.setState({email: e.target.value})}></Input>
          <Input placeholder='Parola' className='mt-4' onChange={(e) => this.setState({password: e.target.value})}></Input>
          <div className='row justify-content-around'>
            <Button className='mt-4 col-0 align-self-start' style={{background:'#A200C1', borderColor:'#A200C1'}} onClick={this.login}>Giriş Yap</Button>
            <Button className='mt-4 col-0 align-self-end' style={{background:'#A200C1', borderColor:'#A200C1'}} onClick={this.signUp}>Kayıt Ol</Button>
          </div>
        </div>
        
      </React.Fragment>
    ) 
  }

  login() {
    console.log(this.state.email)
    console.log(this.state.password)
  }
  
  signUp() {
    console.log(this.state.email)
    console.log(this.state.password)
  }

}



export default connect()(Home);
