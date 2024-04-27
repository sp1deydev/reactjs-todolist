import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min.js';
import TodoList from '../../components/TodoList/index.jsx';
import { Radio } from 'antd';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: "Reading Books",
            status: 'completed',
        },
        {
            id: 2,
            title: "Play Football",
            status: 'completed',
        },
        {
            id: 3,
            title: "Do Homeworks",
            status: 'incompleted',
        },
    ];
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filter, setFilter] = useState(() => {
        const urlParams = queryString.parse(location.search);
        return urlParams.status || 'all';

    });

    useEffect(() => {
        const urlParams = queryString.parse(location.search);
        setFilter(urlParams.status || 'all');
    }, [location.search] )


    const handleStatusClick = (id) => {
        let index = todoList.findIndex(todo => todo.id === id);
        let newTodoList = [...todoList];
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'completed' ? 'incompleted' : 'completed',
        }
        setTodoList(newTodoList);
    }
    const handleUpdate = (id, title) => {
        let index = todoList.findIndex(todo => todo.id === id);
        let newTodoList = [...todoList];
        newTodoList[index] = {
            ...newTodoList[index],
            title: title,
        }
        setTodoList(newTodoList);
    }
    const handleDelete = (id) => {
        let index = todoList.findIndex(todo => todo.id === id);
        let newTodoList = [...todoList];
        newTodoList.splice(index, 1)
        setTodoList(newTodoList);
    }

    //filter buttons
    const handleFilterClick = (filterStatus) => {
        const queryParams = { status:  filterStatus};
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        })
    }

    //add new task btn
    const handleAdd = (task) => {
        console.log(task);
        let newTask ={...task, id: Math.random().toString(36).substring(2, 6)};
        let newTodoList = [...todoList];
        newTodoList.push(newTask);
        setTodoList(newTodoList);
    }

    const renderedTodoList = todoList.filter(todo => filter === "all" || filter === todo.status)

    return (
        <div>
            <h3>TodoList</h3>
            <Radio.Group value={filter} onChange={(e) => handleFilterClick(e.target.value)}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
                <Radio.Button value="incompleted">Incompleted</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <TodoList 
                todoList={renderedTodoList} 
                onStatusClick={handleStatusClick}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
            >
            </TodoList>
        
        </div>
    );
}

export default ListPage;