import React, { useCallback, useEffect, useState } from "react";
import "client/assets/css/base.less";
import "./index.less";
import { Form, Input, Button, message, Checkbox } from "antd";
import {
  routePaths,
  historyPush,
  getHistory,
  addRouterApi
} from "client/router";
import {
  login,
  createUser,
  getVerifyCode
} from "client/assets/js/request/index";
import VerificationCode from "client/component/VerificationCode";
import { checkPhone, checkUser, checkPassword, checkEmail } from "client/utils";
import Store, { mapRedux } from "client/redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Index = (props) => {
  const { history, pushRoute, routePaths } = props;
  const [verifyCodeData, setVerifyCodeData] = useState({});

  const onFinish = async (values) => {
    const {
      dispatch: {
        user: { setUserInfo, fetchUser, getUserInfo }
      }
    } = props;

    const data = await login(values);
    console.log("data===", data);
    const {
      data: { token, userInfo }
    } = data;

    localStorage.setItem("token", token);

    setUserInfo(userInfo);

    message.success("登录成功");
    setTimeout(() => {
      pushRoute(routePaths.home);
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {}, []);

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
          label="用户名/手机号/邮箱"
          name="name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "请输入用户名或手机号或邮箱"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (
                  checkUser(value) ||
                  checkPhone(value) ||
                  checkEmail(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("格式不正确请重新输入");
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
            ({ getFieldValue }) => ({
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
        {/*验证码*/}
        <VerificationCode />
        <Form.Item {...tailLayout}>
          <div className="buttons">
            <Button className="submit" type="primary" htmlType="submit">
              登录
            </Button>
            <Button
              className="submit"
              onClick={() => {
                pushRoute(routePaths.register);
              }}>
              注册
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default mapRedux(["user"])(addRouterApi(Index));
