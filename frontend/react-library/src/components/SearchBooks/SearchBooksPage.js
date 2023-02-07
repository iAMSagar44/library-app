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

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        console.log("Use Effect hook  is running ...")
        const baseURI = "http://localhost:8080/api/books";
        const fetchURI = `${baseURI}?page=${currentPage}&size=5`;

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
            window.scroll(0,0);
    }, [currentPage]);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search' />
                                <button className='btn btn-outline-success'>
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
                                    {books.pageable.offset + 1} to {books.numberOfElements + (books.pageable.offset)} of {books.totalElements} items:
                                </p>
                                {
                                    books.content.map(book => (
                                        <SearchBook key={book.id} book={book} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
                {
                    (!isLoading) && (
                        <Pagination currentPage={currentPage} totalPages={books.totalPages} handlePageChange={onPageChange} />
                    )
                }
            </div>
        </div>
    )
}