import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const AddNewBook = () => {


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
                .max(60, 'Must be 60 characters or less')
                .required('Required field'),
            author: Yup.string()
                .max(40, 'Must be 40 characters or less')
                .required('Required field'),
            category: Yup.string().required('Required field'),
            description: Yup.string()
                .max(150, 'Must be 150 characters or less')
                .required('Required field'),
            copies: Yup.number().min(1).max(20)
                .required('Required field'),
        }),
        onSubmit: (values, { resetForm }) => {
            const{title, author, category, description, copies} = values;
            const data = { title, author, category, description, copies };
            const { file } = values;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                data.img = reader.result;
            }
            data.copiesAvailable = values.copies;
            console.log("The values are::", data);
            setTimeout(() => resetForm(), 500);
            document.getElementById("file").value = null;
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
                        <input type='file' id="file" onChange={(event) => {
                            formik.setFieldValue("file", event.currentTarget.files[0]);
                        }} />
                        <div>
                            <button type='submit' className='btn btn-primary mt-3'>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}