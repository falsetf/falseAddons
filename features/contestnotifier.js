import Settings from '../config.js';
import { getScoreboard, stripRank } from "../../BloomCore/utils/Utils.js";

let in_contest = false;
let keyBindTimeout = null;
const keybind = new KeyBind("keybind", Keyboard.KEY_K);

register("chat", (name) => {
    if (!Settings().contestnotifier) return;
    in_contest = false; // reset state in case multiple messages are sent
    getScoreboard(false).forEach((line) => {
        if (line.includes("Jacob's Contest")) {
            in_contest = true;
        }
    });

    if (!in_contest) return;
    
    if (keyBindTimeout) {
        clearTimeout(keyBindTimeout);
        keybind.unregisterKeyPress();
    }
    
    const formatted_name = stripRank(name);
    Client.showTitle("", `&cPress K to automatically respond to ${formatted_name}!`, 0, 100, 0);
    
    keybind.registerKeyPress(() => {
        ChatLib.command("msg " + formatted_name + " Hey! I am currently participating in a Jacob's Farming Contest and cannot reply right now. I'll get back to you as soon as the contest ends!");
        Client.showTitle("", "", 0, 0, 0); // clear title once keybind pressed
        keybind.unregisterKeyPress();
        clearTimeout(keyBindTimeout);
        keyBindTimeout = null;
    });
    
    keyBindTimeout = setTimeout(() => { // reset keybind after 5 seconds
        keybind.unregisterKeyPress();
        keyBindTimeout = null;
    }, 5000);
}).setChatCriteria("From ${name}: ${message}");