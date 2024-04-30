import React, { useEffect, useState } from 'react';
import TodoDetail from '../../components/TodoDetail';
import handleStorage from '../../../../utils/handleLocalStorage';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import handleLocalStorage from '../../../../utils/handleLocalStorage';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const [todoList, setTodoList] = useState([])
    const [todo, setTodo] = useState({});
    const match = useRouteMatch();

    useEffect(() => {
        let initTodoList = handleStorage.get('todoList');
        let todoId = match.params.todoId;
        if(initTodoList) {
            let index = initTodoList.findIndex(todo => todo.id === todoId);
            setTodo(initTodoList[index]);
            setTodoList(initTodoList);
        }
    }, [])
    
    const handleStatusClick = (id) => {
        let index = todoList.findIndex(todo => todo.id === id);
        let newTodoList = [...todoList];
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'completed' ? 'incompleted' : 'completed',
        }
        setTodo(newTodoList[index]);
        setTodoList(newTodoList);
        handleLocalStorage.set('todoList', newTodoList);
    }

    return (
        <div>
            <h3>Todo Detail</h3>
            <TodoDetail 
                todo={todo}
                onStatusClick={handleStatusClick}
            />
        </div>
    );
}

export default DetailPage;