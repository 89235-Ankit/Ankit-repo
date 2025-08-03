import React, { useState,useEffect } from "react";
import "../Style/ShortlistedVehicles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const ShortlistedVehicles = () => {
  
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log("Token:", token); 

  
  useEffect(() => {

    axios
      .get("http://localhost:8080/api/favorites/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched cars:", res.data); 
        setCars(res.data);
      })
      .catch((err) => console.error("Error fetching your cars:", err));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, phone, email } = response.data;
        setUserData({ name, phone, email });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserData();
  }, []);



  const removeFromWishlist = (carId) => {
    
    axios.delete(`http://localhost:8080/api/favorites/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=>{
      toast.success("removed from wishlist")

      setCars((prevCars) => prevCars.filter((car) => car.carId !== carId));

    })
    .catch((err)=>{console.error(err)})
  };
  return (
    <div className="shortlist-container">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="avatar">S</div>
          <div className="user-info">
            <p className="name">{userData.name}</p>
            <p className="phone">{userData.phone}</p>
            <a href="#">{userData.email}</a>
          </div>
        </div>
        <nav className="nav-menu">
          <button>My Orders</button>
          <button className="active">Shortlisted Vehicles</button>
          <button>My Activity</button>
          <button>My Vehicles</button>
          <button>My Garage</button>
          <button>Manage Consents</button>
          <button>Profile Settings</button>
        </nav>
        <button className="logout-btn">Logout</button>
      </aside>

      <main className="main-content">
        <h2>Shortlisted</h2>
        <p>
          {cars.length} item
          {cars.length !== 1 ? "s" : ""} are shortlisted, you can explore
          them
        </p>
        <div className="vehicle-list">
          {cars.length === 0 ? (
            <div className="empty-message">No vehicles shortlisted.</div>
          ) : (
            cars.map((car, index) => (
              <div className="vehicle-card improved" key={index}>
                <div className="vehicle-tag">{car.location}</div>
                <h3>{car.brand}</h3>
                <p>{car.model}</p>
                <p className="price">₹{car.price?.toLocaleString()}</p>
                <div className="card-actions">
                <button className="check-now" style={{fontSize:"12px"}} onClick={() => navigate(`/home/cars/${car.carId}`)}>Check Now ➤</button>
                <button className="btn btn-danger" style={{fontSize:"12px"}} onClick={() => removeFromWishlist(car.carId)}>
              Remove car <i class="bi bi-x-lg"></i>

            </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ShortlistedVehicles;
