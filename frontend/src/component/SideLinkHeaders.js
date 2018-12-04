import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/generateInv'>Generate Invoice</Link></li>
          <li><Link to='/invoices'>View Invoice</Link></li>
          <li><Link to='/clients'>Clients</Link></li>
          <li><Link to='/products'>Products</Link></li>
        </ul>
      </nav>
    </header>
  )

  export default Header;