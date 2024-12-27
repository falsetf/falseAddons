import Settings from '../config.js';
import { getIGN, registerCommand } from '../utils/functions.js';

let warpPlayer = '';
let otherMembers = [];
let lastAttemptTime = 0;
let isWaitingForJoin = false;
let isWaitingForWarp = false;
let partyMembersList = new Set(); 
let partyLeader = ''; 
let validPartyLeader = false;

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
    
    // remove "Party > " prefix, then get the player name before the command
    let messageText = unfilteredMessage.replace(/^Party > /, '').split(': !warponly')[0].trim();
    let filteredPlayer = getIGN(messageText);
    
    initializeWarpOnly(filteredPlayer);

}).setChatCriteria("Party > ${unfilteredMessage}: !warponly").setContains();

function initializeWarpOnly(player) {
    warpPlayer = player.toLowerCase();
    otherMembers = [];
    partyMembersList.clear();
    partyLeader = '';
    lastAttemptTime = Date.now();
    isWaitingForJoin = false;
    isWaitingForWarp = false;
    validPartyLeader = false;

    // get party list
    registerCommand(() => {
        //ChatLib.chat('&b[&fFA&b] &fGetting party list');
        ChatLib.command('party list');
    }, 500);

    setTimeout(() => {
        if (validPartyLeader) {
            // disband party
            registerCommand(() => {
                //ChatLib.chat('&b[&fFA&b] &fDisbanding party');
                ChatLib.command('party disband');
            }, 1000);
    
            // party the warp player
            registerCommand(() => {
                //ChatLib.chat(`&b[&fFA&b] &fPartying ${warpPlayer} for warp`);
                ChatLib.command(`party ${warpPlayer}`);
                isWaitingForJoin = true;
            }, 1500);
        } else{
            ChatLib.chat('&b[&fFA&b] &cYou are not the party leader, cancelling warp.');
        }
    }, 1000)
}

register("chat", (leader, e) => {
    if (Date.now() - lastAttemptTime > 2000) return;
    partyLeader = getIGN(leader);

    // check to verify if the current user is the party leader
    if (partyLeader.toLowerCase() == Player.getName().toLowerCase()) {
        validPartyLeader = true;
    } else {
        validPartyLeader = false;
    } // probably not necessary, but might as well
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
    if (getIGN(player.toLowerCase()) !== warpPlayer) return;

    isWaitingForJoin = false;
    isWaitingForWarp = true;
    
    registerCommand(() => {
        //ChatLib.chat('&b[&fFA&b] &fWarping party');
        ChatLib.command('party warp');
    }, 500);
}).setChatCriteria("${player} joined the party.").setContains();

register("chat", (e) => {
    if (!isWaitingForWarp) return;
    isWaitingForWarp = false;

    // party everyone else 
    setTimeout(() => {
        otherMembers.forEach((player, index) => {
            registerCommand(() => {
                //ChatLib.chat(`&b[&fFA&b] &fPartying ${player}`);
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
    },500);
}).setChatCriteria("SkyBlock Party Warp (1 player)").setContains();