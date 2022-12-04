import "client/assets/css/base.less";
import "./index.less";

import { Button, Form, Input, message } from "antd";
import { register } from "client/assets/js/request/index";
import VerificationCode from "client/component/VerificationCode";
import { addRouterApi, toComponent } from "client/router";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import React from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Index = (props) => {
  const { pushRoute, routePaths } = props;
  const onFinish = async (values) => {
    await register({
      type: 1,
      ...values
    });
    message.success("注册成功");
    setTimeout(() => {
      pushRoute(routePaths.logIn);
    }, 1500);
  };

  const onFinishFailed = () => {};

  return (
    <div className="center log-in">
      <h3>《屈臣氏》 </h3>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="用户名"
          name="name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入用户名!"
            },
            () => ({
              validator(rule, value) {
                if (checkUser(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("用户名必须最少为4位，并且以字母开头");
              }
            })
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入手机号！"
            },
            () => ({
              validator(rule, value) {
                if (checkPhone(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的手机号码");
              }
            })
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入邮箱！"
            },
            () => ({
              validator(rule, value) {
                if (checkEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的邮箱");
              }
            })
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入密码!"
            },
            () => ({
              validator(rule, value) {
                if (!checkPassword(value)) {
                  return Promise.reject(
                    "密码最少为8位，并且最少含有字母和数字组成"
                  );
                }
                return Promise.resolve();
              }
            })
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入密码!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!checkPassword(value)) {
                  return Promise.reject(
                    "密码最少为8位，并且最少含有字母和数字组成"
                  );
                } else if (value && getFieldValue("password") !== value) {
                  return Promise.reject("输入两次密码不相同，请重新输入");
                }
                return Promise.resolve();

                //   if (!value || getFieldValue('password') === value) {
                //     return Promise.resolve();
                //   }
                //   return Promise.reject('输入两次密码不相同，请重新输入');
              }
            })
          ]}>
          <Input.Password />
        </Form.Item>

        {/*验证码*/}
        <VerificationCode />
        <Form.Item {...tailLayout}>
          <div className="buttons">
            <Button
              className="submit"
              type="primary"
              htmlType="submit"
              onClick={() => {}}>
              确定
            </Button>
            <Button
              className="submit"
              onClick={() => {
                pushRoute(routePaths.logIn);
                // historyPush({
                //   url: routePaths.LogIn
                // });
              }}>
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default toComponent(addRouterApi(Index));
