import "../Styles/Search.css";
import {PodNavigation} from "../Components/navigation";
import { useState } from "react";
import { useData } from "../config/Data";
import {PodcastCard} from "../Components/PodcastCard";
import Fuse from "fuse.js";

export const SearchPod = () => {
    const [search, setSearch] = useState("");
    const searchData = useData();
    const [isSearched, setIsSearched] = useState(false);

    const fuse = new Fuse(searchData, {
        keys: ["title"]
    });

    let finalResults = []

    const HandleSearch = () =>{
        const results = fuse.search(search);
        finalResults = results.map((result) => result.item);
        return finalResults;
    }

    const handleSearchClick = () => {
        if(search != ""){
        setIsSearched(true);
        }
        else{
            setIsSearched(false);
        }
    };
   
    const isLoading = !searchData || searchData.length === 0;

    if(isLoading) return (
        <div className="search">
            <PodNavigation />
                <div className="loader"></div> 
            </div>
    );

    return (
        <div className="search">
            <PodNavigation />
            <div className="SBox">
                    <input type="text" placeholder="Search..."  className="SearchBox" onChange={(e) => setSearch(e.target.value)}/>
                    <img src="../assets/searchIcon.png" alt="Search" className="SearchButton" onClick={handleSearchClick}/>
            </div>
            <div className="SearchResults">
                {isSearched ? (
                    HandleSearch().map((podcast) => (
                        <PodcastCard
                            key={podcast.id}
                            id={podcast.id}
                            img={podcast.image}
                            title={podcast.title}
                            description={podcast.description}
                            seasons={podcast.seasons}
                            genres={podcast.genres}
                        />
                    ))
                ) : (
                    searchData.map((podcast) => (
                        <PodcastCard
                            key={podcast.id}
                            id={podcast.id}
                            img={podcast.image}
                            title={podcast.title}
                            description={podcast.description}
                            seasons={podcast.seasons}
                            genres={podcast.genres}
                        />
                    ))
                )}
            </div>
        </div>
    );
}; 

 