import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TopRated() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
     
        const res = await fetch("/resturants.json");
        const data = await res.json();

        const restaurantsWithRating = await Promise.all(
          data.map(async (restaurant) => {
            try {
              const reviewsRes = await axios.get(
                `http://localhost:5000/reviews/${restaurant.id}`
              );
              const reviews = reviewsRes.data;
              let avgRating = null;
              if (reviews.length > 0) {
                const total = reviews.reduce((sum, r) => sum + r.rating, 0);
                avgRating = (total / reviews.length).toFixed(1);
              }
              return { ...restaurant, avgRating };
            } catch (error) {
              console.error("Error fetching reviews:", error);
              return { ...restaurant, avgRating: null };
            }
          })
        );

        restaurantsWithRating.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));

        setRestaurants(restaurantsWithRating);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading top rated restaurants...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🏆 Top Rated Restaurants</h2>
      <div className="row">
        {restaurants.map((r) => (
          <div key={r.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={r.image}
                alt={r.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="card-text">{r.description.substring(0, 80)}...</p>
                <p>
                  <strong>Average Rating:</strong>{" "}
                  {r.avgRating ? `⭐ ${r.avgRating}/5` : "No reviews yet"}
                </p>
                <Link to={`/restaurant/${r.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRated;
