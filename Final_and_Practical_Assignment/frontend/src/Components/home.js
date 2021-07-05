import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {useDispatch} from "react-redux"
import {logout} from "../features/userSlice"

function Home(){

    const dispatch = useDispatch();

    const location = useLocation();
    const email = location.state.params;
    let history = useHistory();
    function func1(){
      
        history.push('/profile',{params:email})
    }
    function func2(){

     

        dispatch(
            logout()
        );
        history.push('/login')
        

    }

    return(
        <div>
            <center>
            <h1>Home</h1>
            <button onClick={()=>func1()}>Profile</button>
            <button onClick={()=>func2()}>LogOut</button>
            
            </center>
            
        </div>
    )
}


export default Home