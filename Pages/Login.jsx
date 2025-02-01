import { Navigate } from "react-router-dom";
import Supabase from "../config/SupabaseClient";
import "../Styles/login.css";
import {useState } from "react"
export const Form = ()=>{

    //* Function to handle the login and add the user to the database
        const [name, setName] = useState("");
        const [surname, setSurname] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const[error, setError] = useState(null);
        const[msg, setMsg] = useState(null);
        const[isLogged, setIsLogged] = useState(false);

    //* Function to handle the submit of the form and add the user to the database
    const handleSubmit = async (e) => {
        e.preventDefault();
            if(!name || !surname || !email || !password){
                setError("Please fill all the fields")
                return;
            }

           
            const { data, error } = await Supabase
            .from('Users')
            .insert([{ Name: name, Surname: surname, Email: email, Password: password }])
            .select()

            if(error){
                setError(error.message)
            }
            if(data){
                setError(null);
                setMsg("User created successfully you may now sign-in");
            }
        }

        const handleChange = (e) => {
            setEmail(e.target.value);
        }

        const handleLogSubmit = async (e) => {
            e.preventDefault();
                if(!email || !password){
                    setError("Please fill all the fields")
                    return;
                }

                const { data, error } = await Supabase
                .from('Users')
                .select()
                .eq('Email', email)
                .eq('Password', password)
    
                if(error){
                    setError(error.message);
                    setIsLogged(false);
                    return
                } else
                if(data.length != 0){
                    setError("User logged in successfully");
                    setIsLogged(true);
                }else {
                    setError("User not found or wrong password / email");
                    setIsLogged(false);
                }
        }
    
     //* Changes the container component in order for the animation to work
     const [isActive, setIsActive] = useState(false);

     const handleRegisterClick = () => {
       setIsActive(true);
     };
   
     const handleLoginClick = () => {
       setIsActive(false);
     };


     //* Redirects the user to the home page if the user is logged in
     if(isLogged===true){
        window.localStorage.setItem('EmailVal',email)
        return <Navigate to="/Home" />
    }

    return(
    <div className="login">
        <div className={`container ${isActive ? 'active' : ''}`}>
            <div className="form-container sign-up">
                <form onSubmit={(handleSubmit)}>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" className="boxes" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <input type="text" placeholder="Surname" className="boxes" value={surname} onChange={(e)=>setSurname(e.target.value)}></input>
                    <input type="email" placeholder="Email" className="boxes" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Password" className="boxes" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <button>Sign up</button>
                    {error && <p className="Error">{error}</p>}
                    {msg && <p className="Msg">{msg}</p>}
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={(handleLogSubmit)}>
                    <h1>Sign in</h1>
                    <input type="email" placeholder="Email" className="boxes" value={email} onChange={(e)=>handleChange(e)}></input>
                    <input type="password" placeholder="Password" className="boxes" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <a href="#">Forgot Password?</a>
                    {error && <p className="Error">{error}</p>}
                    <button>Sign in</button>
                </form>
            </div>
            
            <div className="toggle-container">
                <div className="toggle  ">
                   <div className="toggle-panel toggle-left">
                        <h1>Welcome back!</h1>
                        <p>Enter details to login</p>
                        <button className="Hidden" id='login' onClick={handleLoginClick}>Sign in</button>
                   </div>

                   <div className="toggle-panel toggle-right">
                        <h1>Welcome to VoatPod </h1>
                        <p>Please register to use our website</p>
                        <button className="Hidden" id='register' onClick={handleRegisterClick}>Sign up</button>
                   </div>
                </div>
            </div>

        </div>
    </div>


    )
}