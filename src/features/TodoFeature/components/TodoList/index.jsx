import PropTypes from "prop-types";
import { Space, Table, Tag } from "antd";
import React from "react";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList(props) {
  const handleClickStatus = (index) => {
    props.onTodoClick(index);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { id, status }, index) => (
        <>
          <Tag
            color={status == "completed" ? "green" : "volcano"}
            onClick={() => handleClickStatus(index)}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View</a>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={props.todoList} />;
}
export default TodoList;
