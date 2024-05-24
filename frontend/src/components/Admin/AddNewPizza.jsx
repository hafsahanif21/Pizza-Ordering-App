import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addPizza } from "../../actions/pizzaAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../Loader";
import Error from "./../Error";
import Success from "./../Success";

const AddNewPizza = () => {
  // State variables to store form data
  const [name, setname] = useState("");
  const [smallPrice, setsmallPrice] = useState("");
  const [largprice, setlargprice] = useState("");
  const [mediumPrice, setmediumPrice] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  // Get state from Redux store
  const addPizzaState = useSelector((state) => state.addPizzaReducer);
  const { loading, error, success } = addPizzaState;

  // Dispatch function to call action
  const dispatch = useDispatch();

  // Function to handle form submission
  const submitForm = (e) => {
    e.preventDefault();
    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        larg: largprice,
      },
    };
    // Dispatch addPizza action with pizza data
    dispatch(addPizza(pizza));
  };

  return (
    <div>
      {/* Show loader while loading */}
      {loading && <Loader />}
      {/* Show error message if error occurred */}
      {error && <Error error="add new pizza error" />}
      {/* Show success message if pizza added successfully */}
      {success && <Success success="Pizza Added Successfully" />}

      {/* Form for adding new pizza */}
      <Form onSubmit={submitForm} className="bg-light p-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Small Price</Form.Label>
              <Form.Control
                type="text"
                value={smallPrice}
                onChange={(e) => setsmallPrice(e.target.value)}
                placeholder="Enter Small Price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Medium Price</Form.Label>
              <Form.Control
                type="text"
                value={mediumPrice}
                onChange={(e) => setmediumPrice(e.target.value)}
                placeholder="Enter Medium Price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Large Price</Form.Label>
              <Form.Control
                type="text"
                value={largprice}
                onChange={(e) => setlargprice(e.target.value)}
                placeholder="Enter Large Price"
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setimage(e.target.value)}
              placeholder="Add Image URL"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Enter Category"
          />
        </Form.Group>

        {/* Button to submit form */}
        <Button variant="primary" type="submit">
          Add New
        </Button>
      </Form>
    </div>
  );
};

export default AddNewPizza;
