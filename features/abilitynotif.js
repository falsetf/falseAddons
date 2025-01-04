import Settings from "../config.js"
import { getTabList } from '../../BloomCore/utils/Utils.js';

const allowed_islands = [
    "Crystal Hollows",
    "Dwarven Mines",
    "The End",
];

register("chat", (ability) => {
    if(!Settings().abilitynotif) return;
    
    let on_allowed_island = false;
    getTabList(true).forEach((line) => {
        if (allowed_islands.some(island => line.includes(island))){
            on_allowed_island = true;
        }
    });
    
    if (!on_allowed_island) return;

    switch (ability) {
        case "Mining Speed Boost":
        case "Pickobulus":
        case "Gemstone Infusion":
        case "Anomalous Desire":
        case "Maniac Miner":
        case "Sheer Force":
            Client.showTitle(`&6${ability}`, "", 0, 30, 0);
            World.playSound("random.orb", 2, 1);
            break;
        default:
            return;
    }
}).setChatCriteria("${ability} is now available!").setContains();