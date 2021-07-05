import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux"
import {login} from "../features/userSlice"
import axios from 'axios';
import { useHistory } from "react-router-dom";



function Login(){

    let history = useHistory();
   

    useEffect(() => {
        console.log("Use Effect Processed!");
    });

   
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const dispatch = useDispatch();
    function submit(e){

        e.preventDefault();

        dispatch(
            login({
                email: email,
                password: password,
                loggedIn: true,
            })
        );
        axios.post("/auth",{
            email:email,
            password: password
        }).then((res) => {
            console.log(res.data)
            if(res.data === "Successful Login")
                history.push('/home',{params:email})
        });
    }

    return(
        <div>
            <br></br>

            <center>
            <form onSubmit={(e) => submit(e)}>
            
                <label >Email: </label>
                <input id="email"type = "text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input><br/><br/>
               
                <label >Password: </label>
                <input id="passsword" type = "password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input><br/><br/>

                <button type="submit">Login</button>
            
            </form>    
                
            </center>

            
            

        </div>
    )
}

export default Login