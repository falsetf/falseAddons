import Settings from "./config"
import "./features/m3ff.js"
import "./features/politekick.js"
import "./features/warponly.js"
import "./features/glacitetunnelnotification.js"
import "./features/abilitynotif.js"
import "./features/dmparty.js"
import "./features/minionstfu.js"

register ("command", () => ChatLib.command("joininstance CATACOMBS_ENTRANCE")).setName("f0") // very important for entrance pb runs
register ("command", () => ChatLib.command("joininstance KUUDRA_NORMAL")).setName("t1")
register ("command", () => ChatLib.command("joininstance KUUDRA_HOT")).setName("t2")
register ("command", () => ChatLib.command("joininstance KUUDRA_BURNING")).setName("t3")
register ("command", () => ChatLib.command("joininstance KUUDRA_FIERY")).setName("t4")
register ("command", () => ChatLib.command("joininstance KUUDRA_INFERNAL")).setName("t5")