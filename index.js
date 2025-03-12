require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 读取环境变量
const BOT_TOKEN = process.env.BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

console.log("🔍 服务器启动时读取的环境变量：");
console.log("BOT_TOKEN:", BOT_TOKEN ? "已加载 ✅" : "未定义 ❌");
console.log("GAME_URL:", GAME_URL ? GAME_URL : "未定义 ❌");

if (!BOT_TOKEN) {
    console.error("❌ 错误: BOT_TOKEN 未定义，请检查环境变量！");
    process.exit(1);
}

app.use(express.json());

// ✅ 处理 Telegram Webhook
app.post('/webhook', async (req, res) => {
    console.log("📩 收到 Telegram 消息:", req.body);

    if (!req.body || !req.body.message || !req.body.message.text) {
        console.error("❌ 错误: 收到的请求格式不正确", req.body);
        return res.sendStatus(400);
    }

    const message = req.body.message;
    const chatId = message.chat.id;

    if (message.text === '/start') {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        console.log(`🛠️ 正在向 Telegram 发送消息: ${url}`);

        try {
            const response = await axios.post(url, {
                chat_id: chatId,
                text: `🎮 点击这里开始游戏：${GAME_URL}`,
            });

            console.log("✅ 发送成功:", response.data);
            res.sendStatus(200);
        } catch (error) {
            console.error("❌ 发送消息时出错:", error.response ? error.response.data : error.message);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(200);
    }
});

// ✅ 监听 `/`，避免 Vercel 404 错误
app.get('/', (req, res) => {
    res.send("🚀 Telegram Bot Server is running!");
});

// ✅ 启动服务器
app.listen(PORT, () => {
    console.log(`✅ 服务器运行在端口 ${PORT}`);
});
