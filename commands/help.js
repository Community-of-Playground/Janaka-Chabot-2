// /bot/commands/hello.js
module.exports = async function (sock, sender) {
    const helpText = `
Here are the commands you can use:
/hello - Greet the bot
/help - List available commands
    `;
    await sock.sendMessage(sender, { text: helpText });
};