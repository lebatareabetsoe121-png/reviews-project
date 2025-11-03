import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigations from "./Navigations";
import Home from "./Home";
import Details from "./Details";
import Addreview from "./Addreview";
import MyReviews from "./MyReviews";
import TopRated from './TopRated';
import Login from './Login';

function App() {
  return (
    <Router>
      <Navigations />
      <div className="container mt-4">
        <Routes>
          <Route path='/top' element={<TopRated/>}/>
           <Route path="/login" element={<Login />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Details />} />
          <Route path="/add-review/:id" element={<Addreview />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


