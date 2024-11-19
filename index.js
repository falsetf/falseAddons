import Settings from "./config"
import "./features/m3ff.js"
import "./features/politekick.js"
import "./features/warponly.js"
import "./features/guitest.js"
import "./features/glacitetunnelnotification.js"
import "./features/abilitynotif.js"
import "./features/dmparty.js"

register ("command", () => ChatLib.command("joininstance CATACOMBS_ENTRANCE")).setName("f0") // very important for entrance pb runs