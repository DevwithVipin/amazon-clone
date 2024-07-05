import React, { useContext, useEffect } from 'react';
import "./App.css";
import Home from "./Home/Home";
import { auth } from "./Firebase/firebase";
import Header from "./Header/Header";
import Order from "./Order/Order";
import { Orders } from "./Order/Orders";
import Checkout from "./Checkout/Checkout";
import { useStateValue } from "./Reducer/StateProvider";
import Login from "./Login/Login";
import Payment from "./Payment/Payment";
import StripeCheckout from "react-stripe-checkout"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { LoaderContext } from './TopBarContext/loaderContext';



function App() {
  const promise = loadStripe(
    "pk_test_51PZCR3HZIKsfMwoXM8n2UIC6ETvjxmkEEyD5lgmRu1POQo6gQqajxg96xDBcaeMQaDn3PDc2DYnAP3CQnsRdRGdb00nsL0UpZL"
  );
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });

  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header />
            <Home /></>} />
          {/* <Route path="/orders" element={<><Header /><Orders /></>} /> */}
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/payment" element={<><Header /> <Elements stripe={promise}>
            <Payment />
          </Elements></>} />
          <Route path="/Login" element={<><Header /><Login /></>} />
        </Routes>
      </div>
    </BrowserRouter>






  );
}
export default App;
