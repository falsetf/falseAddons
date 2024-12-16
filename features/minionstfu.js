import Settings from "../config.js";
import { getTabList } from "../../BloomCore/utils/Utils.js";

let slimestfu = false;

register("chat", ()=> {
    slimestfu = false; // reset state
    setTimeout(() => {
        getTabList(true).forEach((line) => {
            if (line.includes("Private Island")){
                slimestfu = true;
            }
        });
    }, 2000);
}).setChatCriteria("Sending to server ").setContains();

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().minionstfu || !slimestfu ) return;
    cancel(event);
}).setCriteria("mob.slime.big") 

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().minionstfu || !slimestfu ) return;
    cancel(event);
}).setCriteria("mob.slime.small") 

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().minionstfu || !slimestfu ) return;
    cancel(event);
}).setCriteria("mob.slime.attack") 

// why cant i use setcriteria with multiple criterions? 