import Settings from '../config.js';
import RenderLib from "../../RenderLib"
import { trace } from "../utils/functions.js"
import { EntityArmorStand, registerWhen } from "../../BloomCore/utils/Utils"

let runicEnabled = false;
let runics = [];

register("tick", () => {
    if (Settings().runicfinder) {
        runicEnabled = true;
    } else {
        runicEnabled = false;
    }
    runics = World.getAllEntitiesOfType(EntityArmorStand).filter(stand => stand.getName().includes("§c§5"));
});

registerWhen(register("renderWorld", () => {
    if (!runics.length) return; // if there's nothing in the array, return
    
    runics.forEach(runic => {RenderLib.drawEspBox(runic.getRenderX(), runic.getRenderY() - 2, runic.getRenderZ(), 0.8, 2, 0.5, 0, 1, 1, 1, false);
    trace(runic.getRenderX(),runic.getRenderY() - 1, runic.getRenderZ(), 0.5, 0, 1, 1, 2);
    });
}), () => runicEnabled);
