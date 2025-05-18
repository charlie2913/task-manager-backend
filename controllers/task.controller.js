const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    const task = await Task.create({
      user: req.userId,
      title,
      description,
      dueDate,
      status, 
    });

    res.status(201).json({ message: 'Tarea creada exitosamente', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = { user: req.userId };

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    Object.assign(task, req.body); 
    await task.save();

    res.json({ message: 'Tarea actualizada', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    console.log(' Buscando tarea con:', {
      _id: req.params.id,
      user: req.userId
    });

    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      console.log(' Tarea no encontrada o no pertenece al usuario');
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    await task.deleteOne();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar tarea:', err.message);
    res.status(500).json({ error: err.message });
  }
};

