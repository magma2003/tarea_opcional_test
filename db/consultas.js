const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'futscript',
    port: 5432,
    allowExitOnIdle: true
})

const getTeams = async () => {
    const { rows } = await pool.query(
        'SELECT id, name FROM equipos'
    )
    return rows
}

const getPlayers = async (teamID) => {
    const { rows } = await pool.query(
        `SELECT j.name, 
                p.name AS posicion
        FROM jugadores j
        INNER JOIN posiciones p 
            ON j.position = p.id
        WHERE j.id_equipo = $1;`,
        [teamID]
    )
    return rows
}

const addTeam = async (equipo) => {
    const { name } = equipo
    await pool.query(
        'INSERT INTO equipos (name) VALUES ($1)',
        [name]
    )
}

const addPlayer = async ({ jugador, teamID }) => {
    const { name, position } = jugador
    await pool.query(
        `INSERT INTO jugadores (id_equipo, name, position)
         VALUES ($1, $2, $3)`,
        [teamID, name, position]
    )
}


module.exports = { getTeams, addTeam, getPlayers, addPlayer }