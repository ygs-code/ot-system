/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 11:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { Pagination, Table } from "antd";
import { getStyle } from "client/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Index = (props) => {
  const { dataSource = [], columns, tableProps = {}, siblingHight = 0 } = props;
  const [height, setHeight] = useState(0);
  const tableBoxRef = useRef(null);
  const tableRef = useRef(null);

  const getChildrenPage = useCallback((node) => {
    while (node && node.getAttribute("id") !== "childrenPage") {
      node = node.parentNode;
    }
    return node;
  }, []);

  const $setHeight = useCallback(() => {
    console.log(1);
    // console.log("tableRef=", parseInt(getStyle(tableRef.current, "height")));
    let height =
      parseInt(getStyle(getChildrenPage(tableBoxRef.current), "height")) -
      parseInt(siblingHight);

    setHeight(height);
  }, [tableBoxRef.current, dataSource.length]);

  useEffect(() => {
    $setHeight();
    window.addEventListener("resize", $setHeight);
    return () => {
      window.removeEventListener("resize", $setHeight);
    };
  }, [tableBoxRef.current, dataSource.length]);

  return (
    <>
      <div
        className="table-box"
        ref={tableBoxRef}
        style={{
          height: height + "px"
        }}>
        <Table
          scroll={{
            y: height - 50 + "px"
          }}
          ref={tableRef}
          columns={columns}
          {...tableProps}
          pagination={false}
        />
      </div>
      <div className="table-ant-pagination">
        <Pagination
          className="ant-pagination ant-table-pagination ant-table-pagination-right"
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={() => {}}
        />
      </div>
    </>
  );
};

export default Index;
