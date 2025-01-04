import Settings from '../config.js';
import { registerCommand } from '../utils/functions.js';
import { stripRank } from "../../BloomCore/utils/Utils.js";

register("chat", (name, message) => {
    if (!Settings().skyblocker) return;
    if (message.includes("[Skyblocker]")) {
        let newName = stripRank(name);
        registerCommand(() => {
            ChatLib.command('party kick ' + newName);
        }, 500);
        registerCommand(() => {
            ChatLib.command('block add ' + newName);
        }, 500);
    };
}).setChatCriteria("Party > ${name}: ${message}")