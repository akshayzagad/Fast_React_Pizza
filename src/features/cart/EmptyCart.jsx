import { Link } from 'react-router-dom';
import LinkkButton from '../../ui/LinkkButton';

function EmptyCart() {
  return (
    <div className='py-7'>
      <LinkkButton to="/menu">&larr; Back to menu</LinkkButton>

      <p className='font-semibold my-5'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;