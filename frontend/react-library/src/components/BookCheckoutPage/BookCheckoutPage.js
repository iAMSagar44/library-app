import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReviews } from "../Utils/StarReviews";
import image from '../../Images/BooksImages/book-luv2code-1000.png';

export const BookCheckoutPage = () => {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Use Effect hook  is running ...")
        const bookID = (window.location.pathname).split('/')[3];
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = (`${baseURI}/${bookID}`);
        axios.get(fetchURI)
            .then(response => {
                console.log(response.data)
                setBook(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
        window.scroll(0, 0);
    }, []);

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
                                        <StarReviews rating={4.5} size={32}/>
                                    </div>
                                </div>
                            </div>
                            <hr />
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
                                    <StarReviews rating={4.5} size={32}/>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </>
                )
            }

        </div>
    )
}
