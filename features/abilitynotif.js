import Settings from "../config.js"

register("chat", (ability) => {
    if(!Settings().abilitynotif) return;
    switch (ability) {
        case "Mining Speed Boost":
            Client.showTitle("&6Mining Speed Boost", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        case "Pickobulus":
            Client.showTitle("&6Pickobulus", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        case "Gemstone Infusion": 
            Client.showTitle("&6Gemstone Infusion", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        case "Anomalous Desire":
            Client.showTitle("&6Anomalous Desire", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        case "Maniac Miner":
            Client.showTitle("&6Maniac Miner", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        case "Sheer Force":
            Client.showTitle("&6Sheer Force", "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        default:
            return;
    }
}).setChatCriteria("${ability} is now available!").setContains();