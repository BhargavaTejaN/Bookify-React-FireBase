import React, { useEffect, useState } from "react";
import CardGroup from 'react-bootstrap/CardGroup';

import { useFireBaseContext } from "../../customHooks/useFireBaseContext";
import BookCard from "../../components/Card/BookCard";

const Home = () => {
  const { listAllBooks } = useFireBaseContext();

  const [books, setBooks] = useState([]);

  const getTheData = async () => {
    try {
      const response = await listAllBooks();
      setBooks(response.docs);
    } catch (error) {
      console.log("ERROR WHILE FETCHING THE DATA FROM FIRESTORE DB : ", error);
    }
  };

  useEffect(() => {
    getTheData();
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((each) => (
          <BookCard link={`/view-book/${each.id}`} key={each.id} id = {each.id} {...each.data()} />
        ))}
      </CardGroup>
    </div>
  );
};

export default Home;
