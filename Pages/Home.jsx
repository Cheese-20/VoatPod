import { useData } from "../config/Data";
import "../Styles/home.css";
import Trending from "../Components/Trending";
import {PodNavigation} from "../Components/navigation";

export const Home =()=>{
const data = useData();
const isLoading = !data || data.length === 0;
const genres = ["Personal Growth","True Crime and Investigative Journalism","History","Comedy","Entertainment","Business","Fiction","News","Kids & Family"];

    if(isLoading) return (
        <div className="home">
                <div className="loader"></div> 
            </div>
    )

    return(
        <div className="home">
            <PodNavigation />
                <h1>Trending</h1>
            <div className="trending-container">
                <Trending></Trending>
            </div>

                <h1>Genres </h1>
            <div className="genres-container">
                {genres.map((type, index) => (
                    <button key={index} className="genre-btn">{type}</button>
                ))}
            </div>
            
            <h1>Continue listening </h1>
            <div className="Box">
                <div className="Shadow"></div>
            </div>
        </div>

)}