import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag } from 'antd';
import './style.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

TodoDetail.propTypes = {
    
};

function TodoDetail(props) {
    const history = useHistory();

    const handleBackToList = () => {
        history.goBack();
    }
    
    return (
        <div>
            <Card className='card-container' title="TodoTitle" extra={<Button type="text" onClick={()=>handleBackToList()}>Back To List</Button>}>
            <Tag
                // color={status === "completed" ? "green" : "volcano"}
                // onClick={() => handleToggleStatus(id)}
                style={{cursor:'pointer'}}
            >
                completed
            </Tag>
            </Card>
        </div>
    );
}

export default TodoDetail;