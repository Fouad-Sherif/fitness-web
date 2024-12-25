import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from "./Loginform";
import RegistrationForm from "./Registrationform";
import Gyms from "./gyms"; // Component for gym view
import AddGyms from "./addgyms"; // Component for adding gyms
import AddPersonalTrainers from "./addpersonaltrainer"; // Component for adding personal trainers

const Main = () => {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null); // Stores user info, e.g., { isAdmin: true, username: "user1" }

  let currentPage;
  if (page === "home") currentPage = <Home />;
  else if (page === "login")
    currentPage = <LoginForm navigate={setPage} setUser={setUser} />;
  else if (page === "register") currentPage = <RegistrationForm />;
  else if (page === "gyms") currentPage = <Gyms />;
  else if (page === "addgyms") currentPage = <AddGyms  navigate={setPage} />;
  else if (page === "addpersonaltrainers")
    currentPage = <AddPersonalTrainers />;
  else currentPage = <Home />; // Default to home for invalid pages

  return (
    <div>
      <NavBar navigate={setPage} user={user} />
      {currentPage}
    </div>
  );
};

export default Main;