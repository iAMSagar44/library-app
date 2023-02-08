import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SearchBook } from "./SearchBook";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "./Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        console.log("Use Effect hook  is running ...")
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = (title.trim() === '' ? `${baseURI}?page=${currentPage}&size=5` : `${baseURI}?page=${currentPage}&size=5&title=${title}`);

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
        window.scroll(0, 0);
    }, [currentPage, title]);

    const handleSubmit = () => {
        setTitle(text);
        setCurrentPage(0);
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-8'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='text'
                                    placeholder='Search' aria-labelledby='Search'
                                    value={text} onChange={(e) => setText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }} />
                                {
                                    (text.trim() !== '') &&
                                    <button className="btn btn-outline-secondary me-2" type="button"
                                        onClick={() => {
                                            setTitle('');
                                            setText('');
                                            setCurrentPage(0);
                                        }}>Clear</button>
                                }
                                <button className='btn btn-outline-success' onClick={handleSubmit}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    Category
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        (isLoading) &&
                        <SpinnerLoading />
                    }
                    {
                        (!isLoading) && (
                            <>
                                <div className='mt-3'>
                                    <h5>Number of results: {books.totalElements}</h5>
                                </div>
                                <p>
                                    {(books.totalElements === 0) ? books.pageable.offset : books.pageable.offset + 1} to {books.numberOfElements + (books.pageable.offset)} of {books.totalElements} items:
                                </p>
                                {
                                    ((books.totalElements === 0)) && (
                                        <div className="m-5">
                                            <h3>Can't find what you are looking for?</h3>
                                            <button type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Library Services</button>
                                        </div>
                                    )
                                }
                                {
                                    (books.totalElements > 0) && (
                                        books.content.map(book => (
                                            <SearchBook key={book.id} book={book} />
                                        ))
                                    )
                                }
                            </>
                        )
                    }
                </div>
                {
                    (!isLoading && (books.totalElements > 0)) && (
                        <Pagination currentPage={currentPage} totalPages={books.totalPages} handlePageChange={onPageChange} />
                    )
                }
            </div>
        </div>
    )
}