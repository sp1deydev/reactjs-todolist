import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min.js';
import TodoList from '../../components/TodoList/index.jsx';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: "test1",
            status: 'ok',
        },
        {
            id: 2,
            title: "test2",
            status: 'notok',
        },
        {
            id: 3,
            title: "test3",
            status: 'ok',
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



    const handleTodoClick = (todo, index) => {
        console.log(todo, index)
        let newTodoList = [...todoList];
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'ok' ? 'notok' : 'ok',
        }
        setTodoList(newTodoList);
    }

    //filter buttons
    const handleShowAllClick = () => {
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        })
    }

    const handleShowOkClick = () => {
        const queryParams = { status: 'ok' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        })
    }

    const handleShowNotOkClick = () => {
        const queryParams = { status: 'notok' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        })
    }

    const renderedTodoList = todoList.filter(todo => filter === "all" || filter === todo.status)

    return (
        <div>
            <h3>TodoList</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}></TodoList>
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowOkClick}>Show Ok</button>
                <button onClick={handleShowNotOkClick}>Show NotOK</button>
            </div>
        </div>
    );
}

export default ListPage;