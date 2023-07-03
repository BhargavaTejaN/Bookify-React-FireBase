import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom'

import {useFireBaseContext} from '../../customHooks/useFireBaseContext'

const List = () => {

  const navigate = useNavigate();

  const {handleCreateNewListing} = useFireBaseContext();

  const [formData, setFormData] = useState({
    name: "",
    isbnNumber: "",
    price: "",
    coverPic: '',
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      await handleCreateNewListing(formData.name,formData.isbnNumber,formData.price,formData.coverPic);
      console.log("RESPONSE : ","DATA ADDED SUCCESSFULLY");
      setFormData({
        name: "",
        isbnNumber: "",
        price: "", 
        coverPic : ''
      })
      navigate("/")
    } catch (error) {
      console.log("ERROR WHILE ADDING THE FORM DATA : ",error)
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <Form onSubmit={submitForm}>
        <Form.Group className="form-group" controlId="formName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formISBNNumber">
          <Form.Label className="form-label">BN Number</Form.Label>
          <Form.Control
            name="isbnNumber"
            value={formData.isbnNumber}
            onChange={handleChange}
            className="form-control"
            type="text"
            placeholder="Enter BnNumber"
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formPrice">
          <Form.Label className="form-label">Price</Form.Label>
          <Form.Control
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            type="text"
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formCoverPic">
          <Form.Label className="form-label">Coverpic</Form.Label>
          <Form.Control
            name="coverPic"
            onChange={handleChange}
            className="form-control"
            type="file"
          />
        </Form.Group>
        <Button className="button" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default List;
