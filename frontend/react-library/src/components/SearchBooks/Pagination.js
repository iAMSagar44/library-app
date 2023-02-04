import React from "react";

export const Pagination = ({ currentPage, totalPages }) => {

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${currentPage+1 === 1 ? 'disabled' : ''}`}>
                        <button className="page-link">Previous</button>
                    </li>
                    <li className="page-item"><button className="page-link">1</button></li>
                    <li className="page-item"><button className="page-link">2</button></li>
                    <li className="page-item"><button className="page-link">3</button></li>
                    <li className="page-item">
                        <button className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}