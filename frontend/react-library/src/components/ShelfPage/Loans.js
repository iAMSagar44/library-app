import React from 'react';
import { useState, useRef } from 'react';
import image from '../../Images/BooksImages/book-luv2code-1000.png';
import { CustomModal } from '../Utils/CustomModal';
import { useOktaAuth } from '@okta/okta-react';
import axios from "axios";

export const Loans = ({ loanedBook, refreshShelf }) => {

    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { authState } = useOktaAuth();
    let ref = useRef(null);

    function handleShowModal(action) {
        (action === "return" ? ref.current = "return" : ref.current = "renew")
        setShowModal(true);
    }

    function handleHideModal() {
        setShowModal(false);
    }

    function refreshBookShelf() {
        refreshShelf();
        setShowSuccessMessage(false);
    }

    function handleDueText() {
        const { days, months, years } = loanedBook;
        let text = '';
        if (years > 0) {
            text += `${years} year${years === 1 ? '' : 's'} `;
        }
        if (months > 0) {
            text += `${months} month${months === 1 ? '' : 's'} `;
        }
        if (days > 0) {
            text += `${days} day${days === 1 ? '' : 's'}`;
        }
        return `The book is due in ${text}`;

    }

    function handleOverdueText() {
        const { days, months, years } = loanedBook;
        let text = '';
        if (years < 0) {
            text += `${Math.abs(years)} year${years === -1 ? '' : 's'} `;
        }
        if (months < 0) {
            text += `${Math.abs(months)} month${months === -1 ? '' : 's'} `;
        }
        if (days < 0) {
            text += `${Math.abs(days)} day${days === -1 ? '' : 's'}`;
        }
        return `The book is overdue by ${text}`;

    }


    function handleSaveChanges(action) {
        // handle save changes logic here
        console.log("Back end logic to return or renew book", loanedBook.book.id, action);
        if (authState?.isAuthenticated) {
            console.log("User is authenticated");
            // Set the request headers with the OAuth bearer token
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };

            if (action === "return") {

                axios.delete(`http://localhost:8080/user/api/books/${loanedBook.book.id}/checkout`, config)
                    .then(response => {
                        console.log("Book returned successfully", response);
                        setShowSuccessMessage(true);
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

            if (action === "renew") {
                console.log("Server logic to renew book goes here ...");
                axios.put(`http://localhost:8080/user/api/books/${loanedBook.book.id}/checkout`, {}, config)
                .then(response => {
                    console.log("Book renewed successfully", response);
                    setShowSuccessMessage(true);
                })
                .catch(error => {
                    console.log(error);
                });


            }
        }
        setShowModal(false);
    }

    return (
        <div className='col'>
            <div className="card text-bg-light mb-3" style={{ height: "600px" }} >
                {loanedBook.book.img ?
                    <img src={loanedBook.book.img}
                        className="card-img-top" alt='Book' style={{ height: "400px" }}
                    />
                    :
                    <img src={image}
                        className="card-img-top" alt='Book' style={{ height: "400px" }}
                    />
                }
                <div className="card-body">
                    <h5 className="card-title">{loanedBook.book.title}</h5>
                    {
                        (!showSuccessMessage) && (
                            <div>
                                {
                                    (loanedBook.overdue && loanedBook.months === 0 && loanedBook.years === 0) &&
                                    <h6 className="card-text text-danger">This book is overdue by {Math.abs(loanedBook.days)} {Math.abs(loanedBook.days) > 1 ?
                                        "days" : "day"}.</h6>
                                }

                                {
                                    (loanedBook.overdue && (loanedBook.months < 0 || loanedBook.years < 0)) &&
                                    <h6 className="card-text text-danger">{handleOverdueText()}</h6>

                                }
                                {
                                    (!loanedBook.overdue && loanedBook.months === 0 && loanedBook.years === 0) &&
                                    <h6 className="card-text text-primary">This book is due {loanedBook.days > 0 ? `in ${loanedBook.days}` : ''} {loanedBook.days > 1 ? "days" :
                                        ((loanedBook.days === 0) ? "today" : "day")}.</h6>
                                }
                                {
                                    (!loanedBook.overdue && (loanedBook.months > 0 || loanedBook.years > 0)) &&
                                    <h6 className="card-text text-primary">{handleDueText()}</h6>

                                }
                                <div className='row row-cols-2 row-cols-md-2'>
                                    <div className='col'>
                                        <button className="btn btn-success"
                                            onClick={() => handleShowModal("return")}>Return Book</button>
                                    </div>
                                    {
                                        (loanedBook.overdue) && (
                                            <div className='col'>
                                                <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title="Renew option not available if book is overdue">
                                                    <button className="btn btn-primary" disabled>Renew Book</button>
                                                </span>
                                            </div>
                                        )
                                    }
                                    {
                                        (!loanedBook.overdue) && (
                                            <div className='col'>
                                                <button className="btn btn-primary" onClick={() => handleShowModal("renew")}>Renew Book</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        (showSuccessMessage) && (
                            <div className="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi flex-shrink-0 me-2 bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                                <div>
                                    Thanks for {`${ref.current}ing`} the book.
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                    onClick={refreshBookShelf}></button>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* Modal for Return book */}
            {
                showModal &&
                <CustomModal title={loanedBook.book.title} show={showModal} action={ref.current} onHide={handleHideModal} onSave={handleSaveChanges} />
            }
        </div>
    )
}