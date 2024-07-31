import classes from "./Footer.module.css";
import WhiteLogo from "../../../assets/white-logo.png";
import { FacebookIcon, TwitterIcon, InstaIcon } from "../../UI/svgs/svgs";
import { Link } from "react-router-dom";
import bgpic from '../../../assets/landing.png';

const Links = [
  { name: "My Account", href: "/user" },
  { name: "View Locations", href: "/business-locations" },
  { name: "Watch Stories", href: "/" },
];
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.bgPicture} />
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
          {/* <h4>Subscribe To Our Newsletter</h4> */}
          <h4>Join Our Waitlist</h4>
          <form>
            <input
              className="text-black"
              type="email"
              placeholder="Enter Your Email"
            />
            <button className="md:mx-auto">
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
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            {/* <li>
              <a target="_blank" href="https://forms.gle/qgZ2RVkkqt2f49bs8">
                submit survey
              </a>
            </li> */}
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
