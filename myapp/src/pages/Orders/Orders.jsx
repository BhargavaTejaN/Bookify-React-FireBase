import React, { useEffect, useState } from "react";
import { useFireBaseContext } from "../../customHooks/useFireBaseContext";

import BookCard from "../../components/Card/BookCard";

const Orders = () => {
  const { fetchMyBooks, isLoggedIn,user } = useFireBaseContext();

  const [books, setBooks] = useState([]);

  const getOrderDetails = async () => {
    try {
      if (isLoggedIn) {
        const books = await fetchMyBooks(user.uid);
        setBooks(books.docs);
      }
    } catch (error) {
      console.log("ERROR WHILE FETCHING THE ORDERS : ", error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (!isLoggedIn) {
    return <h1>Please Login</h1>;
  }

  return (
    <div>
      {books.map((each) => (
        <BookCard link={`/orders/${each.id}`} key={each.id} id={each.id} {...each.data()} />
      ))}
    </div>
  );
};

export default Orders;
