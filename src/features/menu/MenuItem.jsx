import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem } from '../cart/cartSlice';
import DeleteItems from '../cart/deleteItems';

function MenuItem({ pizza }) {

  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const pizzaQuantity = useSelector((state)=> state.cart.cart.find((item)=> item.pizzaId === id)?.quantity ?? 0); 

  const isInCart = (pizzaQuantity > 0);
  

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase">Sold out</p>
          )}

           {isInCart && < DeleteItems pizzaId={id}/>}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add-to-cart
            </Button>
          )}
          
          
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
