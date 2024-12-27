import Settings from "../config.js";
import { getTabList } from "../../BloomCore/utils/Utils.js";

let dragonstfu = false;
let eyePlaced = false;

const ender_dragon_noises = [
    "mob.enderdragon.death",
    "mob.enderdragon.end",
    "mob.enderdragon.growl",
    "mob.enderdragon.hit",
    "mob.enderdragon.wings",
    "mob.ghast.fireball" // for young dragon
]

register("chat", ()=> {
    dragonstfu = false; // reset state
    eyePlaced = false; // reset state
    setTimeout(() => {
        getTabList(true).forEach((line) => {
            if (line.includes("The End")){
                dragonstfu = true;
            }
        });
    }, 2000);
}).setChatCriteria("Sending to server ").setContains();

// detect when last summoning eye is placed
register("chat", () => {
    eyePlaced = true;
}).setChatCriteria("placed a Summoning Eye! Brace yourselves! &r&7(&r&a8&r&7/&r&a8&r&7)&r").setContains();

// detect when final blow is dealt
register("chat", () => {
    eyePlaced = false;
    dragonstfu = false;
}).setChatCriteria("dealt the final blow.").setContains();

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().dragonstfu || !dragonstfu || !eyePlaced) return;
    if (ender_dragon_noises.includes(name)) {
        cancel(event);
    }
});