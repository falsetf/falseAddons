import Settings from "../config.js"
import { getIGN } from '../utils/functions.js';

register("chat", (player, message, e) => {
    formattedPlayer = getIGN(player);
    if (!Settings().dmparty) return;
    if (Settings().blacklistActive){
        if (Settings().dmpartyblacklist.includes(formattedPlayer)){
            ChatLib.chat(`&b[&fFA&b] &c${formattedPlayer} is blacklisted!`);
            return;
        }
    }
    if (message === "!p"){
        ChatLib.command(`party ${formattedPlayer}`);
        ChatLib.chat(`&b[&fFA&b] &fPartying ${formattedPlayer}`);
    } else {
        return;
    }
}).setChatCriteria("From ${player}: ${message}");
