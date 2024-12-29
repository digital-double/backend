require('dotenv').config
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res, next) => {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: req.body.budget,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url : `${process.env.CLIENT_URL}/checkout-success`,
          cancel_url : `${process.env.CLIENT_URL}/campaign`,
        });

        res.send({clientSecret: session.client_secret});
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
}

exports.getCheckout = async (req, res, next) => {
  try {
    const session =
      await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}


exports.createUser = async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });

    return customer
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}