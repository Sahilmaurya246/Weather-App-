import { useState } from 'react'
import err from "./images/err.jpg"
import clear_sky from "./images/clear_sky.png"
import './App.css'

function Weather(){
    const [search , setSearch]=useState("");
    const [data, setData] = useState()
    const[error,setError]=useState("");
    const Api_Key="fd5e18103ffcccb66873b382441f8ca8"
    const API="https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={Api_Key}"
    const handleInput= (e)=>{
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    const myButton= async()=>{
        const get =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${Api_Key}&units=metric`);
        const jsonformatedata=await get.json()
        console.log(jsonformatedata);
        setData(jsonformatedata);

        setSearch("")

        if(search===""){           
            setError("Please enter city name.....");
        }
        else if(jsonformatedata.cod=="404"){
            setError("Please Enter the valied city name....");
        }
        else{
            setError("");
        }
    }

    return(
          
        <div id='main-Container'>
            <h1 id='app-name'>Weather App</h1>
            <div id='first-box'>
                <input type='text' value={search} onChange={handleInput} placeholder='Enter your city name'
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            myButton(e);
                        }
                    }}
                />
                <button onClick={myButton}><i className="fa-solid fa-magnifying-glass"></i></button>                
                {
                    error ?
                    <div className='errorPage'>
                        <p>{error}</p>
                        <div id="imagebox">
                            <img src={err}/>
                        </div>                    
                    </div> : ""
                }
                
            </div>
          
            <div id='Second-box'>
                {/* ternary operator laya hai   */}
                {data && data.weather && 
                (
                    <div id='Deatails'>
                        <p><h1>{data.name}</h1></p>
                        <img  id="clearImage"  src={data.weather[0].main == "Clear" ? clear_sky : "" }/>

                        <h2> <strong>Temp</strong>  : {Math.trunc(data.main.temp)}°C</h2>

                        <p><strong>Cloud:  </strong>{data.weather[0].description}</p>

                        <p><strong>Speed : </strong>{Math.trunc(data.wind.speed)*3.6} km/h</p>

                        <p><strong>Humidity:  </strong>{data.main.humidity} %</p>

                        <p><strong>Country :  </strong> {data.sys.country}</p>
                        
                       
                    </div>
                )}
            </div>

        </div>
    );
   
}

export default Weather;