import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Stripe from "react-stripe-checkout";

function App() {
  const [product, setproduct] = useState({
    name: "Sab Milega",
    price: 15,
    productBy: "Akash",
  });

  const makepayment = (token) => {
    const body = {
      token,
      product,
    };
    const header = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:8282/payment", {
      method: "POST",
      header,
      body: JSON.stringify(body),
    })
      .then((Response) => {
        console.log("RESPONSE:", Response);
        const { status } = Response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log("ERROR", error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Stripe
          stripeKey="pk_test_51HRb4FCpkQsokxWb5nAmjRSRfdGmj3yfxchJ03ePMOt7aLkTDjBmGUdOgRW02QkdLFSNerG11QqzSiKbgKdVuVRZ00gDmmARQ7
"
          token={makepayment}
          name="Buy Anything"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large blue">
            Buy Anything in {product.price} $
          </button>
        </Stripe>
      </header>
    </div>
  );
}

export default App;
