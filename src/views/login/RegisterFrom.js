import React, { Component, Fragment } from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined, PropertySafetyOutlined } from '@ant-design/icons';

class RegisterFrom extends Component {
  constructor() {
    super();
    this.state = {}
  }
  toggleFrom = () => {
    this.props.switchForm('login')
  }
  render () {
    return (
      <Fragment>
        <div className='form-header'>
          <h4 className='column'>注册</h4>
          <span onClick={this.toggleFrom}>账号登录</span>
        </div>
        <div className='form-content'>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={() => this.onFinish}
          >
            {/* 用户名 */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            {/* 密码 */}
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="密码" />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[
                { required: true, message: '请输入密码' },
                ({ getFieldValue }) => ({
                  validator (_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                })
              ]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="密码" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<PropertySafetyOutlined className="site-form-item-icon" />} placeholder="验证码" />
                </Col>
                <Col span={9}>
                  <Button type="danger" block>
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    )
  }
}
export default RegisterFrom;
