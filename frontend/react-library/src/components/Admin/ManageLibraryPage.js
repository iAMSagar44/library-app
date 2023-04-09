import { useOktaAuth } from '@okta/okta-react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Pagination } from '../SearchBooks/Pagination';
import { AdminResponse } from './AdminResponse';
import axios from "axios";
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { AddNewBook } from './AddNewBook';
import { ManageBooks } from './ManageBooks';

export const ManageLibraryPage = () => {

    const { authState } = useOktaAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [refreshHistory, setRefreshHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
        setRefreshHistory(true);
    }

    function refreshQuestionsHistory() {
        setIsLoading(true)
        setRefreshHistory(true);
    }

    useEffect(() => {
        console.log("-----> Use effect on Admin page is running .......");
        if (refreshHistory) {
            if (authState?.isAuthenticated) {
                console.log("User is Authenticated");
                // Set the request headers with the OAuth bearer token
                const config = {
                    headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
                };
                axios.get(`http://localhost:8080/admin/api/messages?closed=false&page=${currentPage}&size=5`, config)
                    .then(response => {
                        console.log(response.data);
                        setQuestions(response.data);
                        setIsLoading(false);
                        setRefreshHistory(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoading(false);
                        setRefreshHistory(false);
                    });
            }
        }

    }, [refreshHistory])

    if (authState?.accessToken?.claims.userType === undefined) {
        console.log("Not an Admin user");
        return <Navigate to="/" />
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Library</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book'
                            aria-selected='false'
                        >
                            Add new book
                        </button>
                        <button className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity'
                            aria-selected='true'
                        >
                            Manage Books
                        </button>
                        <button className='nav-link' id='nav-messages-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages'
                            aria-selected='false'
                            onClick={refreshQuestionsHistory}
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                        <AddNewBook />
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                        <ManageBooks />
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {
                            (isLoading) &&
                            <SpinnerLoading />
                        }
                        {
                            (!isLoading && questions) && (
                                <>
                                    <h5 className="mt-2">Questions for Admin: </h5>
                                    {
                                        ((questions.totalElements === 0)) && (
                                            <div className="m-5">
                                                <h5>All questions submitted will be shown here</h5>
                                            </div>
                                        )
                                    }
                                    <div className='mt-2'>
                                        {
                                            (questions.totalElements > 0) && (
                                                questions.content.map(question => (
                                                    <AdminResponse key={question.id} question={question} refreshResponse={refreshQuestionsHistory}/>
                                                ))
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }
                        <div className="mt-4">
                            {
                                (!isLoading && questions && (questions.totalElements > 0)) && (
                                    <Pagination currentPage={currentPage} totalPages={questions.totalPages} handlePageChange={onPageChange} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}