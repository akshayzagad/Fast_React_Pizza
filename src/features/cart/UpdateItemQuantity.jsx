import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { addQuantity, deleteQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleAddQuantity() {
    dispatch(addQuantity(pizzaId));
  }

  function handleDeleteQuantity() {
    dispatch(deleteQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-3 md:gap-3">
      <Button type="round" onClick={handleAddQuantity}>
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleDeleteQuantity}>
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity
