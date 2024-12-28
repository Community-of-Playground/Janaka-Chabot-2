// /bot/commands/unknown.js
module.exports = async function (sock, sender) {
    await sock.sendMessage(sender, { text: 'Sorry, I didn\'t understand that. Type /help for a list of commands.' });
};
