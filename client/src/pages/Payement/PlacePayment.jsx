import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY );

const PlacePayment = (props) => {

    const options = {
        mode: 'payment',
        amount: 5000, // ₹50.00 in paise (minimum amount for Stripe)
        currency: 'inr',
        // Fully customizable with appearance API.
        appearance: {
            theme: 'flat'
        },
      };

  return (
    <div>
        <Elements stripe={stripePromise} options={options}>
             <CheckoutForm {...props}/>   
        </Elements>
    </div>
  )
}
export default PlacePayment;
