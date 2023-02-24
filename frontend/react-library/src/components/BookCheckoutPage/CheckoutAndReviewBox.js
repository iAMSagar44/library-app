import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const CheckoutAndReviewBox = ({ mobile, book, checkOutData, checkOutBook, checkoutProcessed }) => {

    const { authState } = useOktaAuth();
    const { booksCheckedOut, isBookCheckedOut } = checkOutData;
    const [isLoading, setIsLoading] = useState(false);

    const processCheckout = (id) => {
        setIsLoading(true);
        checkOutBook(id);
    }

    return (
        <div className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{booksCheckedOut}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {book && book.copiesAvailable && book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{book.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{book.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {
                    (!authState?.isAuthenticated) && (
                        <Link className='btn btn-success btn-lg' to="/login">Sign in</Link>
                    )
                }
                {
                    (authState?.isAuthenticated && !isBookCheckedOut && !isLoading) && (
                        <button className='btn btn-success btn-lg' onClick={() => processCheckout(book.id)}>Checkout</button>
                    )
                }
                {
                    (authState?.isAuthenticated && isLoading && !checkoutProcessed) && (
                        <SpinnerLoading />
                    )
                }
                {
                    (authState?.isAuthenticated && checkoutProcessed) && (
                        <p className='mt-3'>
                            <b>Successfully checked out.</b>
                        </p>
                    )
                }
                <hr />

                {
                    (authState?.isAuthenticated && isBookCheckedOut && !checkoutProcessed) && (
                        <p className='mt-3'>
                            <b>This book has already been checked out by you.</b>
                        </p>
                    )
                }
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {
                    (!authState?.isAuthenticated) && (
                        <p>
                            Sign in to be able to leave a review.
                        </p>
                    )
                }
            </div>
        </div>
    )
}