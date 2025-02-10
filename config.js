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
        category: "General",
        configName: "runicfinder",
        title: "Runic Finder",
        description: "finds runic mobs around you, primarily for the Runebook talisman",
    })
    .addSwitch({
        category: "Dungeons",
        configName: "m3ff",
        title: "M3 Fire Freeze Notification",
        description: "tells you when to use your fire freeze staff",
    }) // kinda crazy i have to add this, only other option is to use coleweight or soopy
    .addSwitch({
        category: "Dungeons",
        configName: "skyblocker",
        title: "skyblocker hater",
        description: "automatically blocks and kicks skyblocker users when their shitty little mod posts in chat",
    })
    .addSwitch({
        category: "Dungeons",
        configName: "lividsolver",
        title: "Livid Solver",
        description: "finds the correct livid, draws a box around him, and draws a line from your crosshair to livid"
    })
    .addSwitch({
        category: "Dungeons",
        configName: "deathsound",
        title: "Death Sound",
        description: "plays a quiet sound when anyone dies in dungeons, makes it easier to notice deaths",
    })
    .addSwitch({
        category: "Kuudra",
        configName: "autopearl",
        title: "Auto GFS &c[UAYOR]",
        description: "automatically refill your pearls at the end of the fight",
    })
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
        description: "players blacklisted from using !p (use commas to separate names)",
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
    .addSwitch({
        category: "Farming",
        configName: "contestnotifier",
        title: "Contest Notifier",
        description: "allows you to automatically respond to players who message you during a Jacob's Farming Contest",
    })

const mySettings = new Settings("falseAddons", config, "data/ColorScheme.json").setCommand("falseaddons", ["fa", "false", "falseaddons"])
export default () => mySettings.settings
