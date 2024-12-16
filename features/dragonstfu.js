import Settings from "../config.js";
import { getTabList } from "../../BloomCore/utils/Utils.js";

let dragonstfu = false;
let eyePlaced = false;

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
}).setChatCriteria("placed a Summoning eye! Brace yourselves! (8/8)").setContains();

// detect when final blow is dealt
register("chat", () => {
    eyePlaced = false;
    dragonstfu = false;
}).setChatCriteria("dealt the final blow").setContains();

// sounds to cancel
const dragonSounds = [
    "mob.enderdragon.end",
    "mob.enderdragon.growl", 
    "mob.enderdragon.hit", 
    "mob.enderdragon.wings"
];

dragonSounds.forEach(sound => {
    register("soundPlay", (position, name, volume, pitch, name2, event) => {
        // only cancel sound if last eye has been placed and dragonstfu is true
        if (!Settings().dragonstfu || !dragonstfu || !eyePlaced) return;
        cancel(event);
    }).setCriteria(sound);
});