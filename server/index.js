const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User');
const Note = require('./model/Note');
const cors = require('cors'); // Importa el paquete cors

app.use(bodyParser.json()); // para peticiones application/json

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://tufrontend.com', // Reemplaza esto con la URL de tu frontend
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
  }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://carla:1234@cluster0.8rbrdg2.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('SISISI Connected to MongoDB');
    })
    .catch((error) => {
        console.error('ERROR ERROR connecting to MongoDB:', error);
    });

app.get('/', (req, res) => { // GET BASE DE DATOS DEVUELVE TODAS LAS MOTAS QUE HAY
    res.json({message: 'Estoy vivo'})
})

app.get('/api', (req, res) => { // GET BASE DE DATOS DEVUELVE TODAS LAS MOTAS QUE HAY
    res.json({message: 'Hello World'})
})

// Para Loguearse
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    const userReceived = { name, pass : password};

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne(userReceived);
        console.log(user);

        if (user) {
            // Inicio de sesión exitoso
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Credenciales inválidas
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Para postear notas en la base de datos
app.post('/api/notes', (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        text: req.body.text
    });
  
    newNote.save()
      .then((note) => res.json({ success: true, note }))
      .catch((error) => res.json({ success: false, message: error.message }));
  });

  // Para ver todas las notas
  app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }  
});

// Para borrar notas
app.delete('/api/notes/:id', async (req, res) => {  
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true, note });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const notes = [];

// Endpoint PATCH para actualizar una nota por su ID
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const updatedNote = req.body;

    try {
        const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
        res.json(note);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Ruta para obtener todos los usuarios en formato JSON
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/post', (req, res) => { /// GUARDAR NOTA EN BASE DE DATOS MONGODB
    const { name, password } = req.body // recibe un objeto con las propiedades name y password

    if (!name || !password) { // si no se envían ambas propiedades
        res.status(400).json({ message: 'Missing name or password' })
        return
    } else {
        res.json({ message: 'Success' })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
})