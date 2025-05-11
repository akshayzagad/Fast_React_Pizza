// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {

  const order = useLoaderData();
  
  /**
   * useLoaderData Hook:

    This is a React Router hook that allows a component to access the data returned by the 
    loader function associated with the current route.
    It ensures that the component has access to the data fetched by the loader before rendering.

   * order Variable:
    The order variable stores the data returned by the loader function.
    In this case, the loader function fetches an order object
    (e.g., details about a specific pizza order) using the getOrder function.

   * How It Works:

    When a user navigates to a route (e.g., /order/:orderId), React Router calls the loader 
    function for that route.
    The loader fetches the required data (e.g., an order object) and returns it.
    The useLoaderData hook retrieves this data and makes it available to the component.

   * Purpose:

    This approach ensures that the Order component has all the necessary data (order) before it 
    renders.
    It avoids the need for additional API calls or state management within the component itself.

   * Example Flow:
    A user navigates to /order/123.
    React Router calls the loader function, which fetches the order details for orderId = 123 and 
    returns the data.
    The useLoaderData hook retrieves the returned data and assigns it to the order variable.
    The Order component uses the order variable to display the order details.
   
   */

  /**  Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address,
       these are only for the restaurant staff
  */

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
