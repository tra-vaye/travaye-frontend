import classes from "./Footer.module.css";
import WhiteLogo from "../../../assets/white-logo.png";
import { FacebookIcon, TwitterIcon, InstaIcon } from "../../UI/svgs/svgs";

const Links = ["My Account", "View Businesses", "Watch Stories"];
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
            {FacebookIcon} {TwitterIcon} {InstaIcon}
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
            {Links.map((link, i) => {
              return <li>{link}</li>;
            })}
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
