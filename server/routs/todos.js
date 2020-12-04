const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const mongoose = require('mongoose'),
      Todo = require('../db.js');

//Routes for '/api/'

router.post('/todos', function (req, res) {
    const newTodo = new Todo({
        id: uuid.v4(),
        title: req.body.title
    });

    newTodo.save(function (err, newTodo) {
        if (err) return console.error(err);
        res.send('Posted Todo: ' + req.body.title)
    })
});

router.get('/todos', function (req, res) {

    Todo.find({}, {'title': 1, 'id': 1, '_id':0},function (err, allTodos) {
        if (err) return console.error(err);
        res.send(allTodos)
    })
});

router.delete('/todos/:id', function (req, res) {

    Todo.find({id: req.params.id}).remove(function (err, obj) {
        if (err) return console.error(err);
        else {
            if (obj.result.n === 0) {
                res.send('id not found')
            } else {
                res.send('todo deleted')
            }
        }
    })
});

router.put('/todos/:id', function (req, res) {

    Todo.update({id: req.params.id},    //condition
                {title: req.body.title},//info updated
                function (err, obj) {
        if (err) return console.error(err);
        else {
            if (obj.n === 0) {
                res.send('id not found')
            } else {
                res.send('todo updated')
            }
        }
    })
});

module.exports = router;
