import React from 'react';
import { useDispatch } from 'react-redux';
import {toggleActions } from './dashBoardToggleRducer'

const Pagination = ({totalPages, currentPage}) => {
    const  dispatch = useDispatch();

    return (
        <div className="pagination">
            <button className="prev" onClick={() => dispatch(toggleActions.handlePageChange(currentPage - 1))} disabled={currentPage === 1}>Prev</button>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button key={index} className="key" onClick={() => dispatch(toggleActions.handlePageChange(index + 1))}>{index + 1}</button>
            ))}
            <button className="current" onClick={() => dispatch(toggleActions.handlePageChange(currentPage + 1))}  disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}

export default Pagination;
