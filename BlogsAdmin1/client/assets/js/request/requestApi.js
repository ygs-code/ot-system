/*
 * @Author: your name
 * @Date: 2020-12-14 10:03:45
 * @LastEditTime: 2022-06-09 14:12:19
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsAdmin/src/common/js/request/requestApi.js
 */
import { gql, GraphqlClient } from "./request";

// var userId = "559645cd1a38532d14349246";

// 获取验证码
// export const getVerifyCode = () => {
//   return Request.get("/set/user/getVerifyCode");
// };

// export const getVerifyCode = () => {
//   // return Request.get("/set/user/getVerifyCode");
//   return GraphqlClient.query({
//     query: gql`
//       ${schema}
//     `,
//     variables: parameter,
//   });
// };

// 查询
export const query = (operationName, schema, parameter = {}, options = {}) => {
  return GraphqlClient.query(
    {
      operationName,
      query: schema,
      variables: parameter
    },
    {
      filterData: true,
      ...options
    }
  );
};

// 变异
export const mutation = (
  operationName,
  schema,
  parameter = {},
  options = {}
) => {
  return GraphqlClient.mutate(
    {
      operationName,
      mutation: `${schema}`,
      variables: parameter
    },
    {
      filterData: true,
      ...options
    }
  );
};

// 获取验证码
export const getVerifyCode = () => {
  return query(
    "getVerifyCode",
    ` query{
      getVerifyCode {
          code
          message
          data {
            svg
          }
        }
    }
  `
  );
};

// 注册
export const register = (parameter) => {
  return mutation(
    "createUser",
    `
        mutation($userInfo: UserInfoInput!) { 
          createUser(userInfo: $userInfo) {
              code
              message
            }
        }
    `,
    {
      userInfo: parameter
    }
  );
};

// 登录
export const login = (parameter) => {
  const { password, name, verificationCode } = parameter;
  return query(
    "login",
    ` query{
        login(
          password:"${password}",
          name:"${name}",
          verificationCode:"${verificationCode}"
          ){
            code
            data {
              token 
              authKeys
              role{
                id 
                name 
                description 
              }
              permission{
                id 
                name 
                description 
                authKey 
                parentAuthKey 
              }
              user {
                  name
                  phone
                  id
              } 
            }
            message
          } 
   }
    `

    // {
    //   userInfo: parameter,
    // }
  );

  //return Request.post("/set/user/login", parameter);
};

export const getUser = () => {
  return GraphqlClient.query({
    query: gql`
      {
        hello
      }
    `
  });
};

//   更改
export const setUserInfo = () => {
  return GraphqlClient.mutate({
    operationName: "setUserInfo",
    mutation: `
      mutation ($user: UserInfoInput!) {
        setUserInfo(user: $user) {
          code
          mgs
          data {
            name
            phone
          }
        }
      }
    `,
    variables: {
      user: {
        id: 123,
        toKen: "123"
      }
    }
  });
};

export const getUserList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getUserList",
    `
    query($parameter: UserListInfoInput!){
      getUserList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              name
              phone
              id
              type
              email
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 查询
export const getUserInfo = (parameter = {}) => {
  const { id = "" } = parameter;
  return query(
    "getUserInfo",
    `
      query{
          getUserInfo(id: "${id}") {
            code
            data {
              token 
              authKeys
              role{
                id 
                name 
                description 
              }
              permission{
                id 
                name 
                description 
                authKey 
                parentAuthKey 
              }
              user {
                  name
                  phone
                  id
              } 
            }
            message
          } 
      }
    `,
    {},
    {
      filterData: true
    }
  );
};

export const hello = () => {
  return GraphqlClient.query({
    operationName: "getUserInfo",
    name: "hello",
    query: gql`
            {
                hello()
                {

                }
            }
        `
  });
};
