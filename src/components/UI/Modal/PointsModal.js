import Modal from "./Modal";
import classes from "./PointsModal.module.css";
const PointsModal = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h3>Travaye Points</h3>
      <p className={classes.balance}>Balance: 80 Travaye Points</p>
      <article>
        Travaye Points are incentive points earned after you visit a location
        picked on Travaye and review such locations afterwards. These Points are
        incentives in that, whenever Travaye and the crew are going on any
        palnend trips, they help you serve as payment discounts on individual
        costs of the trips and if the coins are up to the individual costs, then
        you do not have to pay a dime on such trips.
        <br /> <br />
        Each Point earned is equivalent to a Naira and for every review psoted,
        you earn 100 travaye Points. We use this as a way to appreciate our
        loyal customers/clients and help you enjoy life without having to worry
        about sapa which is what we are all about!
      </article>
    </Modal>
  );
};

export default PointsModal;
