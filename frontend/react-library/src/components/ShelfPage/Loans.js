import React from 'react';
import image from '../../Images/BooksImages/book-luv2code-1000.png';

export const Loans = ({ loanedBooks }) => {

    return (
        <div className='row row-cols-1 row-cols-md-4 g-4'>
            {
                loanedBooks.map(loanedBook => (
                    <div className='col' key={loanedBook.book.id}>
                        <div className="card text-bg-light mb-3">
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
                                    <h6 className="card-text text-danger">This book is overdude by {Math.abs(loanedBook.days)} days.</h6>
                                }
                                {
                                    (!loanedBook.overdue) &&
                                    <h6 className="card-text text-primary">This book is due in {loanedBook.days} days.</h6>
                                }
                                <div className='row row-cols-2 row-cols-md-2'>
                                    <div className='col'>
                                        <button className="btn btn-success">Return Book</button>
                                    </div>
                                    <div className='col'>
                                        <button className="btn btn-primary">Renew Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}