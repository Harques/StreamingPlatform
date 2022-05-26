import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap'
import { AuthService } from '../api/AuthService';
import { Component } from 'react';
import { History } from 'history';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

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
        <h1>Go Live</h1>
        <div className='w-25 mt-4'>
          <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
            <button
              onClick={() => {
              const imageSrc = getScreenshot()
              }}
            >
              Capture photo
            </button>
            )}
          </Webcam>
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
