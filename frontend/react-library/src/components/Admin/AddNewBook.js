import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { useFormik } from 'formik';
import { useState } from "react";
import * as Yup from 'yup';
import axios from "axios";

export const AddNewBook = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionProcessed, setSubmissionProcessed] = useState(false);
    const { authState } = useOktaAuth();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            category: 'Select',
            description: '',
            copies: '',
            file: null
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(45, 'Must be 45 characters or less')
                .required('Required field'),
            author: Yup.string()
                .max(45, 'Must be 45 characters or less')
                .required('Required field'),
            category: Yup.string().required('Required field'),
            description: Yup.string()
                .max(350, 'Must be 350 characters or less')
                .required('Required field'),
            copies: Yup.number().min(1).max(20)
                .required('Required field'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            const { title, author, category, description, copies, file } = values;
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                const img = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(reader.error);
                });
                const data = { title, author, category, description, copies, img, copiesAvailable: copies };
                console.log("The values are::", data);
                const response = await axios.post(`http://localhost:8080/admin/api/books`, data, config);
                console.log("Response submitted successfully", response.data);
                setSubmissionProcessed(true);
                setIsSubmitting(false);
                resetForm();
                document.getElementById("file").value = null;
            } catch (error) {
                console.log(error);
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Add a new book</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label' htmlFor="title">Title</label>
                                <input type="text" className='form-control' id='title' {...formik.getFieldProps('title')} />
                                {formik.touched.title && formik.errors.title ? (
                                    <p className='fs-6 fst-italic text-danger'>{formik.errors.title}</p>
                                ) : null}
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label' htmlFor="author">Author</label>
                                <input type="text" className='form-control' id='author' {...formik.getFieldProps('author')} />
                                {formik.touched.author && formik.errors.author ? (
                                    <p className='fs-6 fst-italic text-danger'>{formik.errors.author}</p>
                                ) : null}
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label' htmlFor="category">Category</label>
                                <select className="form-select form-select-md mb-3" aria-label=".form-select-lg example" id="category"
                                    {...formik.getFieldProps('category')}>
                                    <option value="Select">Select a Category</option>
                                    <option value="All">All</option>
                                    <option value="FE">Front End</option>
                                    <option value="BE">Back End</option>
                                    <option value="Data">Data</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                                {formik.touched.category && formik.errors.category ? (
                                    <p className='fs-6 fst-italic text-danger'>{formik.errors.category}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label' htmlFor="description">Description</label>
                            <textarea className='form-control' id='description' rows={5} {...formik.getFieldProps('description')}></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <p className='fs-6 fst-italic text-danger'>{formik.errors.description}</p>
                            ) : null}
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label' htmlFor="copies">Copies</label>
                            <input type='number' className='form-control' id='copies' {...formik.getFieldProps('copies')} />
                            {formik.touched.copies && formik.errors.copies ? (
                                <p className='fs-6 fst-italic text-danger'>{formik.errors.copies}</p>
                            ) : null}
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label' htmlFor="file">Upload a book cover image</label>
                            <input type='file' id="file" onChange={(event) => {
                                formik.setFieldValue("file", event.currentTarget.files[0]);
                            }} />
                            {formik.touched.file && formik.errors.file ? (
                                <p className='fs-6 fst-italic text-danger'>{formik.errors.file}</p>
                            ) : null}
                        </div>

                        <div>
                            <button type='submit' className='btn btn-primary mt-3' disabled={isSubmitting}>
                                Add Book
                            </button>
                        </div>
                    </form>
                    {
                        (submissionProcessed) && (
                            <div className="alert alert-success d-flex align-items-center alert-dismissible fade show mt-3" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi flex-shrink-0 me-2 bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                                <div>
                                    Upload successful.
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSubmissionProcessed(false)}></button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}