import Settings from '../config.js';
import { getIGN, registerCommand } from '../utils/functions.js';

let unwantedPlayers = [];
let validMembers = [];
let lastAttemptRePartyTime = 0;

register("command", (...players) => {
    if (!Settings().politekick) return;
    unwantedPlayers = [];
    validMembers = [];

    registerCommand(() => {
        //ChatLib.chat('&b[&fFA&b] &fGetting party list');
        ChatLib.command('party list');
    }, 500);

    registerCommand(() => {
        //ChatLib.chat('&b[&fFA&b] &fDisbanding party');
        ChatLib.command('party disband');
    }, 500);

    players.forEach((player) => {
        if (player) unwantedPlayers.push(player.toLowerCase());
    });

    lastAttemptRePartyTime = Date.now();
}).setName("politekick").setAliases(["pk", "polk"]);

register("chat", (mode, names, e) => {
    
    if (Date.now() - lastAttemptRePartyTime > 1000) return; // ignore if the party list command is not triggered by politekick

    if (mode !== "Moderators" && mode !== "Members") return; // do not consider leader

    let membsArr = names.split(" ● ").filter(name => name);

    validMembers = membsArr.map(getIGN).filter(member => {
        return member && !unwantedPlayers.includes(member.toLowerCase());
    });

    validMembers.forEach((player, index) => {
        registerCommand(() => {
            //ChatLib.chat(`&b[&fFA&b] &fPartying ${player}`);
            ChatLib.command(`party ${player}`);
            
            // reset state after the last command
            if (index === validMembers.length - 1) {
                unwantedPlayers = [];
                validMembers = [];
                lastAttemptRePartyTime = 0;
            }
        }, index * 500); // 500ms delay between each party command
    });
}).setChatCriteria("Party ${mode}: ${names}");