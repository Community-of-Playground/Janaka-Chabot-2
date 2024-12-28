const { makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const { handleCommand } = require('./utils/commandHandler')

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if (shouldReconnect) {
                connectToWhatsApp()
            }
        } else if (connection === 'open') {
            console.log('opened connection')
        }
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async m => {
        if (m.messages[0].key.fromMe) return

        const message = m.messages[0].message.conversation
        const sender = m.messages[0].key.remoteJid

        // Menangani perintah menggunakan handler
        if (message) {
            await handleCommand(sock, message, sender)
        }
    })
}

connectToWhatsApp()
