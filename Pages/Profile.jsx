import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodNavigation } from "../Components/navigation";
import "../Styles/profile.css";
import Supabase from "../config/SupabaseClient";

export const Profile = () => {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("EmailVal");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      if (!storedEmail) return;
      const { data, error } = await Supabase.from("Users")
        .select("Name, Surname, Email, Password")
        .eq("Email", storedEmail)
        .single();

      if (error) {
        setMessage("Unable to load profile information.");
        console.error(error);
        return;
      }

      if (data) {
        setName(data.Name || "");
        setSurname(data.Surname || "");
        setEmail(data.Email || "");
        setPassword(data.Password || "");
      }
    };

    checkUserLogin();
  }, [storedEmail]);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await Supabase.from("Users")
      .update({ Name: name, Surname: surname, Email: email, Password: password })
      .eq("Email", storedEmail);

    setLoading(false);

    if (error) {
      setMessage("Unable to update account. Please try again.");
      console.error(error);
      return;
    }

    if (storedEmail !== email) {
      localStorage.setItem("EmailVal", email);
    }

    setMessage("Account updated successfully.");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    setLoading(true);
    const { error } = await Supabase.from("Users").delete().eq("Email", storedEmail);
    setLoading(false);

    if (error) {
      setMessage("Failed to delete your account. Please try again.");
      console.error(error);
      return;
    }

    localStorage.removeItem("EmailVal");
    setMessage("Your account was deleted.");
    navigate("/");
  };

  return (
    <div className="profile">
      <PodNavigation />
      <div className="profile-card">
        <h1>Account Profile</h1>
        <div className="profile-form">
          <label>
            Name
            <input
              type="text"
              className="InputPro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Surname
            <input
              type="text"
              className="InputPro"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              className="InputPro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              className="InputPro"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="profile-actions">
            <button className="primary-btn" onClick={handleUpdate} disabled={loading}>
              {loading ? "Saving..." : "Update Account"}
            </button>
            <button className="danger-btn" onClick={handleDelete} disabled={loading}>
              Delete Account
            </button>
          </div>

          {message && <div className="profile-message">{message}</div>}
        </div>
      </div>
    </div>
  );
};
