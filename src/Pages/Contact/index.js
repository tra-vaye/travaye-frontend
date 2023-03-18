import classes from "./Contact.module.css";
import {
  Mail,
  User,
  PhoneLink,
  EmailLink,
} from "../../components/UI/svgs/svgs";
import FAQs from "../../components/Faqs";

const Contact = () => {
  return (
    <div className={classes.contact}>
      <h4>Contact Us</h4>
      <h5>We are available to attend to your issues</h5>
      <br />

      <p>
        We are interested in hearing your thoughts. We accept all inuiries and
        unique requests. Send us a message if you have any <br />
        questions, concerns or inquiry
      </p>
      <form>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="faitholu@gmail.com" />
          <i>{Mail}</i>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="kaizen.brand" />
          <i>{User}</i>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea rows="10" placeholder="Say something" id="message" />
        </div>
        <div className="d-flex justify-content-center">
          <button>Send</button>
        </div>
      </form>
      <div className="mt-5 ">
        <h4 className="text-center">Get in Touch</h4>
        <div className={classes.links}>
          <a href="mailto:travaye@gmail.com">
            <div>
              <i>{EmailLink}</i>
              <p>
                Email Address <br />
                <i> travaye@gmail.com</i>
              </p>
            </div>
          </a>
          <a href="tel:+234567823433">
            <div>
              <i>{PhoneLink}</i>
              <p>
                Contact <br />
                <i> +234 5678-234-33</i>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-center">Freuently Asked Questions (FAQs)</h4>
        <p>
          Here’s a few answers to some questions you might have in mind. If your
          questions are different from this, feel free to contact us using the
          form above.
        </p>
        <div className="d-flex flex-column align-items-center">
          {faqs.map(({ question, answer }, i) => {
            return <FAQs key={i} question={question} answer={answer} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;

const faqs = [
  {
    question: "What is Travaye about?",
    answer:
      "Travaye is a platform built to help Nigerians live their best life without worrying about Sapa. It helps you find the best places to hangout on your budget without stress.",
  },
  {
    question: "Are my Generated Favicons Free for Download?",
    answer:
      "Yes, the favicon generator is free. After you create your favicon, simply click the download button. Then you can save it on your computer for free and integrate it into your website. The download comes with all required instructions and HTML codes, as well as",
  },
  {
    question: "How do i add a Favicon to my Website?",
    answer:
      "Prepare a square dimensioned image in .png or .ico format for your website logo.  Rename the .png or .ico image to favicon. Access your public_html folder by heading over to your Panel, then File Manager -> Go To File Manager  Upload the favicon.png or .ico file into your public_html folder. Reload your website, and you’ll see the favicon.",
  },
  {
    question: "Is there a list of Previously Generated Favicons I can revisit?",
    answer:
      "Yes. All your generated and downloaded favicons are stored for your revisit. Kindly head over to your profile page to view your favicons generation history.",
  },
];
