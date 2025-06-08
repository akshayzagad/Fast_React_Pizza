import { useDispatch } from "react-redux";
import { deleteItems } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItems({pizzaId}) {

const dispatch = useDispatch();

  function handleDeleteCartItem() {
    dispatch(deleteItems(pizzaId));
  }

    return (
      <div>
        <Button type="small" onClick={handleDeleteCartItem}>
          Delete
        </Button>
      </div>
    );
}

export default DeleteItems;
