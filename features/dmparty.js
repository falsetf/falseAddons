import Settings from "../config.js"
import { getIGN } from '../utils/functions.js';

function getBlacklistArray() {
    const blacklistString = Settings().dmpartyblacklist;
    if (!blacklistString) return [];
    
    // split by commas and remove any whitespace
    return blacklistString.split(',').map(name => name.trim()).filter(name => name.length > 0);
}

register("chat", (player, message, e) => {
    const formattedPlayer = getIGN(player);
    
    if (!Settings().dmparty) return;
    
    if (Settings().blacklistActive) {
        const blacklistedPlayers = getBlacklistArray();
        
        if (blacklistedPlayers.includes(formattedPlayer)) {
            ChatLib.chat(`&b[&fFA&b] &c${formattedPlayer} is blacklisted!`);
            return;
        }
    }
    
    if (message.includes("!p")) {
        ChatLib.command(`party ${formattedPlayer}`);
    }
}).setChatCriteria("From ${player}: ${message}");