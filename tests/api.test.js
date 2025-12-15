const request = require('supertest')
const app = require('../index')

let token = ''

describe('API FutScript', () => {

  // LOGIN
  describe('POST /login', () => {

    it('retorna un object al enviar credenciales correctas', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: '1234'
        })

      expect(response.status).toBe(200)
      expect(typeof response.body).toBe('object')
      expect(response.body.token).toBeDefined()

      token = response.body.token
    })

    it('retorna 400 al enviar credenciales incorrectas', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'adm',
          password: '0000'
        })

      expect(response.status).toBe(400)
    })

  })

  // GET EQUIPOS
  describe('GET /equipos', () => {

    it('retorna un array y status 200', async () => {
      const response = await request(app).get('/equipos')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

  })

  // POST JUGADORES
  describe('POST /equipos/:teamID/jugadores', () => {

    it('retorna 201 al registrar jugador con token válido', async () => {
      const response = await request(app)
        .post('/equipos/1/jugadores')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Jugador Test',
          position: 1
        })

      expect(response.status).toBe(201)
    })

  })

})
