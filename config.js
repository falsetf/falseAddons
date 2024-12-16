import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
const config = new DefaultConfig("falseAddons", "data/settings.json")

config
    .addSwitch({
        category: "General",
        configName: "minionstfu",
        title: "stfu",
        description: "mutes slime minions on your island",
    })
    .addSwitch({
        category: "General",
        configName: "dragonstfu",
        title: "stfu",
        description: "mutes dragons in the end",
    })
    .addSwitch({
        category: "Dungeons",
        configName: "m3ff",
        title: "M3 Fire Freeze Notification",
        description: "tells you when to use your fire freeze staff",
    }) // kinda crazy i have to add this, only other option is to use coleweight or soopy
    .addSwitch({
        category: "Party",
        configName: "politekick",
        title: "Polite Kick",
        description: "politely kicks someone from the party by repartying without the specified individual",
    })
    .addSwitch({
        category: "Party",
        configName: "warponly",
        title: "Warp Only",
        description: "warps only the specified player, then parties everyone else back",
    })
    .addSwitch({
        category: "Party",
        configName: "dmparty",
        title: "DM Party",
        description: "parties a player who sends !p in chat"
    })
    .addSwitch({
        category: "Party",
        configName: "blacklistActive",
        title: "Blacklist DM Party",
        description: "defines a list of players who you don't want to be able to use !p to automatically party",
        subcategory: "Blacklist",
    })
    .addTextInput({
        category: "Party",
        configName: "dmpartyblacklist",
        title: "Blacklisted Players",
        description: "players blacklisted from using !p",
        subcategory: "Blacklist",
        shouldShow(data){
            return data.blacklistActive
        }
    })
    .addSwitch({
        category: "Mining",
        configName: "glacitetunnelnotification",
        title: "Glacite Tunnel Notification",
        description: "notifies your party when you enter a mineshaft, also automatically runs !ptme",
    })
    .addSwitch({
        category: "Mining",
        configName: "abilitynotif",
        title: "Mining Ability Notification",
        description: "Notifies you when MSB/Pickobulus is available",
    })

const mySettings = new Settings("falseAddons", config, "data/ColorScheme.json")
.setCommand("falseaddons", ["fa", "false"])
export default () => mySettings.settings
