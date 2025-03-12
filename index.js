const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = ''; // 替换为你的 Telegram 机器人 Token
const GAME_URL = ''; // 替换为你的游戏链接

app.use(express.json());

// app.post(`/webhook`, (req, res) => {
//     const { message } = req.body;
//     if (message.text === '/start') {
//         const chatId = message.chat.id;
//         const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
//         axios.post(url, {
//             chat_id: chatId,
//             text: `点击链接开始游戏：${GAME_URL}`,
//         });
//     }
//     res.sendStatus(200);
// });


app.post(`/webhook`, (req, res) => {
    console.log("收到请求:", req.body); // 打印请求内容，方便调试

    if (!req.body || !req.body.message || !req.body.message.text) {
        console.error("错误: 接收到的请求格式不正确", req.body);
        return res.sendStatus(400); // 返回错误状态，避免服务器崩溃
    }

    const message = req.body.message;
    const chatId = message.chat.id;
    
    if (message.text === '/start') {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        axios.post(url, {
            chat_id: chatId,
            text: `点击链接开始游戏：${GAME_URL}`,
        })
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.error("发送消息时出错:", error.response ? error.response.data : error.message);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(200);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
