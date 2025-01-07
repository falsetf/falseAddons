import Settings from '../config.js';
import Promise from '../../PromiseV2';
import { getScoreboard, stripRank } from "../../BloomCore/utils/Utils.js";

let in_contest = false;
let currentPromise = null;
let communication_method = null;
const keybind = new KeyBind("keybind", Keyboard.KEY_K);

register("chat", (message) => {
    if (!Settings().contestnotifier) return;

    let name = null;

    switch (true) {
        case message.startsWith("From "):
            communication_method = "r";
            name = stripRank(message.substring(5, message.indexOf(":")).trim());
            break;
        case message.startsWith("Party > ") && message.toLowerCase.includes(Player.getName().toLowerCase):
            communication_method = "pc";
            name = stripRank(message.substring(7, message.indexOf(":")).trim());
            break;
        case message.startsWith("Guild > ") && message.toLowerCase.includes(Player.getName().toLowerCase):
            communication_method = "gc";
            name = stripRank(message.substring(7, message.indexOf(":")).trim());
            break;
        case message.startsWith("Officer > ") && message.toLowerCase.includes(Player.getName().toLowerCase):
            communication_method = "oc";
            name = stripRank(message.substring(9, message.indexOf(":")).trim());
            break;
        case message.startsWith("Co-op > ") && message.toLowerCase.includes(Player.getName().toLowerCase):
            communication_method = "cc";
            name = stripRank(message.substring(7, message.indexOf(":")).trim());
            break;
        default:
            return;
    }

    if (name === Player.getName()) return;

    in_contest = false; 
    
    getScoreboard(false).forEach((line) => {
        if (line.includes("Jacob's Contest")) {
            in_contest = true;
        }
    });
    
    if (!in_contest) return;
    if (currentPromise) {
        keybind.unregisterKeyPress();
    }
    
    Client.showTitle("", `&cPress K to automatically respond to ${name}!`, 0, 100, 0);

    currentPromise = new Promise((resolve) => {
        let timeoutId = null;

        keybind.registerKeyPress(() => {
            ChatLib.command(`${communication_method} Hey! I am currently participating in a Jacob's Farming Contest and cannot reply right now. I'll get back to you as soon as the contest ends!`);
            Client.showTitle("", "", 0, 1, 0); // clear title once keybind pressed
            if (timeoutId) clearTimeout(timeoutId);
            resolve('pressed');
        });
        
        timeoutId = setTimeout(() => {
            Client.showTitle("", "", 0, 1, 0); // clear title once keybind pressed, shouldnt be needed because 100 ticks is 5 seconds, which is the timeout, but, just in case
            resolve('timeout');
        }, 5000);
    })
    .then((result) => {
        keybind.unregisterKeyPress();
        currentPromise = null;
        return result;
    })
    .catch((error) => {
        // shouldn't ever happen, but just in case, might as well give the user something to report
        ChatLib.chat("&cError in keybind handler: " + error);
        keybind.unregisterKeyPress();
        currentPromise = null;
    });
}).setChatCriteria("${message}");