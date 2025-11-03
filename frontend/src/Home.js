import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    axios
      .get("/resturants.json")
      .then((res) => setResturants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🍴 Restaurant Review Platform</h1>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {resturants.map((r) => (
            <tr key={r.id}>
              <td>
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: "129px", height: "97px", objectFit: "cover", borderRadius: "5px" }}
                />
              </td>
              <td>{r.name}</td>
              <td>{r.location}</td>
              <td>{r.description.substring(0, 50)}...</td>
              <td>
               <Link to={`/restaurant/${r.id}`} className="btn btn-primary btn-sm">
  View Details
</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
