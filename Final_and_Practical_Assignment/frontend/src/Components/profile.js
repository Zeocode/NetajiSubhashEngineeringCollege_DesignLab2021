
import {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from 'axios'


function Profile(){

    const location = useLocation();
    const received_mail = location.state.params;

    const [name,setName]=useState("");
    const [email,setEmail]=useState(received_mail);
    const [mobile,setMobile]=useState("");
    const [password,setPassword]=useState("");



    let history = useHistory();
    
    
    useEffect(() => {
        console.log("Use Effect Processed!");
        getDetails();
       
    },[]);

    
    function getDetails() {
        axios.post("/reqData",{
            email: received_mail
        }).then((res) => {
            console.log(res)
            setName(res.data.name)
            setMobile(res.data.contact)
           
        });
    }
    
   
    
    function submit(e){

        e.preventDefault();
        axios.post("/updateData",{
            name:name,
            email:email,
            password: password,
            contact:mobile
        }).then((res) => {
            //console.log(res.data)
            getDetails();
            //history.push('/profile',{params:email})
          
        });
    }

    function methodCancel(){

        history.push('/home',{params:received_mail})
    }

    
    

    return(

            
        <div>
            <br></br>

            <center>
            <h1>Profile</h1>

            <form onSubmit={(e) => submit(e)}>
                <label  >Name: </label>
                <input id = "name" type = "text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}></input><br/><br/>
                <label >Email: </label>
                <input id="email"type = "text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} readOnly></input><br/><br/>
                <label >Contact: </label>
                <input id="contact"type = "text" placeholder="Enter Number" value={mobile} onChange={(e)=> setMobile(e.target.value)}></input><br/><br/>
                <label >Password: </label>
                <input id="passsword" type = "password" placeholder="Reset Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input><br/><br/>
                <button type="submit">Update</button>
                </form> 
                <br></br>
                <button onClick={()=>methodCancel()}>Cancel</button>
               
                
            </center>

            
            

        </div>
    
    )
}

export default Profile