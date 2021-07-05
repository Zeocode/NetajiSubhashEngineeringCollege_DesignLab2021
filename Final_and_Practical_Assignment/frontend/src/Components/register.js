import {useState, useEffect} from 'react';


import axios from 'axios';
import { useHistory } from "react-router-dom";



function Register(){

    let history = useHistory();
    


    useEffect(() => {
        console.log("Use Effect Processed!");
    });

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const [password,setPassword]=useState("");


    function submit(e){

        e.preventDefault();
        axios.post("/signupenc",{
            name:name,
            email: email,
            password: password,
            contact:mobile
        }).then((res) => {
            console.log(res.data)
            history.push('/login')
          
        });
    }

    return(

        <div>
            <br></br>

            <center>
            <form onSubmit={(e) => submit(e)}>
                <label  >Name: </label>
                <input id = "name" type = "text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}></input><br/><br/>
                <label >Email: </label>
                <input id="email"type = "text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input><br/><br/>
                <label >Contact: </label>
                <input id="contact"type = "text" placeholder="Enter Number" value={mobile} onChange={(e)=> setMobile(e.target.value)}></input><br/><br/>
                <label >Password: </label>
                <input id="passsword" type = "password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input><br/><br/>
                <button>Submit</button>
            </form>    
                
            </center>

            
            

        </div>
    )
    
    // function onSubmit(){

    //     let request={name: document.getElementById("name"), 
    //       email: document.getElementById("email"), 
    //       contact: document.getElementById("contact"), 
    //       password: document.getElementById("password")}
      
    //     axios.post('http://localhost:5000/signupenc',request)
    //             .then(res => console.log(res.data));
    //   }
   
}


export default Register