import React from 'react';
import { useState, useRef } from 'react';
import image from '../../Images/BooksImages/book-luv2code-1000.png';
import { CustomModal } from '../Utils/CustomModal';

export const Loans = ({ loanedBook }) => {

    const [showModal, setShowModal] = useState(false);
    let ref = useRef(null);

    function handleShowModal(action) {
        (action === "return" ? ref.current="return" : ref.current="renew")
        setShowModal(true);
    }

    function handleHideModal() {
        setShowModal(false);
    }

    function handleSaveChanges() {
        // handle save changes logic here
        console.log("Back end logic to return or renew book")
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
                        (loanedBook.overdue) &&
                        <h6 className="card-text text-danger">This book is overdude by {Math.abs(loanedBook.days)} {Math.abs(loanedBook.days) > 1 ?
                            "days" : "day"}.</h6>
                    }
                    {
                        (!loanedBook.overdue) &&
                        <h6 className="card-text text-primary">This book is due in {loanedBook.days} {loanedBook.days > 1 ? "days" : "day"}.</h6>
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
            </div>
            {/* Modal for Return book */}
            {
                showModal &&
                <CustomModal title={loanedBook.book.title} show={showModal} action={ref.current} onHide={handleHideModal} onSave={handleSaveChanges} />
            }
        </div>
    )
}