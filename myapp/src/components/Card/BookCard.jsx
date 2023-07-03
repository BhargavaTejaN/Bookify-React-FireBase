import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {useFireBaseContext} from '../../customHooks/useFireBaseContext'

const BookCard = (props) => {

  const {id} = props

  const navigate = useNavigate();

  const {getImageURL} = useFireBaseContext();

  const {imageURL,name,price,displayName} = props 

  const [url,setUrl] = useState(null);

  const getTheImageURL = async () => {
    try {
      const response = await getImageURL(imageURL)
      setUrl(response)
    } catch (error) {
      console.log("ERROR WHILE GETTING THE IMAGE URL FROM STROGAGE : ",error)
    }
  }

  useEffect(() => {
    getTheImageURL()
  },[])

  return (
    <div>
      <Card style={{ width: "18rem", margin:'25px' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            This Book Has a title {name} and this book is sold by {displayName}
            and this book costs Rs.{price}
          </Card.Text>
          <Button onClick={() => navigate(props.link)} variant="primary">View</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookCard;
