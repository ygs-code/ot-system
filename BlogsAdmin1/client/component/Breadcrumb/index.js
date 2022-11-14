/*
 * @Author: your name
 * @Date: 2020-12-03 10:26:49
 * @LastEditTime: 2021-08-25 14:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Breadcrumb/index.js
 */
import React, { memo, useCallback, forwardRef, useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  routePaths,
  historyPush,
  getHistory,
  pathComponent
} from "client/router";
import { Layout, Menu, Select, Dropdown, Avatar, Breadcrumb } from "antd";
import "./index.less";

const { Option } = Select;
const { Header, Sider, Content } = Layout;
const { Item } = Breadcrumb;
export default memo(
  forwardRef((props, ref) => {
    const { data = [] } = props;

    return (
      <Breadcrumb className="breadcrumb">
        {data.map((item) => {
          const { label, href, path, component } = item;
          return href || path ? (
            <Item
              className="has-link"
              href={href || null}
              onClick={() => {
                path && historyPush(path);
              }}>
              {component ? component : null}
              {label ? label : null}
            </Item>
          ) : (
            <Item>
              {component ? component : null}
              {label ? label : null}
            </Item>
          );
        })}
      </Breadcrumb>
    );
  })
);
