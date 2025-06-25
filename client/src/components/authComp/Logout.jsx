import useAuthstore from "../../store/auth.store"

function Logout({className}) {
    const {logoutUser} = useAuthstore();

    const handleLogout = async(e)=>{
        e.preventDefault();
        logoutUser()
    }
  return (
    <button className={className} onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout
