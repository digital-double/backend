require('dotenv').config
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res, next) => {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: req.body.budget,
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${req.headers.origin}/app`,
        });

        res.send({clientSecret: session.client_secret});
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
}