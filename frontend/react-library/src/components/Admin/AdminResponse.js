import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import axios from "axios";

export const AdminResponse = ({ question, refreshResponse }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { authState } = useOktaAuth();
    const [submissionProcessed, setSubmissionProcessed] = useState(false);

    const formik = useFormik({
        initialValues: {
            response: '',
        },
        validationSchema: Yup.object({
            response: Yup.string()
                .max(250, 'Must be 250 characters or less')
                .required('Required field'),
        }),
        onSubmit: (values, { resetForm }) => {
            setIsSubmitting(true);
            console.log(values);
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };
            axios.put(`http://localhost:8080/admin/api/messages/${question.id}`, values, config)
                .then(response => {
                    console.log("Response submitted successfully", response.data);
                    setSubmissionProcessed(true);
                })
                .catch(error => {
                    console.log(error);
                });
            setTimeout(() => resetForm(), 500);
        },
    });

    function refreshAdminResponses(){
        setSubmissionProcessed(false);
        refreshResponse();
    }

    return (
        <>

            <div className='card mt-2 shadow p-3 bg-body rounded'>
                <h5>Case #{question.id}: {question.title}</h5>
                <h6>{question.userEmail}</h6>
                <p>{question.question}</p>
                <hr />
                <div>
                    <h5>Response: </h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="response" className="form-label">Please type in your response here</label>
                            <textarea className="form-control" id="response" rows="4" {...formik.getFieldProps('response')}></textarea>
                            {formik.touched.response && formik.errors.response ? (
                                <p className='fs-6 fst-italic text-danger'>{formik.errors.response}</p>
                            ) : null}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                    </form>
                </div>
                {
                    (submissionProcessed) && (
                        <div className="alert alert-success d-flex align-items-center alert-dismissible fade show mt-3" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi flex-shrink-0 me-2 bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            <div>
                                Thanks for responding to the question. Your response has been submitted to {question.userEmail}.
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={refreshAdminResponses}></button>
                        </div>
                    )
                }
            </div>
        </>
    )
}
