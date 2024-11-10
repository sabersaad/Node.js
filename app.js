const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const client = new Client();

// توليد كود QR للمصادقة مع WhatsApp
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code received, scan it with your phone.');
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

client.initialize();

app.get('/api/sendText/:phone', (req, res) => {
    const phone = req.params.phone;
    const text = req.query.text;

    client.sendMessage(`${phone}@c.us`, text)
        .then(response => {
            res.send('Message sent successfully!');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to send message');
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
