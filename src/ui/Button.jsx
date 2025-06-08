import { Link } from "react-router-dom"

function Button({children,disabled,to,type,onClick}) {

    const base = 'text-sm inline-block bg-yellow-400 uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-yellow-100 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

    const style = {
      primary: base + ' sm:px-6 sm:py-4 px-4 py-3 ',
      small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs ',
      secondary:
        'inline-block text-sm border-2  uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-stone-300   transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-4 py-2.5 hover:text-stone-800 focus:text-stone-800',
      round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    };

    if (to) {
       return <Link className={style[type]} to={to}>{children}</Link> 
    }

    if(onclick){
        <button disabled={disabled} onClick={onClick} className={style[type]}>
          {children}
        </button>;
    }

    return (
        <button onClick={onClick} disabled={disabled} className={style[type]}>
            {children}
        </button>
    )

}

export default Button
