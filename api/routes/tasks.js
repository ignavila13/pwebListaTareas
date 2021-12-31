const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

//obtengo todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json({message: err});
    }
})

//obtengo una tarea por id
router.get('/:idTask', async (req, res) => {
    try {
        const task = await Task.findById(req.params.idTask)
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({message: err});
    }
})

//genero una nueva tarea
router.post('/', async (req, res) => {
    console.log(req.body.task)
    console.log(req.body.state)
    console.log(req.body.geolocation)
    const task = new Task({
        task: req.body.task,
        state: req.body.state,
        geo: req.body.geolocation
    })
    
    try {
        const newTask = await task.save();
        res.status(200).json(newTask);

    } catch (err) {
        res.status(404).json({message: err});
    }
})

//elimino una tarea mediante id
router.delete('/:idTask', async (req, res) => {
    try {
        const delTask = await Task.deleteOne({_id: req.params.idTask});
        res.status(200).json(delTask);
    } catch (err) {
        res.status(404).json({message: err});
    }
})

//actualizar tarea
router.patch('/:idTask', async (req, res) => {
    try {
        const updTask = await Task.updateOne(
            {_id: req.params.idTask},
            {$set: {state: req.body.state}}
            );
            res.status(200).json(updTask);
    } catch (err) {
        res.status(404).json({message: err});        
    }
})

module.exports = router