import classes from "./Footer.module.css";
import WhiteLogo from "../../../assets/white-logo.png";
import { FacebookIcon, TwitterIcon, InstaIcon } from "../../UI/svgs/svgs";
import { Link } from "react-router-dom";

const Links = [
  { name: "My Account", href: "/user" },
  { name: "View Businesses", href: "/business-locations" },
];
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="d-flex justify-content-around p-5">
        <div className="mb-4">
          <img src={WhiteLogo} alt="logo" className="img-fluid" />
          <p>
            Chop life on a budget,
            <br />
            Live free with Travaye
          </p>
          <div className={classes.socials}>
            {FacebookIcon}
            <a href="https://www.instagram.com/travaye_/"> {InstaIcon} </a>
            <a href="http://twitter.com/travaye_"> {TwitterIcon}</a>
          </div>
        </div>
        <div className="mb-5">
          <h4>Subscribe To Our Newsletter</h4>
          <form>
            <input type="email" placeholder="Enter Your Email" />
            <button>
              <svg
                width="30"
                height="22"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11.0001H34M20 1.66675L34 11.0001L20 20.3334"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="mb-4">
          <h4>Useful Links</h4>
          <ul>
            {Links.map(({ name, href }, i) => {
              return (
                <li key={i}>
                  <Link to={href} key={i}>
                    {name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTQwMDM1NTU1MzYyODI0?story_media_id=2927036580269740747&igshid=YmMyMTA2M2Y=">
                Watch Stories
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>2022 Copyrights @ Travaye. All Rights reserved</p>
      </div>
    </footer>
  );
};
export default Footer;
