import Settings from "../config.js"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

register("chat", (name, killer) => {
    if (!Settings().deathsound || !Dungeon.inDungeon) return;
    World.playSound("note.bass", 6, 0.5)
}).setChatCriteria(" ☠ ${name} was killed by ${killer} and became a ghost.")

register("chat", (killer) => {
    if (!Settings().deathsound || !Dungeon.inDungeon) return;
    World.playSound("note.bass", 6, 0.5)
}).setChatCriteria(" ☠ You were killed by ${killer} and became a ghost.")
