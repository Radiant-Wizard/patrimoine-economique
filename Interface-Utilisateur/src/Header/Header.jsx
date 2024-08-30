import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100dvh", width: "100dvw", background:'#181818' }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: "70dvh", width: "82dvw", border: "1px double white",gap:'5vh' }}
      >
        <h1
          style={{
            fontSize: "5.5vw",
            fontWeight: "bolder",
            textAlign: "center",
            color: "white",
          }}
        >
          Bienvenue dans l'application de gestion du patrimoine
        </h1>

        <div className="d-flex" style={{ gap: "2vw", height: "4vh" }}>
          <Link to="/patrimoine" className="btn btn-primary">
            SEE PATRIMOINE CHART
          </Link>
          <Link to="/possession" className="btn btn-primary">
            SEE POSSESSION TABLE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
