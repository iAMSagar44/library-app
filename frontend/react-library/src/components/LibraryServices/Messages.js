import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOktaAuth } from '@okta/okta-react';

export const Messages = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [request, setRequest] = useState({});

    const { authState } = useOktaAuth();

    const formik = useFormik({
        initialValues: {
            title: '',
            question: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(40, 'Must be 40 characters or less')
                .required('Required field'),
            question: Yup.string()
                .max(100, 'Must be 100 characters or less')
                .required('Required field'),
        }),
        onSubmit: values => {
            setRequest(values);
            setIsSubmitting(true);
        },
    });

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
                    })
                    .catch(error => {
                        console.log(error);
                        setIsSubmitting(false);
                    });
            }
        }

    }, [isSubmitting])

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
                            aria-selected='false'>
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
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel'
                        aria-labelledby='nav-history-tab'>
                        <p>History</p>
                    </div>
                </div>
            </div>
        </div>
    )
}