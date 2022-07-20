import fastify from 'fastify'
import bot from './bot.js'

const app = fastify()

app.route({
  method: 'POST',
  url: '/',
  handler: async (request, reply) => {
    bot.processUpdate(request.body as { update_id: number })
    reply.send('')
  }
})

app.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Domainator bot started on ${address}`)
})
