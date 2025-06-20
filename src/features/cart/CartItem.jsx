import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItems from "./deleteItems";
import UpdateItemQuantity from "./UpdateItemQuantity";


function CartItem({ item }) {

  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(
    (state) =>
      state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0,
  );

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>

      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItems pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;