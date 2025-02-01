import { useData } from "../config/Data";
import { PCBig } from "./PCBig";
import "../Styles/home.css";


const Trending = ()=>{
    const data = useData();
    let randomPodcast =[];
    const isLoading = !data || data.length === 0;

    let length = data.length;
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * length);

            randomPodcast.push(data[randomIndex]);
        }

    

    if(isLoading){
        return (
            <div className="home">
                <div className="spinner"></div>
            </div>
        )
    }else 

    return (
        randomPodcast.map((podcast) => (
        <PCBig key={podcast.id} title={podcast.title} img={podcast.image} />
    )));
    
}


export default Trending;