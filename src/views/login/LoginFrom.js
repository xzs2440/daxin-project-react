import React, { Component, Fragment } from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col, message, } from 'antd';
import { UserOutlined, UnlockOutlined, PropertySafetyOutlined, PoweroffOutlined } from '@ant-design/icons';
import { validate_password, validate_email } from '../../utils/validate'
import { Login, GetSms } from '../../api/account'

class LoginFrom extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: '获取验证码'
    }
    // React 没有数据双向绑定
  }
  //登录
  onFinish = values => {
    Login(values).then(response => {  //resolves
      console.log(response);
    }).catch(error => {   //reject
      console.log(error);
    })
    console.log('Received values of form: ', values);
  };
  //获取验证码
  getCode = () => {
    if (!this.state.username) {
      message.warning('用户名不能为空', 1);
      return false
    }
    this.setState({
      code_button_loading: true,
      code_button_text: '发送中'
    })
    const requerstData = {
      username: this.state.username,
      module: 'login'
    }
    GetSms(requerstData).then(response => {
      this.countDown()
      console.log(response);
    }).catch(error => {
      this.setState({
        code_button_loading: false,
        code_button_text: '重新获取'
      })
    })
  }
  /**
   * 倒计时
  */
  countDown = () => {
    // 定时器
    let timer = null
    // 倒计时时间
    let sec = 60
    // 修改状态
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec} s`
    })
    /**
     * setInterval(() => {}, interval);  clearInterval   不间断定时器
     * setTimeout(() => {}, timeout);    clearTimeout    只执行一次
     * */
    timer = setInterval(() => {
      sec--
      if (sec <= 0) {
        this.setState({
          code_button_text: `重新获取`,
          code_button_disabled: false
        })
        clearInterval(timer)
        return false
      }
      this.setState({
        code_button_text: `${sec} s`
      })
    }, 1000);
  }
  //inputChange事件
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      username: value
    })
  }
  toggleFrom = () => {
    // 调用父级方法
    this.props.switchForm('register')
  }
  render () {
    const { username, code_button_disabled, code_button_text, code_button_loading } = this.state
    // const _this = this
    return (
      <Fragment>
        <div className='form-header'>
          <h4 className='column'>登录</h4>
          <span onClick={this.toggleFrom}>账号注册</span>
        </div>
        <div className='form-content'>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            {/* 用户名 */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '邮箱不能为空' },
                { type: 'email', message: '请输入合法的邮箱格式' }
              ]}
            >
              <Input
                value={username}
                onChange={this.inputChange}
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
            </Form.Item>
            {/* 密码 */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码不能为空' },
                { pattern: validate_password, message: '字母+数字,大于6位小于20位' },
              ]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="字母+数字,大于6位小于20位" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: '验证码不能为空' },
                { lin: 6, message: '请输入长度为6位的验证码' }
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<PropertySafetyOutlined className="site-form-item-icon" />} placeholder="验证码" />
                </Col>
                <Col span={9}>
                  <Button type="danger" block onClick={this.getCode} loading={code_button_loading} disabled={code_button_disabled}>
                    {code_button_text}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    )
  }
}
export default LoginFrom;
