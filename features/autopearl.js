import Settings from "../config.js"

let playerHotbar = [];
let pearlSlot = 0;
let neededPearls = 0;
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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
    playerHotbar = [];
    pearlSlot = 0;
    neededPearls = 0;

    for (let i = 0; i < 9; i++) {
        try {
            playerHotbar.push(Player.getInventory().getStackInSlot(i).getName());
        } catch (error) {
            pearlSlot = i; // this probably sucks and will likely break when it encounters any other error other than the one im expecting. oh well! 
        }
    }

    if (playerHotbar.includes("§fEnder Pearl")) {
        pearlSlot = playerHotbar.indexOf("§fEnder Pearl");
        const stack = Player.getInventory().getStackInSlot(pearlSlot).toString();
        
        if (stack.charAt(0) === "1") {
            if (digits.includes(stack.charAt(1))) {
                if (stack.charAt(1) === "6") {
                    return; // 16 pearls, no need to refill
                } else {
                    neededPearls = 16 - parseInt(stack.charAt(0).concat(stack.charAt(1)));
                    rng_gfs();
                }
            } else {
                neededPearls = 16 - parseInt(stack.charAt(0));
                rng_gfs();
            }
        } else {
            neededPearls = 16 - parseInt(stack.charAt(0));
            rng_gfs();
        }
       
    } else if (pearlSlot !== 0){ // if the pearl slot is not 0, that means we hit the try catch block and there is "null" in the hotbar, so we need to refill 16 pearls
        neededPearls = 16;
        rng_gfs();
    } else {
        return;
    }
}).setChatCriteria("KUUDRA DOWN!").setContains(); // todo: make more secure