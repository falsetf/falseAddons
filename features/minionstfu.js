import Settings from "../config.js";
import { getTabList } from "../../BloomCore/utils/Utils.js";

let minionstfu = false;

const minion_noises = [ // all mob noises
    "mob.bat.death",
    "mob.bat.hurt",
    "mob.bat.idle",
    "mob.bat.loop",
    "mob.bat.takeoff",

    "mob.blaze.breathe",
    "mob.blaze.death",
    "mob.blaze.hit",

    "mob.chicken.hurt",
    "mob.chicken.plop",
    "mob.chicken.say",
    "mob.chicken.step",

    "mob.cow.hurt",
    "mob.cow.say",
    "mob.cow.step",

    "mob.creeper.death",
    "mob.creeper.say",

    "mob.enderdragon.end",
    "mob.enderdragon.growl",
    "mob.enderdragon.hit",
    "mob.enderdragon.wings",

    "mob.endermen.death",
    "mob.endermen.hit",
    "mob.endermen.idle",
    "mob.endermen.scream",
    "mob.endermen.stare",

    "mob.ghast.affectionate_scream",
    "mob.ghast.charge",
    "mob.ghast.death",
    "mob.ghast.fireball",
    "mob.ghast.moan",
    "mob.ghast.scream",

    "mob.magmacube.big",
    "mob.magmacube.jump",
    "mob.magmacube.small",

    "mob.pig.death",
    "mob.pig.say",
    "mob.pig.step",

    "mob.rabbit.hurt",
    "mob.rabbit.idle",
    "mob.rabbit.hop",
    "mob.rabbit.death",

    "mob.sheep.say",
    "mob.sheep.shear",
    "mob.sheep.step",

    "mob.skeleton.death",
    "mob.skeleton.hurt",
    "mob.skeleton.say",
    "mob.skeleton.step",

    "mob.slime.attack",
    "mob.slime.big",
    "mob.slime.small",

    "mob.spider.death",
    "mob.spider.say",
    "mob.spider.step",

    "mob.zombie.death",
    "mob.zombie.hurt",
    "mob.zombie.infect",
    "mob.zombie.metal",
    "mob.zombie.remedy",
    "mob.zombie.say",
    "mob.zombie.step",
    "mob.zombie.unfect",
    "mob.zombie.wood",
    "mob.zombie.woodbreak"
];

register("chat", ()=> {
    minionstfu = false; // reset state
    setTimeout(() => {
        getTabList(true).forEach((line) => {
            if (line.includes("Private Island")){
                minionstfu = true;
            }
        });
    }, 2000);
}).setChatCriteria("Sending to server ").setContains();

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().minionstfu || !minionstfu ) return;
    if (minion_noises.includes(name)) {
        cancel(event);
    }
});