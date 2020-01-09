const express = require('express');
const router = express.Router();
const mongoose = require("../dataaccess/MongoConnect");
const ChatGroup = require("../dataaccess/model/ChatGroup");
const Usuario = require("../dataaccess/model/Usuario");
const Message = require("../dataaccess/model/Message");

router.get('/:idUsuario', (req, res) => {
    let idUsuario = req.params.idUsuario;
    console.log(idUsuario);
    ChatGroup.find({ members: { $elemMatch: { member: idUsuario }} }).
    populate('members.member').
    exec(function(err, chatgroups){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(chatgroups);
    });
});

router.get('/getGroup/:idChat', (req, res) => {
    let idChat = req.params.idChat;

    ChatGroup.findOne({ _id: idChat }).
    populate('members.member').
    exec(function(err, chatgroup){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(chatgroup);
    });
});

router.post('/save', (req, res) => {
    let members = req.body.members;
    let chatgroup = new ChatGroup({
        members: members
    });
    chatgroup.save((err, chatgroup) => {
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(chatgroup.populate('members.member'));    
    });
});

router.get('/getMessages/:idGroup', (req, res) => {
    var idGroup = req.params.idGroup;

    Message.find({chatgroup: idGroup}).populate('member').exec(function(err, messages) {
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(messages);
    });
});

router.post('/saveMessage', (req, res) => {
    let messageText = req.body.text;
    let memberId = req.body.memberId;
    let chatgroupId = req.body.chatgroupId;
    
    let message = new Message({
        message: messageText,
        send: true,
        member: memberId,
        chatgroup: chatgroupId
    });

    message.save((err, message) => {
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(message);    
    });
});



module.exports = router;