import PropTypes from "prop-types";
import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Input, message, Popconfirm, Button, Modal, Form, Radio } from 'antd';
import { useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import './style.css'

TodoList.propTypes = {
  todoList: PropTypes.array,
  onStatusClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};
TodoList.defaultProps = {
  todoList: [],
  onStatusClick: null,
  onUpdate: null,
  onDelete: null,
  onAdd: null,
};

function TodoList(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [editTitle, setEditTitle] = useState();
  const [editId, setEditId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // do something with values
      props.onAdd(values);
      form.resetFields();
      setIsModalOpen(false);
    }).catch((err) => {
      // form validation failed
      console.log(err)
   })
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  
  const onReset = () => {
    form.resetFields();
  };

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
  

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // eslint-disable-next-line
      render: (_, record) => {
        if(record.id === editId)
          return <Input placeholder="Input title" name="title" value={editTitle} onChange={(event) => handEditFormChange(event)} variant="borderless" autoFocus/>
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
      <Button type="primary" onClick={showModal} className="add-new-btn">
        Add New
      </Button>
      <Modal 
        title="Add New Task" 
        style={{ maxWidth: 350 }}
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={onReset} >
            Reset
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} htmlType="submit">
            Add
          </Button>,
          ,
        ]}
      >
        <Form
          form={form}
          name="control-hooks"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="incompleted"> Incompleted </Radio>
                <Radio value="completed"> Completed </Radio>
              </Radio.Group>
            </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={props.todoList} />
    </>
  )
}
export default TodoList;
