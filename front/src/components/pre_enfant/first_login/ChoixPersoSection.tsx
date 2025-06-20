import React from "react";
import Robot_bleu from "../../../assets/img/robots/robo_bleu.png";
import Robot_rose from "../../../assets/img/robots/robo_rose.png";
import CardRobot from "../CardRobot";

type Props = {
  onChoix: (img: string) => void;
};

function ChoixPersoSection({ onChoix }: Props) {
  const robots = [Robot_bleu, Robot_rose];
  return (
    <div className="flex flex-col justify-center items-center mt-10 ">
      <h1
        data-aos="fade-right"
        data-aos-delay="400"
        className="font-monument text-2xl md:text-4xl font-bold mb-8 text-center"
      >
        Choisis ton personnage préféré <br /> pour t'accompagner !
      </h1>
      <div className="flex items-center justify-center gap-8 ">
        {robots.map((robot, index) => (
          <div key={index} onClick={() => onChoix(robot)}>
            <CardRobot image={robot}></CardRobot>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoixPersoSection;
