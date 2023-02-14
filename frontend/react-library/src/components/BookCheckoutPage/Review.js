import React from "react";
import { StarReviews } from "../Utils/StarReviews";

export const Review = ({ review }) => {

    const date = new Date(review.date);

    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

    return (
        <div>
            <div className='col-sm-8 col-md-8'>
                <h5>{review.userEmail}</h5>
                <div className='row'>
                    <div className='col'>
                        {dateRender}
                    </div>
                    <div className='col'>
                        <StarReviews rating={review.rating} size={16} />
                    </div>
                </div>
                <div className='mt-2'>
                    <p>
                        {review.review_description}
                    </p>
                </div>
            </div>
            <hr />
        </div>
    )
}