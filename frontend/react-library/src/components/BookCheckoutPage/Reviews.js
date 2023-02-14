import React from "react";
import { useState } from "react";
import { Review } from "./Review";

export const Reviews = ({ reviews, mobile }) => {

    const [showAllReviews, setShowAllReviews] = useState(false);


    return (
        <div className={mobile ? 'mt-3' : 'row mt-5'}>
            <div className={mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {reviews.length > 0 ?
                    <>
                        {
                            (showAllReviews) && (
                                <>
                                    {reviews.slice(0, 20).map(eachReview => (
                                        <Review review={eachReview} key={eachReview.id}></Review>
                                    ))}
                                    <div className='m-3'>
                                        <button type='button' className='btn main-color btn-md text-white' onClick={() => setShowAllReviews(false)}>
                                            Hide all reviews
                                        </button>
                                    </div>
                                </>
                            )
                        }
                        {
                            (!showAllReviews) && (
                                <>
                                    {reviews.slice(0, 1).map(eachReview => (
                                        <Review review={eachReview} key={eachReview.id}></Review>
                                    ))}
                                    <div className='m-3'>
                                        <button type='button' className='btn main-color btn-md text-white' onClick={() => setShowAllReviews(true)}>
                                            Show all reviews
                                        </button>
                                    </div>
                                </>

                            )
                        }
                    </>
                    :
                    <div className='m-3'>
                        <p className='lead'>
                            Currently there are no reviews for this book
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}