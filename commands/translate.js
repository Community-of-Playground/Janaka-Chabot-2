const translate = require('@vitalets/google-translate-api');

module.exports = async function (sock, sender, message) {
    // Ambil kalimat yang akan diterjemahkan setelah perintah '/translate'
    const textToTranslate = message.slice(10).trim(); // Menghapus '/translate ' dari awal pesan

    if (!textToTranslate) {
        await sock.sendMessage(sender, { text: 'Please provide a sentence to translate.' });
        return;
    }

    try {
        // Melakukan penerjemahan
        const res = await translate(textToTranslate, { from: 'en', to: 'id' });

        // Mengirimkan hasil terjemahan
        await sock.sendMessage(sender, { text: `Translated: ${res.text}` });
    } catch (error) {
        console.error(error);
        await sock.sendMessage(sender, { text: 'Sorry, I couldn\'t translate your text at the moment.' });
    }
};
