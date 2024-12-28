// /bot/commands/hello.js
module.exports = async function (sock, sender) {
    await sock.sendMessage(sender, { text: 'Hello! How can I assist you today?' })
}
