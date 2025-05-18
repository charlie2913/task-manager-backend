const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/config'); 
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const { authenticateToken } = require('./middleware/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

// Conectar a DB y levantar el servidor
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
