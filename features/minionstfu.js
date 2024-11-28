import Settings from "../config.js"
import { getTabList } from "../../BloomCore/utils/Utils.js";

register("soundPlay", (position, name, volume, pitch, name2, event) => {
    if (!Settings().minionstfu) return;
    getTabList(true).forEach((line) => {
        if (line.includes("Private Island")){
            if (name == "mob.slime.big" || name == "mob.slime.small" || name == "mob.slime.attack"){
                cancel(event);
            }
        }
    });
}).setCriteria("mob.slime.big", "mob.slime.small", "mob.slime.attack") // this is possibly incredibly inefficient and probably sucks

