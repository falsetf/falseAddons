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

export function trace (x, y, z, red, green, blue, alpha, lineWidth = 1)
{
    if(Player.isSneaking())
        drawLine(Player.getRenderX(), Player.getRenderY() + 1.54, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
    else
        drawLine(Player.getRenderX(), Player.getRenderY()+1.62, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
}

export function drawLine(x1, y1, z1, x2, y2, z2, red, green, blue, alpha, lineWidth = 1) {
    GL11.glPushMatrix();
    GL11.glPushAttrib(GL11.GL_ALL_ATTRIB_BITS);
    
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glLineWidth(lineWidth);
    
    Tessellator.begin(GL11.GL_LINES).colorize(red, green, blue, alpha);
    Tessellator.pos(x1, y1, z1);
    Tessellator.pos(x2, y2, z2);
    Tessellator.draw();
    
    GL11.glPopAttrib();
    GL11.glPopMatrix();
} // mostly from coleweight, but refactored