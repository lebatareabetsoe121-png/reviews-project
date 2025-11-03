import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./Firebase";

const Addreview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const username = localStorage.getItem("username");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !comment || !rating) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem("username", username);

      await addDoc(collection(db, "reviews"), {
        resturantid: id,
        username,
        comment,
        rating: Number(rating),
        createdAt: serverTimestamp(),
      });

      alert("Review added successfully!");
      setComment("");
      setRating("");
      navigate(`/restaurant/${id}`);
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Error adding review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow rounded">
        <h4 className="mb-3">Add a Review</h4>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Rating (1 to 5)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Comment</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addreview;
