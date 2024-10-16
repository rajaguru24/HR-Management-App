import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';


const Navbar = () => {
  return (
    <div>
<nav className="navbar navbar-expand-lg "style={{backgroundColor:"light green"}}>
  <div className="container-fluid">
    <a classname='nav-brand' href='/'><strong style={{color:'black'}}>Auth</strong></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse"  id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Home</a>
        </li>

        <li className="nav-item">
          <Link to='/signup' className='nav-link' style={{color:"black"}} >SignUp</Link>
        </li>
        <li className="nav-item">
          <Link to='/signin' className='nav-link' style={{color:"black"}}>SignIn</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar