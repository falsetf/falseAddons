import Settings from '../config.js';
import { getIGN } from '../utils/functions.js';
import { registerCommand } from '../utils/functions.js';
import { simulatePartyChat } from '../utils/PartyUtils.js';

let warpPlayer = '';
let otherMembers = [];
let lastAttemptTime = 0;
let isWaitingForJoin = false;
let isWaitingForWarp = false;
let partyMembersList = new Set(); 
let partyLeader = ''; 

register("command", (player) => {
    if (!Settings().warponly) return;
    if (!player) {
        ChatLib.chat('&b[&fFA&b] &cPlease specify a player to warp!');
        return;
    }

    initializeWarpOnly(player);
}).setName("warponly").setAliases(["wo"]);

register("chat", (unfilteredMessage) => {
    if (!Settings().warponly) return;
    
    // Extract the actual player name before "!warponly"
    let player = unfilteredMessage.split('!warponly')[0].trim();
    
    initializeWarpOnly(player);

}).setChatCriteria("Party > ${unfilteredMessage}: !warponly").setContains();

function initializeWarpOnly(player) {
    warpPlayer = player.toLowerCase();
    otherMembers = [];
    partyMembersList.clear();
    partyLeader = '';
    lastAttemptTime = Date.now();
    isWaitingForJoin = false;
    isWaitingForWarp = false;

    // get party list
    registerCommand(() => {
        ChatLib.chat('&b[&fFA&b] &fGetting party list');
        ChatLib.command('party list');
        simulatePartyChat(); // debug command
    }, 500);

    // disband party
    registerCommand(() => {
        ChatLib.chat('&b[&fFA&b] &fDisbanding party');
        ChatLib.command('party disband');
    }, 1000);

    // party the warp player
    registerCommand(() => {
        ChatLib.chat(`&b[&fFA&b] &fPartying ${warpPlayer} for warp`);
        ChatLib.command(`party ${warpPlayer}`);
        isWaitingForJoin = true;
    }, 1500);
}

register("chat", (leader, e) => {
    if (Date.now() - lastAttemptTime > 2000) return;
    partyLeader = getIGN(leader);
}).setChatCriteria("Party Leader: ${leader}");

register("chat", (mode, names, e) => {
    if (Date.now() - lastAttemptTime > 2000) return;
    
    // collect names from both Moderators and Members sections
    let membsArr = names.split(" ● ").filter(name => name);
    membsArr.forEach(member => {
        let ign = getIGN(member);
        if (ign) {
            partyMembersList.add(ign);
        }
    });

    // if this is the Members section, we know we've received all party info
    if (mode === "Members") {
        // filter out warp player and party leader
        otherMembers = Array.from(partyMembersList).filter(member => 
            member.toLowerCase() !== warpPlayer && 
            member.toLowerCase() !== partyLeader.toLowerCase()
        );
    }
}).setChatCriteria("Party ${mode}: ${names}");

register("chat", (player, e) => {
    if (!isWaitingForJoin) return;
    if (player.toLowerCase() !== warpPlayer) return;

    isWaitingForJoin = false;
    isWaitingForWarp = true;
    
    registerCommand(() => {
        ChatLib.chat('&b[&fFA&b] &fWarping party');
        ChatLib.command('party warp');
    }, 500);
}).setChatCriteria("${player} joined the party.");

register("chat", (e) => {
    if (!isWaitingForWarp) return;
    isWaitingForWarp = false;

    // party everyone else 
    otherMembers.forEach((player, index) => {
        registerCommand(() => {
            ChatLib.chat(`&b[&fFA&b] &fPartying ${player}`);
            ChatLib.command(`party ${player}`);
            
            // reset states
            if (index === otherMembers.length - 1) {
                warpPlayer = '';
                otherMembers = [];
                partyMembersList.clear();
                partyLeader = '';
                lastAttemptTime = 0;
            }
        }, index * 500);
    });
}).setChatCriteria("warped to your server").setContains();