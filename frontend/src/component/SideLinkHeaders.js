import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';

// Nav bar to show links to various
// components of the app.
const Header = () => (
    <header>
      <nav>
        <div className="nav-wrapper">
          <Link to='/' className="brand-logo center">
            Invoice Generator
          </Link>
          <ul>
            {/* <li><Link to='/'>Home</Link></li> */}
            <li><Link to='/'>Generate Invoice</Link></li>
            <li><Link to='/invoices'>View Invoice</Link></li>
            <li><Link to='/clients'>Clients</Link></li>
            <li><Link to='/products'>Products</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )

  export default Header;