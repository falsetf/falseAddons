import Settings from "../config.js"

register("chat", ()=> {
    if (!Settings().m3ff) return;
    World.playSound("random.orb", 2, 1);
    Client.showTitle("&fGET READY", "", 0, 10, 0);
    setTimeout(() => {
        World.playSound("random.orb", 2, 1);
        Client.showTitle("&4FIRE FREEZE", "", 0, 20, 0);
    }, 2000);
}).setChatCriteria("[BOSS] The Professor: Even if you took my barrier down, I can still fight.").setContains();