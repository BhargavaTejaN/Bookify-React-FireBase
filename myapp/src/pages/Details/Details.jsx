import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFireBaseContext } from "../../customHooks/useFireBaseContext";

import './index.css'
import Button from "react-bootstrap/esm/Button";


const BookDetail = () => {
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [quantity,setQuantity] = useState(1);

  const { id } = useParams();

  const { getBookById, getImageURL,placeOrder } = useFireBaseContext();

  const getBookDetails = async () => {
    try {
      const response = await getBookById(id);
      setData(response.data());
    } catch (error) {
      console.log("ERROR WHILE FETCHING SPECIFIC BOOK DETAILS : ", error);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  const getImage = async () => {
    try {
      if (data) {
        const imageURL = data.imageURL;
        const response = await getImageURL(imageURL);
        setURL(response);
      }
    } catch (error) {
      console.log("ERROR WHILE FETCHING THE SPECIFC IMAGE :", error);
    }
  };

  useEffect(() => {
    getImage();
  }, [data]);


  const buyBook = async () => {
    try {
      const response = await placeOrder(id,quantity);
      console.log("RESULT FOR BUYING THE BOOK : ",response);
    } catch (error) {
      console.log("ERROR WHILE BUYING THE BOOK : ",error);
    }
  }

  if (data === null) return <h3>Loading..</h3>;

  return (
    <div className="container mt-5">
      <div>
        <h1>{data.name}</h1>
        <img src={url} alt={url} width="90%" style={{ borderRadius: "10px" }} />
      </div>
      <div>
        <h1>Details</h1>
        <p>ISBN Number : {data.isbnNumber}</p>
        <p>Price : Rs {data.price}</p>
        <h1>Owner Details</h1>
        <img src={data.photoURL} alt={data.name} />
        <p>Name : {data.displayName}</p>
        <p>Email Id : {data.userEmail}</p>
        <Form.Group className="form-group" controlId="formBasicQuantity">
          <Form.Label className="form-label">Quantity</Form.Label>
          <Form.Control
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="form-control"
            type="number"
            placeholder="Enter Quantity"
          />
        </Form.Group>
        <Button onClick={buyBook} variant="success">Buy Now</Button>
      </div>
    </div>
  );
};

export default BookDetail;
