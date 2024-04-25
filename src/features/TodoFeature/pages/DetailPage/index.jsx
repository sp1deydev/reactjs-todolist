import React from 'react';
import TodoDetail from '../../components/TodoDetail';

DetailPage.propTypes = {
    
};

function DetailPage(props) {

    return (
        <div>
            <h3>Todo Detail</h3>
            <TodoDetail />
        </div>
    );
}

export default DetailPage;