import Settings from "../config.js"
import { simulatePartyChat } from "../utils/PartyUtils";

register("command", () => {
    if(!Settings().guitest) return;
    ChatLib.chat("GUI Test Command Executed");
}).setName("guitestfalse")

register("command", () => {
    if(!Settings().guitest) return;
    simulatePartyChat();
}).setName("partychatsimulation")
