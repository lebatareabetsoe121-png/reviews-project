import React, { useEffect, useState } from "react";
import axios from "axios";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/user/${username}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (username) fetchMyReviews();
  }, [username]);

  if (!username) return <p>Please log in to see your reviews.</p>;
  if (reviews.length === 0) return <p>You haven't made any reviews yet.</p>;

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewId}`);
      alert("Review deleted!");
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    try {
      await axios.put(`http://localhost:5000/reviews/${editingReview.id}`, {
        rating: Number(editingReview.rating),
        comment: editingReview.comment,
      });

      alert("Review updated!");
      setEditingReview(null);

      setReviews(reviews.map(r => r.id === editingReview.id ? editingReview : r));
    } catch (err) {
      console.error(err);
      alert("Failed to update review");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="card p-3 mb-3 shadow-sm">
          <p><strong>Restaurant ID:</strong> {review.resturantid}</p>
          <p><strong>Rating:</strong> ⭐ {review.rating}/5</p>
          <p>{review.comment}</p>

          {username === review.username && (
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
            <form onSubmit={handleSaveEdit} className="mt-3 border-top pt-3">
              <div className="mb-2">
                <label className="form-label">Rating (1–5):</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="5"
                  value={editingReview.rating}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, rating: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Comment:</label>
                <textarea
                  className="form-control"
                  value={editingReview.comment}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, comment: e.target.value })
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
      ))}
    </div>
  );
}

export default MyReviews;
