import PropTypes from "prop-types";
import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Input, message, Popconfirm, Button, Modal } from 'antd';
import { useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onStatusClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};
TodoList.defaultProps = {
  todoList: [],
  onStatusClick: null,
  onUpdate: null,
  onDelete: null,
};

function TodoList(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [editTitle, setEditTitle] = useState();
  const [editId, setEditId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleToggleStatus = (index) => {
    props.onStatusClick(index);
  }

  const handleEdit = (id, title) => {
     setEditId(id);
     setEditTitle(title)
  }

  const handEditFormChange = (event) => {
    event.preventDefault();
    setEditTitle(event.target.value)
  }
  const handleCancelEdit = () => {
    setEditId();
  }

  const handleUpdate = () => {
    if(!editTitle || !editId) {
      messageApi.open({
        type: 'error',
        content: 'Please enter title!',
        duration: 2,
      });
    }
    else {
      props.onUpdate(editId, editTitle)
      setEditId();
    }
  }

  const handleDelete = (id) => {
      props.onDelete(id)
      setEditId();
  }

  const handleView = (id) => {
      history.push(match.path + '/' + `${id}`)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // eslint-disable-next-line
      render: (_, record) => {
        if(record.id === editId)
          return <Input placeholder="Input title" name="title" value={editTitle} onChange={(event) => handEditFormChange(event)} variant="borderless" />
        else
         return <a>{record.title}</a>
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { id, status }, index) => (
        <>
          <Tag
            color={status === "completed" ? "green" : "volcano"}
            onClick={() => handleToggleStatus(id)}
            style={{cursor:'pointer'}}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if(record.id === editId)
          return (
            <Space size="middle">
              <a onClick={()=>{handleCancelEdit()}}>Cancel</a>
              <a onClick={()=>{handleUpdate()}}>Update</a>
            </Space>
          )
        else
          return (
            <Space size="middle">
              <a onClick={()=>handleView(record.id)}>View</a>
              <a onClick={()=>handleEdit(record.id, record.title)}>Edit</a>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={()=>handleDelete(record.id)}
                // onCancel={cancel}
                okText="Confirm"
                cancelText="Cancel"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )
      }
    }   
  ];
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table columns={columns} dataSource={props.todoList} />
    </>
  )
}
export default TodoList;
