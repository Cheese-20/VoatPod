import { useEffect, useState } from "react";
import { PodNavigation } from "../Components/navigation";
import "../Styles/profile.css";
import Supabase from "../config/SupabaseClient";

export const Profile = () => {
  const mail = localStorage.getItem("EmailVal");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      const { data, error } = await Supabase.from("Users")
        .select()
        .eq("Email", mail);
      if (error) {
        console.log(error);
      }
      if (data.length !== 0) {
        setName(data[0].Name);
        setSurname(data[0].Surname);
        setEmail(data[0].Email);
        setPassword(data[0].Password);
      }
    };
    checkUserLogin();
  }, []);

  const handleUpdate = () => {
    setChanged(true);
  };

  return (
    <div className="profile">
      <PodNavigation />
      <div className="User-details">
        <input
          type="text"
          placeholder="Name"
          className="InputPro"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Surname"
          className="InputPro"
          defaultValue={surname}
        ></input>
        <input
          type="email"
          placeholder="email"
          className="InputPro"
          defaultValue={mail}
        ></input>
        <input
          type="text"
          placeholder="Password"
          className="InputPro"
          defaultValue={password}
        ></input>
        <button onClick={handleUpdate}>Change details</button>
      </div>
    </div>
  );
};
