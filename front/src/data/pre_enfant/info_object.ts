import ecran from "../../../src/assets/img/materiel_info/ecran.png"
import clavier from "../../../src/assets/img/materiel_info/clavier.png"
import portable from "../../../src/assets/img/materiel_info/portable.png"
import souris from "../../../src/assets/img/materiel_info/souris.png"
// import casque from "../../../src/assets/img/materiel_info/casque.jpg"
import type { ObjectType } from "../../types/ObjectType";

export const objects: ObjectType[] = [
    {
        id: 1,
        name: "clavier",
        image: clavier
    },
    {
        id: 2,
        name: "portable",
        image: portable
    },
    {
        id: 3,
        name: "souris",
        image: souris
    },
    {
        id: 4,
        name: "ecran",
        image: ecran
    },
    // {
    //     id: 5,
    //     name: "casque",
    //     image: casque
    // },

]