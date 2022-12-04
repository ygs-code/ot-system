/*
 * @Author: your name
 * @Date: 2021-08-23 15:05:27
 * @LastEditTime: 2022-04-22 19:37:33
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/admin/src/common/component/VerificationCode/index.js
 */
import { Form, Input } from "antd";
import { getVerifyCode } from "client/assets/js/request/index";
import { checkVerificationCode } from "client/utils";
import React, { useCallback, useEffect, useState } from "react";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Index = () => {
  const [verifyCodeData, setVerifyCodeData] = useState({});

  const verifyCode = useCallback(async () => {
    const data = await getVerifyCode();
    const {
      data: { svg }
    } = data;
    setVerifyCodeData({
      svg
    });
  }, []);
  useEffect(() => {
    verifyCode();
  }, []);
  const { svg = "" } = verifyCodeData;

  return (
    <>
      <Form.Item
        label="验证码"
        name="verificationCode"
        validateFirst={true}
        rules={[
          {
            required: true,
            message: "请输入验证码!"
          },
          () => ({
            validator(rule, value) {
              if (!checkVerificationCode(value)) {
                return Promise.reject("验证码5位，由字母和数字组成");
              }
              return Promise.resolve();
            }
          })
        ]}>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <div
          onClick={() => {
            verifyCode();
          }}
          style={{
            width: "110px",
            height: "35px"
          }}
          dangerouslySetInnerHTML={{ __html: svg }}></div>
      </Form.Item>
    </>
  );
};

export default Index;
