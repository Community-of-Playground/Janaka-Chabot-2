const fs = require('fs');
const path = require('path');

// Function to load all commands dynamically from the 'commands' folder
const loadCommands = () => {
    const commands = {};
    const commandsDir = path.join(__dirname, '../commands');

    // Membaca semua file di dalam folder 'commands'
    const files = fs.readdirSync(commandsDir);

    // Memuat setiap file command
    files.forEach(file => {
        if (file.endsWith('.js')) {
            const commandName = path.basename(file, '.js');
            commands[commandName] = require(path.join(commandsDir, file));
        }
    });

    return commands;
};

// Function to handle commands based on the message
const handleCommand = async (sock, message, sender) => {
    const commands = loadCommands(); // Memuat perintah yang ada
    const command = message.split(' ')[0].slice(1); // Mengambil perintah tanpa '/'

    if (commands[command]) {
        await commands[command](sock, sender, message); // Menjalankan perintah yang sesuai
    } else {
        await commands.unknown(sock, sender); // Jika tidak ada perintah yang cocok
    }
};

module.exports = { handleCommand };