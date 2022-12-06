/*
 * @Author: your name
 * @Date: 2020-12-03 10:26:49
 * @LastEditTime: 2021-08-25 14:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Breadcrumb/index.js
 */
import "./index.less";

import { Breadcrumb } from "antd";
import { historyPush } from "client/router";
import React, { memo } from "react";

const { Item } = Breadcrumb;
export default memo((props) => {
  const { data = [] } = props;

  return (
    <Breadcrumb className="breadcrumb">
      {data.map((item, index) => {
        const { label, href, path, component } = item;
        return href || path ? (
          <Item
            key={index}
            className="has-link"
            href={href || null}
            onClick={() => {
              path && historyPush(path);
            }}>
            {component ? component : null}
            {label ? label : null}
          </Item>
        ) : (
          <Item key={index}>
            {component ? component : null}
            {label ? label : null}
          </Item>
        );
      })}
    </Breadcrumb>
  );
});
