import React from 'react';
import { useState } from 'react';
import image from '../../Images/BooksImages/book-luv2code-1000.png';
import { CustomModal } from '../Utils/CustomModal';

export const Loans = ({ loanedBook }) => {

    const [showModal, setShowModal] = useState(false);

    function handleShowModal() {
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
                        <h6 className="card-text text-danger">This book is overdude by {Math.abs(loanedBook.days)} {Math.abs(loanedBook.days).days > 1 ?
                            "days" : "day"}.</h6>
                    }
                    {
                        (!loanedBook.overdue) &&
                        <h6 className="card-text text-primary">This book is due in {loanedBook.days} {loanedBook.days > 1 ? "days" : "day"}.</h6>
                    }
                    <div className='row row-cols-2 row-cols-md-2'>
                        <div className='col'>
                            <button className="btn btn-success"
                                onClick={handleShowModal}>Return Book</button>
                        </div>
                        <div className='col'>
                            <button className="btn btn-primary">Renew Book</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for Return book */}
            {
                showModal &&
                    <CustomModal title={loanedBook.book.title} show={showModal} onHide={handleHideModal} onSave={handleSaveChanges} />
            }
        </div>
    )
}