import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantList from './RestaurantList';

function Home() {
    return (
        <div className='home'>
            <div className="logo fade-in">
                <img src="/images/capstonelogo.jpeg" alt="Logo" width="80%" border="4% solid"/>
            </div>
            <div className="homeReviews">
                <h2>Reviewed Restaurants Local To You</h2>
                <RestaurantList showSearchBar={false} limit={4} />
                <div className='moreReviewsButton'>
                    <Link to="./restaurants">
                        <button>See More Restaurants/Reviews</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;