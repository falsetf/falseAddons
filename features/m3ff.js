import Settings from "../config.js"

register("chat", ()=> {
    if (!Settings().m3ff) return;
    setTimeout(() => {
        World.playSound("random.orb", 2, 1);
        Client.showTitle("&44", "", 0, 10, 0);
        setTimeout(() => {
            World.playSound("random.orb", 2, 1);
            Client.showTitle("&43", "", 0, 10, 0);
            setTimeout(() => {
                World.playSound("random.orb", 2, 1);
                Client.showTitle("&42", "", 0, 10, 0);
                setTimeout(() => {
                    World.playSound("random.orb", 2, 1);
                    Client.showTitle("&41", "", 0, 10, 0);
                    setTimeout(() => {
                        World.playSound("random.anvil_land", 2, 1);
                        Client.showTitle("&fFIRE FREEZE", "", 0, 20, 0);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
    
}).setChatCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?").setContains();