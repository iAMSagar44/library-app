import React from "react";

export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${currentPage + 1 === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {
                        Array.from({ length: totalPages }, (_, page) => (
                            <li key={page+1} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</button>
                            </li>
                        ))
                    }
                    <li className={`page-item ${currentPage + 1 === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}