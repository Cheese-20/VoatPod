
import { PodNavigation } from "../Components/navigation";
import "../Styles/profile.css";


export const Profile = () => {

    const mail = localStorage.getItem('EmailVal')
    
    return (
        <div className="profile">
            <PodNavigation />
            <h1>{mail}</h1>
            
        </div>

    )
};

