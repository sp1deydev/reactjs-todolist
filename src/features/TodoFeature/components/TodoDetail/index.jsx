import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag } from 'antd';
import './style.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

TodoDetail.propTypes = {
    todo: PropTypes.object,
    onStatusClick: PropTypes.func,

};
TodoDetail.defaultProps = {
    todo: {},
    onStatusClick: null,
};

function TodoDetail(props) {
    const history = useHistory();

    const handleBackToList = () => {
        history.goBack();
    }
    const handleToggleStatus = (id) => {
        props.onStatusClick(id);
    }
    
    return (
        <div>
            <Card className='card-container' title={props.todo.title} extra={<Button type="text" onClick={()=>handleBackToList()}>Back To List</Button>}>
            <Tag
                color={props.todo.status === "completed" ? "green" : "volcano"}
                onClick={() => handleToggleStatus(props.todo.id)}
                style={{cursor:'pointer'}}
            >
                {props.todo.status}
            </Tag>
            </Card>
        </div>
    );
}

export default TodoDetail;