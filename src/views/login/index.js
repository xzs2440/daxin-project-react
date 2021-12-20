import React, { Component } from 'react';
import './index.scss';

// 组件
import LoginFrom from './LoginFrom'
import RegisterFrom from './RegisterFrom'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formType: 'login'
    }
  }
  switchForm = (value) => {
    this.setState({
      formType: value
    })
  }

  render () {
    return (
      <div className='form-wrap'>
        <div>
          {
            this.state.formType === 'login'
              ? <LoginFrom switchForm={this.switchForm}></LoginFrom>
              : <RegisterFrom switchForm={this.switchForm}></RegisterFrom>
          }
        </div>

      </div>
    )
  }
}
export default Login;
