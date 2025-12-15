const express = require('express');
const app = express();

const { verificarToken } = require('./middlewares/verificarToken');

// ruta raiz
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

app.listen(3000, console.log(`Server arrancado en http://localhost:3000`));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
const { login } = require('./controllers/auth')

app.get("/equipos", obtenerEquipos)
app.post("/equipos", verificarToken,agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores",verificarToken, registrarJugador)


app.post('/login', login)

module.exports = app