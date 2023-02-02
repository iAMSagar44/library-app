import React from 'react';
import { ReturnBook } from './ReturnBook';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Carousel = () => {

    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = `${baseURI}?page=0&size=9`;

        axios.get(fetchURI)
            .then(response => {
                console.log(response.data)
                setBooks(response.data);
            })
            .catch(error => {
                setError(error.message);
            });

    }, []);

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            {
                (!books) &&
                <p>Loading......</p>
            }
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                {
                    (books) && (
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.slice(0, 3).map((book) =>
                                            <ReturnBook key={book.id} book={book} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.slice(3, 6).map((book) =>
                                            <ReturnBook key={book.id} book={book} />
                                        )
                                    }

                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {
                                        books.slice(6, 9).map((book) =>
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
                (books) && (
                    <>
                        <div className='d-lg-none mt-3'>
                            <div className='row d-flex justify-content-center align-items-center'>
                                <ReturnBook key={books[0].id} book={books[0]} />
                            </div>
                        </div>
                        <div className='homepage-carousel-title mt-3'>
                            <a className='btn btn-outline-secondary btn-lg' href='#'>View More</a>
                        </div>
                    </>
                )
            }

        </div>
    );
}