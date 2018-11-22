import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/generateInv'>Generate Invoice</Link></li>
          <li><Link to='/viewInv'>View Invoice</Link></li>
          <li><Link to='/editProducts'>Edit Products</Link></li>
          <li><Link to='/viewProducts'>View Products</Link></li>
        </ul>
      </nav>
    </header>
  )

  export default Header;