import React from "react";

export const Question = ({ question }) => {
    return (
        <>

            <div className='card mt-2 shadow p-3 bg-body rounded'>
                <h5>Case #{question.id}: {question.title}</h5>
                <h6>{question.userEmail}</h6>
                <p>{question.question}</p>
                <hr />
                <div>
                    <h5>Response: </h5>
                    {question.response && question.adminEmail ?
                        <>
                            <h6>{question.adminEmail} (admin)</h6>
                            <p>{question.response}</p>
                        </>
                        :
                        <p><i>Pending response from administration. Please be patient.</i></p>
                    }
                </div>
            </div>
        </>
    )
}
