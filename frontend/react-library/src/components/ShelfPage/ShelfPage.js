import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Loans } from "./Loans";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { ExploreTopBooks } from "../HomePage/ExploreTopBooks";
import { History } from "./History";
import { Pagination } from "../SearchBooks/Pagination";

export const ShelfPage = () => {

    const [loanedBooks, setLoanedBooks] = useState([]);
    const [history, setHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshBooks, setRefreshBooks] = useState(false);
    const [refreshHistory, setRefreshHistory] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { authState } = useOktaAuth();

    function refreshShelf() {
        setIsLoading(true)
        setRefreshBooks(!refreshBooks);
    }
    function refreshShelfHistory() {
        setIsLoading(true)
        setRefreshHistory(true);
    }

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
        setRefreshHistory(true);
    }

    useEffect(() => {
        console.log("-----> Use effect for Shelf Page component - retrieve loans running .......")
        if (authState?.isAuthenticated) {
            console.log("User is authenticated");
            // Set the request headers with the OAuth bearer token
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };

            // Make a request to the secured endpoint using Axios
            axios.get(`http://localhost:8080/user/api/loaned-books`, config)
                .then(response => {
                    console.log(response.data);
                    setLoanedBooks(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setError(error.message);
                    setIsLoading(false);
                });
        }
    }, [refreshBooks])

    useEffect(() => {
        console.log("-----> Use effect for Shelf Page component - retrieve history running .......")
        if (refreshHistory) {
            console.log("-----> Use effect for Shelf Page component - retrieve history, retrieve data running .......")
            if (authState?.isAuthenticated) {
                console.log("User is authenticated");
                // Set the request headers with the OAuth bearer token
                const config = {
                    headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
                };
                axios.get(`http://localhost:8080/user/api/history-books?page=${currentPage}&size=5`, config)
                    .then(response => {
                        console.log(response.data);
                        setHistory(response.data);
                        setIsLoading(false);
                        setRefreshHistory(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setError(error.message);
                        setIsLoading(false);
                        setRefreshHistory(false);
                    });
            }
        }

    }, [refreshHistory])

    return (
        <div className='container'>
            <div className='mt-3'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className='nav-link active' id='nav-loans-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-loans' type='button' role='tab' aria-controls='nav-loans'
                            aria-selected='true'>
                            Loans
                        </button>
                        <button className='nav-link' id='nav-history-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history'
                            aria-selected='false'
                            onClick={refreshShelfHistory}>
                            Your History
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-loans' role='tabpanel'
                        aria-labelledby='nav-loans-tab'>
                        {
                            (isLoading) &&
                            <SpinnerLoading />
                        }
                        {
                            (!isLoading && loanedBooks.length === 0) && (
                                <div>
                                    <p className='col-md-8 fs-4'>You have no books checked out.</p>
                                    <ExploreTopBooks />
                                </div>

                            )
                        }
                        <div className='row row-cols-1 row-cols-md-4 g-4'>
                            {
                                (!isLoading && loanedBooks.length > 0) && (
                                    loanedBooks.map(loanedBook => (
                                        <Loans key={loanedBook.book.id} loanedBook={loanedBook} refreshShelf={refreshShelf} />
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel'
                        aria-labelledby='nav-history-tab'>
                        {
                            (isLoading) &&
                            <SpinnerLoading />
                        }
                        {
                            (!isLoading && history) && (
                                <>
                                    {
                                        ((history.totalElements === 0)) && (
                                            <div className="m-5">
                                                <h3>No books returned yet.</h3>
                                                <p className='col-md-8 fs-4'>Returned books will be visible here.</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (history.totalElements > 0) && (
                                            history.content.map(book => (
                                                <History key={book.id} book={book} />
                                            ))
                                        )
                                    }
                                </>
                            )
                        }
                        <div>
                            {
                                (!isLoading && history && (history.totalElements > 0)) && (
                                    <Pagination currentPage={currentPage} totalPages={history.totalPages} handlePageChange={onPageChange} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}