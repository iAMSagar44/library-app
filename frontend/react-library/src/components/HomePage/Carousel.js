import React from 'react';
import { ReturnBook } from './ReturnBook';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Carousel = () => {

    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = `${baseURI}?page=0&size=9`;

        axios.get(fetchURI)
            .then(response => {
                console.log(response.data)
                setBooks(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });

    }, []);

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            {
                (isLoading) &&
                <SpinnerLoading />
            }
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                {
                    (!isLoading) && (
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.content.slice(0, 3).map((book) =>
                                            <ReturnBook key={book.id} book={book} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.content.slice(3, 6).map((book) =>
                                            <ReturnBook key={book.id} book={book} />
                                        )
                                    }

                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.content.slice(6, 9).map((book) =>
                                            <ReturnBook key={book.id} book={book} />
                                        )
                                    }

                                </div>
                            </div>
                            <button className='carousel-control-prev' type='button'
                                data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                                <span className='visually-hidden'>Previous</span>
                            </button>
                            <button className='carousel-control-next' type='button'
                                data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                                <span className='visually-hidden'>Next</span>
                            </button>
                        </div>

                    )
                }

            </div>

            {/* Mobile */}
            {
                (!isLoading) && (
                    <>
                        <div className='d-lg-none mt-3'>
                            <div className='row d-flex justify-content-center align-items-center'>
                                <ReturnBook key={books.content[7].id} book={books.content[7]} />
                            </div>
                        </div>
                        <div className='homepage-carousel-title mt-3'>
                            <Link className='btn btn-outline-secondary btn-lg' to='/searchbooks'>View More</Link>
                        </div>
                    </>
                )
            }

        </div>
    );
}