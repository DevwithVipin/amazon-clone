import React from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "../Reducer/StateProvider"
import { getAuth, signOut } from "firebase/auth";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(user);
  const navigate = useNavigate();

  const auth = getAuth();
  const handleAuthenticaton = (e) => {

    if (user) {
      signOut(auth).then(() => {
        navigate('/Login');
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
  }

  return (
    <div className="header">
      <Link to="/"> <img className="header__logo"
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" /></Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>


        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>

    </div>
  )
}

export default Header;