import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFireBaseContext } from "../../customHooks/useFireBaseContext";

const ViewOrderDetails = () => {
  const { id } = useParams();

  const { getOrders } = useFireBaseContext();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(id);
      setOrders(response.docs);
    } catch (error) {
      console.log("ERROR WHILE PLACING THE ORDER : ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((each) => {
        const data = each.data();
        return (
          <div
            key={each.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By : {data.displayName}</h5>
            <h6>Quantity : {data.quantity}</h6>
            <p>Email : {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetails;
