// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

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
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({params}) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
