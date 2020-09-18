const cors = require("cors");
const express = require("express");
//add strips keys
const stripe = require("stripe")(
  "sk_test_51HRb4FCpkQsokxWb9uGhJeZYeiswoTWxIv8yP1vUhZRWFDU8lW809PMF2qdcXFxKVkwrQ2jTxX5F0zCfstmWasB900uPTuE6I6"
);
const uuid = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//router
app.get("/", (req, res) => {
  res.send("its work");
});

app.post("/payment", (req, rea) => {
  const { product, token } = req.body;
  console.log("Product: ", product);
  console.log("Price: ", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: "purchase of ${product.name}",
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listers
app.listen(8282, () => {
  console.log("Listening at PORT 8282");
});
