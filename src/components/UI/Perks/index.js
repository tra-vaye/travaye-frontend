import CardList from "../CardLIst";
import Star from "../../../assets/Perks/star.png";
import Vector from "../../../assets/Perks/vector.png";
import Vector1 from "../../../assets/Perks/vector1.png";

const PerkData = [
  { id: 1, desc: "Over 200K Registered Users", img: Star },
  { id: 2, desc: "500+ Registered Businesses", img: Vector },
  { id: 3, desc: "4.6* Average User Rating", img: Vector1 },
];

const Perks = () => {
  return (
    <CardList>
      {PerkData.map(({ id, desc, img }) => {
        return (
          <li key={id}>
            <img src={img} alt="vector" className="img-fluid" />
            <p>{desc}</p>
          </li>
        );
      })}
    </CardList>
  );
};
export default Perks;
