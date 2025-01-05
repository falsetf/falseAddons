import Settings from '../config.js';
import Promise from '../../PromiseV2';
import { getScoreboard, stripRank } from "../../BloomCore/utils/Utils.js";

let in_contest = false;
let currentPromise = null;
const keybind = new KeyBind("keybind", Keyboard.KEY_K);

register("chat", (name) => {
    if (!Settings().contestnotifier) return;
    const formatted_name = stripRank(name);
    in_contest = false; // reset state in case multiple messages are sent
    
    getScoreboard(false).forEach((line) => {
        if (line.includes("Jacob's Contest")) {
            in_contest = true;
        }
    });
    
    if (!in_contest) return;
    if (currentPromise) {
        keybind.unregisterKeyPress();
    }
    
    Client.showTitle("", `&cPress K to automatically respond to ${formatted_name}!`, 0, 100, 0);

    currentPromise = new Promise((resolve) => {
        let timeoutId = null;

        keybind.registerKeyPress(() => {
            ChatLib.command("msg " + formatted_name + " Hey! I am currently participating in a Jacob's Farming Contest and cannot reply right now. I'll get back to you as soon as the contest ends!");
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
}).setChatCriteria("From ${name}: ${message}");