import classes from "./Login.module.css";
import { LoginFormBtn } from "../../components/UI/Buttons";

const Login = () => {
  return (
    <section className={classes.login}>
      <div className="row">
        <div
          className={`col-md-6 d-flex justify-content-center align-items-center ${classes.text}`}
        >
          <div>
            <h3>
              {" "}
              Ready to go out without <br />
              <span className={classes.sapa}>Sapa? </span>
            </h3>
            <p>Login now and Plan a Trip</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <form className={classes.form}>
            <div className="d-flex flex-column">
              <input className="mt-5" type="text" placeholder="Email Address" />
              <input className="mt-5" type="password" placeholder="Password" />
              <p className="mb-5 text-end mt-4">Forgot Password?</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="align-self-center">
                New To Travaye? <span>Sign Up</span>
              </p>
              <LoginFormBtn />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
