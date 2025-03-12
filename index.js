const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = ''; // 替换为你的机器人 Token
const GAME_URL = ''; // 替换为你的游戏链接

app.use(express.json());

app.post(`/webhook`, (req, res) => {
    const { message, edited_message, my_chat_member } = req.body;

    // 处理普通消息
    if (message && message.text === '/start') {
        const chatId = message.chat.id;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        axios.post(url, {
            chat_id: chatId,
            text: `点击链接开始游戏：${GAME_URL}`,
        });
    }

    // 处理编辑过的消息
    if (edited_message && edited_message.text === '/start') {
        const chatId = edited_message.chat.id;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        axios.post(url, {
            chat_id: chatId,
            text: `点击链接开始游戏：${GAME_URL}`,
        });
    }

    // 处理用户对机器人的操作（例如踢出或重新加入）
    if (my_chat_member) {
        const chatId = my_chat_member.chat.id;
        const status = my_chat_member.new_chat_member.status;
        if (status === 'kicked') {
            console.log(`用户 ${chatId} 踢出了机器人。`);
        } else if (status === 'member') {
            console.log(`用户 ${chatId} 重新加入了机器人。`);
        }
    }

    // 返回成功响应
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});