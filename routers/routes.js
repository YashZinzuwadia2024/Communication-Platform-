const router = require("express").Router();
const db = require("../models/index");

router.post("/addUser", async (req, res) => {
    try {
        const { first_name, last_name, contact_no, status } = req.body;
        const user = await db.users.create({
            first_name: first_name,
            last_name: last_name,
            contact_no: contact_no,
            status: status
        });
        await user.save();
        return res.status(200).json({ message: "User Added!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/sendMessage", async (req, res) => {
    try {
        const { type, content, user_id, chat_id, group_id } = req.body;
        if (!chat_id && !group_id) {
            const newMsg = await db.messages.create({
                type: type,
                content: content,
                user_id: user_id
            });
            const newChat = await db.chats.create({
                message_id: newMsg.id
            });
            newMsg.set({
                chat_id: newChat.id
            });
            await newMsg.save();
            await newChat.save();
            return res.status(200).json({ message: "Message sent & New Chat Created!" });
        }
        else if (chat_id && !group_id) {
            const newMsg = await db.messages.create({
                type: type,
                content: content,
                user_id: user_id,
                chat_id: chat_id
            });
            await db.chats.create({
                message_id: newMsg.id   
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
})

router.get("/getMessages/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({ message: "Provide ID!!" });
        const messages = await db.messages.findAll({
            attributes: ['user_id', 'type', 'content'],
            where: {
                user_id: id
            }
        });
        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
})

module.exports = router;