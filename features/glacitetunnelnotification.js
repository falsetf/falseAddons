import Settings from "../config.js"

register("chat", () => {
    if(!Settings().glacitetunnelnotification) return;
    setTimeout(() => {ChatLib.command("pc !ptme");}, 1000);
    ChatLib.command("pc Entering mineshaft!");
}).setChatCriteria('${getName} entered Glacite Mineshafts!').setContains();

register("chat", () => {
    if(!Settings().glacitetunnelnotification) return;
    ChatLib.command("pc Spawned mineshaft!");
}).setChatCriteria('&r&b&lMINESHAFT! &r&7A Mineshaft portal spawned nearby!&r').setContains();