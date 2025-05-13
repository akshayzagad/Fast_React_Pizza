import { Link, useNavigate } from "react-router-dom";

function LinkkButton({children,to}) {
    const navigate = useNavigate();
    const className = 'text-sm text-blue-500 hover:text-blue-900 hover:underline';

    if (to === -1) {
        return <button className={className} onClick={()=>navigate(-1)}>{children}</button>
    }
    return (
         <Link to="/menu" className={className}>{children}</Link>
    )
}

export default LinkkButton
