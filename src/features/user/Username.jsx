import { useSelector } from "react-redux";

function Username() {
    const username = useSelector((state)=>state.user.username);

    if(!username) return;
    
    return (
        <div className="hidden text-sm font-semibold md:block">
            <p>{username}</p>
        </div>
    )
}

export default Username;
