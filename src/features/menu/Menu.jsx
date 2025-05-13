import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem"

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return <ul className="divide-y divide-stone-200 px-2">Menu
    {menu.map((pizza)=><MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>;
}

export async function loader() {
  const menu = await getMenu();
return menu;
}

export default Menu;

/** 
 * Note -> Loader Function:

A loader function is defined for a route. This function is responsible for fetching or preparing the data 
required for the route.
The loader function runs before the component is rendered.
Data Access:

The useLoaderData() hook is used inside the component to access the data returned by the loader function.
Automatic Data Passing:

The data returned by the loader is automatically passed to the component via useLoaderData().
 */