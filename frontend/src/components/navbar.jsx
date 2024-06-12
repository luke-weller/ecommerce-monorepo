import { NavLink } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
  return (
    <header className='navbar'>
      <a href='/'>
        <img
          className='logo'
          src='../logo-placeholder.png'
          alt='logo placeholder'
        />
      </a>
      <nav>
        <ul className='nav-links'>
          <li>
            <NavLink
              exact
              to='/shop'
              className={'nav-link'}
              activeClassName='active'
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to='/cart'
              className={'nav-link'}
              activeClassName='active'
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
      <ul className='nav-links'>
        <li>
          <NavLink
            exact
            to='/register'
            className={'nav-link'}
            activeClassName='active'
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink className='cta' to='/auth' activeClassName='active'>
            Sign In
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
