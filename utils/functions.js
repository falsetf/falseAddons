const commandQueue = [];
let lastExecutionTime = 0;

register("tick", () => {
    const currentTime = Date.now();
    const COMMAND_DELAY = 500;

    if (currentTime - lastExecutionTime >= COMMAND_DELAY && commandQueue.length > 0) {
        const executeNextCommand = commandQueue.shift();
        executeNextCommand();
        lastExecutionTime = currentTime;
    }
});

export function registerCommand(command) {
    commandQueue.push(command);
}

export function getIGN(player) {
    // early return if input is empty or null
    if (!player) return "";

    // remove rank prefixes and suffixes
    const cleanedIgn = player
        .replace(/^(\[.*?\]\s*)?/, '')  // remove rank prefix
        .replace(/[^0-9A-Za-z_]+$/, "");  // remove non-IGN suffixes

    // extract the last valid IGN segment
    const ignMatch = cleanedIgn.match(/[0-9A-Za-z_]+$/);

    if (ignMatch) {
        return ignMatch[0];
    }

    // error if no valid IGN could be extracted
    setTimeout(() => {
        ChatLib.chat(`error at IGN, input = "${player}"`);
    }, 50);

    return "";
}
