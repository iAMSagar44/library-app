import React from "react";
import { useState } from "react";
import axios from "axios";
import { useOktaAuth } from '@okta/okta-react';
import image from '../../Images/BooksImages/book-luv2code-1000.png';

export const ManageBook = ({ book }) => {
    const [quantity, setQuantity] = useState(0);
    const [submissionProcessed, setSubmissionProcessed] = useState(false);
    const { authState } = useOktaAuth();

    function addCopies(bookID) {
        const data = { quantity: quantity, subtract: false };
        console.log(data, "----", bookID);
        updateCopies(bookID, data);
    }

    function subtractCopies(bookID) {
        const data = { quantity: quantity, subtract: true };
        console.log(data, "----", bookID);
        updateCopies(bookID, data);
    }

    function updateCopies(bookID, data) {
        if (authState?.isAuthenticated) {
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };
            axios.put(`http://localhost:8080/admin/api/books/${bookID}/quantity`, data, config)
                .then(response => {
                    console.log("Response submitted successfully", response.data);
                    setSubmissionProcessed(true);
                    setQuantity(0);
                })
                .catch(error => {
                    console.log(error);
                    setQuantity(0);
                });
        }
    }

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {book.img ?
                            <img src={book.img}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={image}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {book.img ?
                            <img src={book.img}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={image}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {book.author}
                        </h5>
                        <h4>
                            {book.title}
                        </h4>
                        <p className='card-text'>
                            {book.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex flex-column align-items-center'>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <div className="input-group mb-2">
                            <span className="input-group-text">Copies</span>
                            <input type="number" id='copies' className="form-control" aria-label="Quantity" aria-describedby="increase-quantity"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" type="button" onClick={() => addCopies(book.id)}>Add</button>
                            <button className="btn btn-primary" type="button" onClick={() => subtractCopies(book.id)}>Subtract</button>
                        </div>
                        <button className='btn btn-danger m-4'>Delete</button>
                    </div>
                </div>
            </div>
            {
                (submissionProcessed) && (
                    <div className="alert alert-success d-flex align-items-center alert-dismissible fade show mt-3" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi flex-shrink-0 me-2 bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div>
                            Update successful.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSubmissionProcessed(false)}></button>
                    </div>
                )
            }
        </div>
    )

}