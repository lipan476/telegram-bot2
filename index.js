const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = ''; // 替换为你的 Telegram 机器人 Token
const GAME_URL = ''; // 替换为你的游戏链接

app.use(express.json());

app.post(`/webhook`, (req, res) => {
    const { message } = req.body;
    if (message.text === '/start') {
        const chatId = message.chat.id;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        axios.post(url, {
            chat_id: chatId,
            text: `点击链接开始游戏：${GAME_URL}`,
        });
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
