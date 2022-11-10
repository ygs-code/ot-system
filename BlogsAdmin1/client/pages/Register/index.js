import React from "react";
import { register } from "client/common/js/request/index";
import "client/common/css/base.less";
import "./index.less";
import { Form, Input, Button, Checkbox, message } from "antd";
import { routePaths, historyPush, getHistory } from "client/router";
import { checkPhone, checkUser, checkPassword, checkEmail } from "client/utils";
import VerificationCode from "cliemt/component/VerificationCode";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Index = () => {
  const onFinish = async (values) => {
    // console.log('register=', register);
    // console.log('Success:', values);
    console.log("values======", values);
    const data = await register(values);
    message.success("注册成功");
    setTimeout(() => {
      historyPush({
        url: routePaths.logLn,
      });
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="center log-in">
      <h3>《屈臣氏》 </h3>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (checkUser(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("用户名必须最少为6位，并且以字母开头");
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入手机号！",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (checkPhone(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的手机号码");
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入邮箱！",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (checkEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("请输入正确的邮箱");
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!checkPassword(value)) {
                  return Promise.reject(
                    "密码最少为8位，并且最少含有字母和数字组成"
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入密码!",
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
              },
            }),
          ]}
        >
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
              onClick={() => {}}
            >
              确定
            </Button>
            <Button
              className="submit"
              onClick={() => {
                historyPush({
                  url: routePaths.logLn,
                });
              }}
            >
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
