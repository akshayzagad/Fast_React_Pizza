import { Link } from 'react-router-dom';
import LinkkButton from '../../ui/LinkkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {

  const userName = useSelector((state)=> state.user.username);

  const cart = useSelector((state)=>state.cart.cart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-3'>
      <LinkkButton to="/menu" >&larr; Back to menu</LinkkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>

      <ul className='divide-y divide-stone-200 bottom-b mt-3 '>
        {cart.map((item)=> <CartItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className='mt-6 space-x-2'>
        
        <Button to="/order/new" type="primary">Order pizzas</Button>
       
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
        
      </div>
    </div>
  );
}

export default Cart;