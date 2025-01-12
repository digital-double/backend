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

exports.createStripeCustomer = async (req) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });

    return customer
  } catch (err) {
    throw new StatusError("stripe error", 400)
  }
}

exports.createStripeAccount = async (req, business_type ) => {
  try {
    const account = await stripe.accounts.create({
      country: req.country,
      email: req.email,
      business_type: business_type,
      controller: {
        fees: {
          payer: 'application',
        },
        losses: {
          payments: 'application',
        },
        stripe_dashboard: {
          type: 'express',
        },
      },
    });
    return account
  } catch (err) {
    throw new StatusError("stripe error", 400)
  }
}

exports.getStripeUser = async (req, res, next) => {
  try {
    const customer = await stripe.customers.retrieve(req.body.stripeID);

    return res.status(200).send({
      message: 'User data sent successfully',
      customer,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}

exports.updateStripeUser = async (req, res, next) => {
  try {
    const { stripeID } = req.body 

    const dynamicMetadata = Object.keys(req.body.metadata || {}).reduce((acc, key) => {
      acc[key] = req.body.metadata[key];
      return acc;
    }, {});
    
    const customer = await stripe.customers.update(stripeID, {
      metadata: dynamicMetadata,
    });
    

    return res.status(200).send({
      message: 'User data updated successfully',
      customer,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}

exports.delStripeUser = async (req, res, next) => {
  try {
    const deleted = await stripe.customers.del(req.body.stripeID);

    return res.status(200).send({
      message: 'User data deleted successfully',
      deleted,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}