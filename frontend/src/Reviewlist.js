import React, { useEffect, useState } from "react";
import {collection,query,where,getDocs,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import { db } from "./Firebase";

const Reviewlist = ({ resturantid, onReviewsUpdated }) => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUsername = localStorage.getItem("username");
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "reviews"),
        where("resturantid", "==", resturantid)
      );
      const querySnapshot = await getDocs(q);
      const reviewList = [];
      querySnapshot.forEach((docSnap) => {
        reviewList.push({ id: docSnap.id, ...docSnap.data() });
      });

      reviewList.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setReviews(reviewList);

      if (onReviewsUpdated) onReviewsUpdated(reviewList); 
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [resturantid]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews(reviews.filter((r) => r.id !== id));
      if (onReviewsUpdated) onReviewsUpdated(reviews.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditStart = (review) => {
    setEditingReviewId(review.id);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  const handleEditSave = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        comment: editedComment,
        rating: Number(editedRating),
      });
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews yet. Be the first to add one!</p>;

  return (
    <div className="mt-4">
      {reviews.map((review) => (
        <div key={review.id} className="card p-3 mb-3 shadow-sm">
    
          <div className="d-flex justify-content-between align-items-center">
            <strong>{review.username}</strong>
            <span>⭐ {review.rating}/5</span>
          </div>

          {editingReviewId === review.id ? (
            <div className="mt-2">
              <textarea
                className="form-control mb-2"
                rows="2"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-2"
                value={editedRating}
                min="1"
                max="5"
                onChange={(e) => setEditedRating(e.target.value)}
              />
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleEditSave(review.id)}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditingReviewId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="mt-2 mb-1">{review.comment}</p>
          )}

          <small className="text-muted">
            {review.createdAt
              ? new Date(review.createdAt.seconds * 1000).toLocaleString()
              : ""}
          </small>

          {currentUsername === review.username && editingReviewId !== review.id && (
            <div className="mt-2">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => handleEditStart(review)}
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
        </div>
      ))}
    </div>
  );
};

export default Reviewlist;
