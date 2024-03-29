import React from "react";
import image from '../../Images/BooksImages/book-luv2code-1000.png';

export const History = ({ book }) => {

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
                        <hr />
                        <p className='card-text'> Checked out on: {book.checkoutDate}</p>
                        <p className='card-text'> Returned on: {book.returnedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}