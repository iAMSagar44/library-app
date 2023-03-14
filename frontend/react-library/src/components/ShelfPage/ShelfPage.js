import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Loans } from "./Loans";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const ShelfPage = () => {

    const [loanedBooks, setLoanedBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { authState } = useOktaAuth();

    useEffect(() => {
        console.log("-----> Use effect for Shelf Page component running .......")
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
                });
        }
    }, [])

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
                            aria-selected='false'>
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
                        <div className='row row-cols-1 row-cols-md-4 g-4'>
                            {
                                (!isLoading) && (
                                    loanedBooks.map(loanedBook => (
                                        <Loans key={loanedBook.book.id} loanedBook={loanedBook}/>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel'
                        aria-labelledby='nav-history-tab'>
                        <p>Checkout History</p>
                    </div>
                </div>
            </div>
        </div>
    );
}