import Settings from "../config.js"

let pearlSlot = 0;
let neededPearls = 0;

// this function will let a random time pass between 200 and 400 ms before gfsing the pearls, to avoid any detection 
// this is probably not needed because i can't think of a reason why hypixel would or could detect this
// but better safe than sorry
function rng_gfs() {
    rng = Math.floor(Math.random() * 200) + 200;
    setTimeout(() => {
        ChatLib.command(`gfs ender_pearl ${neededPearls}`);
    }, rng);
}

register("chat", () => {
    if (!Settings().autopearl) return;

    // reset states
    pearlSlot = 0;
    neededPearls = 0;

    for (let i = 0; i < 9; i++) {
        try {
            if (Player.getInventory().getStackInSlot(i).toString().split(".")[1].split("@")[0] === "enderPearl") {
                pearlSlot = i;
                neededPearls = 16 - parseInt(Player.getInventory().getStackInSlot(pearlSlot).toString().split("x")[0]);
            }
        } catch (TypeError) {
            neededPearls = 16; // if typeerror, then slot = "null", so empty 
            break;
        }
    }

    if (neededPearls) rng_gfs();
}).setChatCriteria("KUUDRA DOWN!").setContains(); // todo: make more secure