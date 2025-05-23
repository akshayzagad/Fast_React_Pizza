import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-semibold">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input flex-grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          
          {formErrors ?.phone && <p className="text-sm mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" className="input w-full" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting} >
            {isSubmitting ? "Order is Placing" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // const newOrder = await createOrder(order);

  // return redirect(`/order/${newOrder.id}`);
  return null
}

export default CreateOrder;

/**
 * action Function:

    This function is exported and used as a handler for form submissions in React Router.
    It processes the form data submitted via a <Form> component.

 * request Parameter:

    The request object is passed to the action function by React Router.
    It represents the HTTP request made when the form is submitted.

 * request.formData():

    The formData() method extracts the form data submitted by the user and returns it as 
    a FormData object.
    This object allows access to the submitted form fields and their values.

    *Object.fromEntries(formData):

    Converts the FormData object into a plain JavaScript object (data), 
    where each key corresponds to a form field name, and each value corresponds to the field's value. 

 * order Object:

    A new order object is created by:
    Spreading all key-value pairs from data into it (...data).
    Parsing the cart field (which is a JSON string) into a JavaScript array using JSON.parse(data.cart).
    Converting the priority field into a boolean (true if the checkbox was checked, otherwise false).

 *createOrder(order):

    The createOrder function is called with the order object. This function likely sends the order 
    data to an API or backend service to save it.
    The result (newOrder) contains the newly created order, including its unique ID.

    *redirect(/order/${newOrder.id}):

    After the order is created, the user is redirected to a new route (/order/${newOrder.id}), 
    where they can view the details of their order.
    The redirect function is provided by React Router to handle navigation programmatically. 

 * Purpose:
    This function processes the form submission by:

    Extracting and normalizing the form data.
    Sending the data to a backend service to create a new order.
    Redirecting the user to the newly created order's page.

 * Example Flow:

    The user fills out the form and submits it.
    The action function is triggered, and the form data is extracted.
    The order object is created and sent to the backend via createOrder.
    The user is redirected to the /order/:id page to view their order details.
 
 */
