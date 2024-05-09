import CardList from "../CardLIst";
import Star from "../../../assets/Perks/star.png";
import Vector from "../../../assets/Perks/vector.png";
import Vector1 from "../../../assets/Perks/vector1.png";
import classes from "../../../Pages/Home/Home.module.css";

const PerkData = [
  { id: 1, desc: "Registered Users", data: "200K +" },
  { id: 2, desc: "Registered Businesses", data: "300 +" },
  { id: 3, desc: "Average Ratings", data: `4.6*` },
];

const Perks = () => {
  return (
    <CardList>
      {PerkData.map(({ id, desc, data }) => {
        return (
          <li key={id}>
            <span className={classes.sapa}>
              <h3 className="text-[#E9A309] text-[44px] font-[800] text-center">
                {data}
              </h3>
            </span>
            <p className="text-[18px] font-[700] text-white">{desc}</p>
          </li>
        );
      })}
    </CardList>
  );
};
export default Perks;
