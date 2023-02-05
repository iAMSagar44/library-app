import React from "react";

export const Pagination = ({ currentPage, totalPages }) => {

    const pages = [1, 2, 3];

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${currentPage + 1 === 1 ? 'disabled' : ''}`}>
                        <button className="page-link">Previous</button>
                    </li>
                    {
                        pages.map(page => (
                            <li key={page} className="page-item">
                                <button className="page-link">{page}</button>
                            </li>
                        ))
                    }
                    <li className={`page-item ${currentPage + 1 === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}