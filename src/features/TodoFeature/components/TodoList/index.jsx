import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
};


function TodoList(props) {
    const {todoList} = props;
    const handleTodoClick = (todo, index) => {
        props.onTodoClick(todo, index);
    }

    return (
        <ul>
            {todoList.map((todo, index) => {
                return <li key={todo.id} onClick={()=>{handleTodoClick(todo, index)}}>{todo.title} -  {todo.status}</li>
            })}
        </ul>
    );
}

export default TodoList;