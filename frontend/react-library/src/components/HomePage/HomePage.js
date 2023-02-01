import React from "react";
import { ExploreTopBooks } from './ExploreTopBooks';
import { Carousel } from './Carousel';
import { Hero } from './Hero';
import { LibraryServices } from './LibraryServices';

export const HomePage = () => {

    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Hero />
            <LibraryServices />
        </>
    );
}