import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOktaAuth } from '@okta/okta-react';
import { Pagination } from "../SearchBooks/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Question } from "./Question";

export const Messages = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [request, setRequest] = useState({});
    const [submissionProcessed, setSubmissionProcessed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState(null);
    const [refreshHistory, setRefreshHistory] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { authState } = useOktaAuth();

    const formik = useFormik({
        initialValues: {
            title: '',
            question: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(60, 'Must be 60 characters or less')
                .required('Required field'),
            question: Yup.string()
                .max(150, 'Must be 150 characters or less')
                .required('Required field'),
        }),
        onSubmit: (values, { resetForm }) => {
            setRequest(values);
            setIsSubmitting(true);
            setTimeout(() => resetForm(), 500);
        },
    });

    function refreshQuestionsHistory() {
        setIsLoading(true)
        setRefreshHistory(true);
    }

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
        setRefreshHistory(true);
    }

    useEffect(() => {
        console.log("Use Effect in Messages component running");
        if (isSubmitting) {
            console.log("Call to back end server", request);
            if (authState?.isAuthenticated) {
                console.log("User is authenticated");
                // Set the request headers with the OAuth bearer token
                const config = {
                    headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
                };

                // Make a request to the secured endpoint using Axios
                axios.post(`http://localhost:8080/user/api/messages`, request, config)
                    .then(response => {
                        console.log("Question submitted successfully", response.data);
                        setTimeout(() => setIsSubmitting(false), 500);
                        setSubmissionProcessed(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsSubmitting(false);
                    });
            }
        }

    }, [isSubmitting])

    useEffect(() => {
        console.log("Use Effect in Messages component running -- to retrieve q/as history");
        if (refreshHistory) {
            console.log("-----> Use Effect in Messages component running -- to retrieve q/as history - retrieve history, retrieve data running .......")
            if (authState?.isAuthenticated) {
                console.log("User is authenticated");
                // Set the request headers with the OAuth bearer token
                const config = {
                    headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
                };
                axios.get(`http://localhost:8080/user/api/messages?page=${currentPage}&size=5`, config)
                    .then(response => {
                        console.log(response.data);
                        setHistory(response.data);
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

    return (
        <div className='container'>
            <div className='mt-3'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className='nav-link active' id='nav-subquestion-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-subquestion' type='button' role='tab' aria-controls='nav-subquestion'
                            aria-selected='true'>
                            Submit Question
                        </button>
                        <button className='nav-link' id='nav-history-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history'
                            aria-selected='false'
                            onClick={refreshQuestionsHistory}>
                            My Questions
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-subquestion' role='tabpanel'
                        aria-labelledby='nav-subquestion-tab'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3 mt-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" {...formik.getFieldProps('title')} />
                                {formik.touched.title && formik.errors.title ? (
                                    <p className='fs-6 fst-italic text-danger'>{formik.errors.title}</p>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">Please type in your question here</label>
                                <textarea className="form-control" id="question" rows="4" {...formik.getFieldProps('question')}></textarea>
                                {formik.touched.question && formik.errors.question ? (
                                    <p className='fs-6 fst-italic text-danger'>{formik.errors.question}</p>
                                ) : null}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                        </form>
                        {
                            (submissionProcessed) && (
                                <div className="alert alert-success d-flex align-items-center alert-dismissible fade show mt-3" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi flex-shrink-0 me-2 bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    <div>
                                        Thanks for submitting your query. We will get back to you shortly.
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSubmissionProcessed(false)}></button>
                                </div>
                            )
                        }
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
                                    <h5 className="mt-2">Current Q/A: </h5>
                                    {
                                        ((history.totalElements === 0)) && (
                                            <div className="m-5">
                                                <h5>All questions you submit will be shown here</h5>
                                            </div>
                                        )
                                    }
                                    <div className='mt-2'>
                                        {
                                            (history.totalElements > 0) && (
                                                history.content.map(question => (
                                                    <Question key={question.id} question={question} />
                                                ))
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }
                        <div className="mt-4">
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
    )
}