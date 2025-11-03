import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resturants, setResturants] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // 🟢 For edit mode

  useEffect(() => {
    fetch("/resturants.json")
      .then((res) => res.json())
      .then((data) => setResturants(data))
      .catch((err) => console.error(err));
  }, []);

  const resturant = resturants.find((r) => String(r.id) === String(id));


  const fetchReviews = async () => {
    if (!resturant) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${resturant.id}`);
      const reviewList = response.data;
      setReviews(reviewList);

      if (reviewList.length > 0) {
        const total = reviewList.reduce((sum, r) => sum + r.rating, 0);
        const avg = (total / reviewList.length).toFixed(1);
        setAvgRating(avg);
      } else {
        setAvgRating(null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(resturant){
        fetchReviews();
    }
  }, [resturant]);

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${reviewId}`);
        alert("Review deleted successfully!");
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Check console for details.");
      }
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    try {
      await axios.put(`http://localhost:5000/reviews/${editingReview.id}`, {
        username: editingReview.username,
        rating: Number(editingReview.rating),
        comment: editingReview.comment,
        resturantid: resturant.id,
      });

      alert("Review updated successfully!");
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review.");
    }
  };

  if (!resturant) {
    return <h2>Restaurant not found!</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <div className="row">
          <div className="col-md-4">
            <img
              src={resturant.image}
              alt={resturant.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h2>{resturant.name}</h2>
            <p className="text-muted">{resturant.location}</p>
            <p>{resturant.description}</p>
            <p>
              <strong>Average Rating:</strong>{" "}
              {avgRating ? `⭐ ${avgRating}/5` : "No reviews yet"}
            </p>
          </div>
        </div>
      </div>

    <Link
  to={
    localStorage.getItem("username")
      ? `/add-review/${resturant.id}`
      : `/login?redirect=/add-review/${resturant.id}`
  }
  className="btn btn-primary mt-3"
>
  Add Review
</Link>


      <div className="card p-3 mt-4 shadow-sm">
        <h4>Reviews</h4>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card p-3 mb-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <strong>{review.username}</strong>
                <span>⭐ {review.rating}/5</span>
              </div>
              <p className="mt-2 mb-1">{review.comment}</p>

              <small className="text-muted">
                {review.createdAt?.toDate
                    ? review.createdAt.toDate().toLocaleDateString()
                    : "Date not available"}
                </small>

              {localStorage.getItem("username") === review.username && (
                <div className="mt-2">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setEditingReview(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              {editingReview && editingReview.id === review.id && (
                <form
                  onSubmit={handleSaveEdit}
                  className="mt-3 border-top pt-3"
                >
                  <div className="mb-2">
                    <label className="form-label">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingReview.username}
                      onChange={(e) =>
                        setEditingReview({
                          ...editingReview,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Rating (1–5):</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="5"
                      value={editingReview.rating}
                      onChange={(e) =>
                        setEditingReview({
                          ...editingReview,
                          rating: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Comment:</label>
                    <textarea
                      className="form-control"
                      value={editingReview.comment}
                      onChange={(e) =>
                        setEditingReview({
                          ...editingReview,
                          comment: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success btn-sm">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Details;
