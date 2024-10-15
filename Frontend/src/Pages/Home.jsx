import React from "react";
import Navbar from "../Pages/Navbar";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="p-3 mb-2 bg-primary h-full w-full"> 
        <Navbar />
      
      <header>
        <section>
          <div style={{color:"black"}} >
            <div className="p-6"  style={{backgroundColor:"yellow"}}>
              <h3>
                <span>HR Managment App</span>
              </h3>
              <p>HR can able to manage employees using this App </p>
              <Link to="/signup"></Link>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Home;
