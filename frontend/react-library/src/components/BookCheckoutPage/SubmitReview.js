import * as React from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import { useOktaAuth } from '@okta/okta-react';

export default function SubmitReview({ bookID, refreshReviewSection }) {

    const { authState } = useOktaAuth();

    const initialValues = {
        rating: 0,
        review: ""
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log(values, bookID);
        const baseURI = "http://localhost:8080/user/api/books/reviews";
        const fetchURI = (`${baseURI}/${bookID}`);

        if (authState?.isAuthenticated) {
            // Set the request headers with the OAuth bearer token
            const config = {
                headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
            };

            // Make a request to the secured endpoint using Axios
            axios.post(fetchURI, values, config)
                .then(response => {
                    console.log("Review submitted successfully");
                    setTimeout(() => setSubmitting(false), 2000);
                    setTimeout(() => resetForm(), 1000);
                    refreshReviewSection();
                })
                .catch(error => {
                    console.log(error);
                    setTimeout(() => setSubmitting(false), 2000);
                    setTimeout(() => resetForm(), 1000);
                });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, errors, values, handleChange }) => (
                <Form>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Field name="rating">
                            {({ field }) => (
                                <Stack spacing={1}>
                                    <Rating
                                        name="half-rating"
                                        value={field.value}
                                        precision={0.5}
                                        size="large"
                                        onChange={(event, newValue) => {
                                            field.onChange({ target: { name: 'rating', value: newValue } });
                                        }}
                                    />
                                </Stack>
                            )}
                        </Field>
                    </Box>
                    <div>
                        <Field name="review">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Comment"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            )}
                        </Field>
                    </div>
                    <Box mt={2}>
                        <button type='submit' className='btn btn-success btn-sm' disabled={isSubmitting}>Submit Review</button>
                    </Box>
                </Form>
            )}
        </Formik>

    );
}