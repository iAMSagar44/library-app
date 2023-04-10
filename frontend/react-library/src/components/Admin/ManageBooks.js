import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../SearchBooks/Pagination";
import { ManageBook } from "./ManageBook";

export const ManageBooks = () => {

    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Category');
    const [refreshPage, setRefreshPage] = useState(0);

    const onPageChange = (pageNumber) => {
        console.log("The page being requested is ....", pageNumber);
        setCurrentPage(pageNumber);
    }

    const refreshBooks = () => {
        setRefreshPage(refreshPage+1);
    }

    useEffect(() => {
        console.log("Use Effect hook  is running ...")
        const baseURI = "http://localhost:8080/api/books";
        let fetchURI = (title.trim() === '' ? `${baseURI}?page=${currentPage}&size=5` : `${baseURI}?page=${currentPage}&size=5&title=${title}`);
        if (category !== 'All' && category !== 'Category') {
            console.log("Category is::", category);
            fetchURI = `${baseURI}?page=${currentPage}&size=5&category=${category}`;
        }

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
    }, [currentPage, title, category, refreshPage]);

    const handleSubmit = () => {
        setTitle(text);
        setCurrentPage(0);
    }

    const handleCategoryChange = (data) => {
        setCategory(data);
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
                                    {category}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li className='dropdown-item' onClick={() => handleCategoryChange('All')}>All</li>
                                    <li className='dropdown-item' onClick={() => handleCategoryChange('FE')}>Front End</li>
                                    <li className='dropdown-item' onClick={() => handleCategoryChange('BE')}>Back End</li>
                                    <li className='dropdown-item' onClick={() => handleCategoryChange('Data')}>Data</li>
                                    <li className='dropdown-item' onClick={() => handleCategoryChange('DevOps')}>DevOps</li>
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
                                            <ManageBook key={book.id} book={book} currentPage={currentPage} handlePageChange={onPageChange}
                                                                      refreshBooks={refreshBooks} />
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