import { useState, useEffect } from "react";

//* Fetch data from API and return it as an array of objects 

const useData = () => {
    const [dataV, setData] = useState([]);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app/shows')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error))
    }, []);

    return dataV;
}



export { useData };

