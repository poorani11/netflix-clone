import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./PlanScreen.css";
import { selectUser } from '../features/userSlice';
import { db } from '../app/firebase';
import { collection, query, where, getDocs, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

const PlanScreen = () => {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    const get1 = async () => {
      const d = doc(db, "customers", user.uid);
      const querySnapshot = await getDocs(collection(d, "subscriptions"));
      let data = {};
      querySnapshot.forEach(subscription => {
        data["role"] = subscription.data().role;
        data["current_period_end"] = subscription.data().current_period_end.seconds;
        data["current_period_start"] = subscription.data().current_period_start.seconds;

      })
      setSubscription(data)
    }
    get1();
  }, [])

  useEffect(() => {
    const get = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      let data = {}
      querySnapshot.forEach(async (doc) => {
        data[doc.id] = doc.data();
        const priceSnap = await getDocs(collection(doc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          data[doc.id].prices = {
            priceId: price.id,
            priceData: price.data()
          }
        })
      });
      setProducts(data)
    }
    get();
  }, [])

  const loadCheckout = async (priceId) => {
    const docRef = doc(db, "customers", user.uid);
    const checkoutRef = await addDoc(collection(docRef, "checkout_sessions"), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
    onSnapshot(checkoutRef, (async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //show an error to the customer
        //inspect your Cloud Function logs in the Firebase Console
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        //we have a session, let's redirect to checkout
        //Init Stripe
        const stripe = await loadStripe("pk_test_51Pud3k03zLXeDqoBHprqrfwtNvENaTSetwkgYbuQLqajjHGLE6M0TW6GL5WvALbq1Xqnr8puwK0mSiiUlCDFERBm00eTgmeLWh");
        stripe.redirectToCheckout({ sessionId });
      }
    }))

  }
  return (
    <div className="planScreen">
      {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
        return (
          <div key={productId} className={`${isCurrentPackage && "planScreen__plan--disabled"}  planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? "Current Package" : "Subscribe"}</button>
          </div>
        )
      })}
    </div>
  )
}

export default PlanScreen
