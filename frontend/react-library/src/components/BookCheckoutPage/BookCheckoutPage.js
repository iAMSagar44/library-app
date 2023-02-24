import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReviews } from "../Utils/StarReviews";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { Reviews } from "./Reviews";
import image from '../../Images/BooksImages/book-luv2code-1000.png';
import { useOktaAuth } from '@okta/okta-react';

export const BookCheckoutPage = () => {
    const [book, setBook] = useState(null);
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCheckOutData, setUserCheckOutData] = useState({
        "booksCheckedOut": 0,
        "isBookCheckedOut": false
    });
    const [triggerCheckOut, setTriggerCheckout] = useState(0);
    const [refreshBook, setRefreshBook] = useState(false);
    const [checkoutProcessed, setCheckoutProcessed] = useState(false);

    const averageRating = calculateAverageRating(review);

    const { authState } = useOktaAuth();

    const checkOutBook = (bookId) => {
        //console.log("The book to be checked out is --->", bookId);
        setTriggerCheckout(bookId);
    }

    useEffect(() => {
        console.log("Use Effect hook  is running ...");
        console.log("Refresh status ...", refreshBook);
        const bookID = (window.location.pathname).split('/')[3];
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = (`${baseURI}/${bookID}`);
        const reviewURI = (`${baseURI}/reviews/${bookID}`);
        axios.get(fetchURI)
            .then(response => {
                console.log("Response from the 1st service call", response.data)
                setBook(response.data);
                setIsLoading(false);
                return axios.get(reviewURI);
            })
            .then(
                response => {
                    console.log("Response from the 2nd service call", response.data);
                    //console.log("Ratings for this book", response.data.map(review => review.rating));
                    setReview(response.data);
                }
            )
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
        window.scroll(0, 0);
    }, [refreshBook]);

    useEffect(() => {
        console.log("-----> Use effect with login data running .......")
        console.log("Refresh status ...", refreshBook);
        if (authState?.isAuthenticated) {
            console.log("User is authenticated");
            const bookID = (window.location.pathname).split('/')[3];
            // Set the request headers with the OAuth bearer token
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };

            // Make a request to the secured endpoint using Axios
            axios.get(`http://localhost:8080/user/api/books/${bookID}`, config)
                .then(response => {
                    console.log(response.data);
                    setUserCheckOutData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [authState, refreshBook])

    useEffect(() => {
        console.log("-----> Use effect to checkout book is running .......", triggerCheckOut)
        if (authState?.isAuthenticated && triggerCheckOut > 0) {
            const bookID = triggerCheckOut
            console.log("The book to be checked out is --->", bookID);
            // Set the request headers with the OAuth bearer token
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };

            // Make a request to the secured endpoint using Axios
            axios.post(`http://localhost:8080/user/api/books/${bookID}/checkout`, {}, config)
                .then(response => {
                    console.log("Book checked out successfully", response.data);
                    setTriggerCheckout(0);
                    setTimeout(() => setRefreshBook(true), 3000);
                    setTimeout(() => setCheckoutProcessed(true), 3000);
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }, [triggerCheckOut])

    function calculateAverageRating(reviews) {
        const sum = reviews.map(review => review.rating).reduce((a, b) => (a + b), 0);
        const avg = (Math.round((sum / reviews.length) * 10) / 10).toFixed(1);
        //console.log("The average ratings are:", avg);
        return avg;
    }

    return (
        <div>
            {
                (isLoading) &&
                <SpinnerLoading />
            }

            {
                (!isLoading) && (
                    <>
                        <div className='container d-none d-lg-block'>
                            <div className='row mt-5'>
                                <div className='col-sm-2 col-md-2'>
                                    {book.img ?
                                        <img src={book.img} width='226' height='349' alt='Book' />
                                        :
                                        <img src={image} width='226'
                                            height='349' alt='Book' />
                                    }
                                </div>
                                <div className='col-4 col-md-4 container'>
                                    <div className='ml-2'>
                                        <h2>{book.title}</h2>
                                        <h5 className='text-primary'>{book.author}</h5>
                                        <p className='lead'>{book.description}</p>
                                        {
                                            (review && averageRating > 0) ? (
                                                <StarReviews rating={averageRating} size={32} />
                                            ) : (
                                                <>
                                                    <StarReviews rating={0} size={32} />
                                                    <h6 className='text-secondary'>No reviews for this book yet.</h6>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <CheckoutAndReviewBox mobile={false} book={book} checkOutData={userCheckOutData} checkOutBook={checkOutBook} checkoutProcessed={checkoutProcessed} />
                            </div>
                            <hr />
                            <Reviews mobile={false} reviews={review} />
                        </div>
                        <div className='container d-lg-none mt-5'>
                            <div className='d-flex justify-content-center align-items-center'>
                                {book.img ?
                                    <img src={book.img} width='226' height='349' alt='Book' />
                                    :
                                    <img src={image} width='226'
                                        height='349' alt='Book' />
                                }
                            </div>
                            <div className='mt-4'>
                                <div className='ml-2'>
                                    <h2>{book.title}</h2>
                                    <h5 className='text-primary'>{book.author}</h5>
                                    <p className='lead'>{book.description}</p>
                                    {
                                        (review && averageRating > 0) ? (
                                            <StarReviews rating={averageRating} size={32} />
                                        ) : (
                                            <>
                                                <StarReviews rating={0} size={32} />
                                                <h6 className='text-secondary'>No reviews for this book yet.</h6>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <CheckoutAndReviewBox mobile={true} book={book} checkOutData={userCheckOutData} checkOutBook={checkOutBook} checkoutProcessed={checkoutProcessed} />
                            <hr />
                            <Reviews mobile={true} reviews={review} />
                        </div>
                    </>
                )
            }

        </div>
    )
}
