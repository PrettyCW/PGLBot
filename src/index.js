const game = require('./game')
const fs = require('fs')
const Discord = require('discord.js')
const path = require('path')
const Team = game.Team
const Player = game.Player

const client = new Discord.Client()
const prefix = '!'
const defaultDelay = 2000

client.on('ready', () => {
  console.log('Bot intialized.')
})

client.on('message', (message) => {
  // Ignore messages that don't start with the prefix or are sent by the bot
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase()

  if (command == 'sim') {
    if (args[0] == undefined) {
      args[0] = defaultDelay
    }

    let t1 = new Team('Ghost Gaming', 'GG', [
      new Player('AlphaKep', 50, 0),
      new Player('Gimmick', 60, 1),
      new Player('SquishyMuffinz', 70, 2),
    ])
    let t2 = new Team('Echo Fox', 'FOX', [
      new Player('Andy', 50, 0),
      new Player('hec', 60, 0),
      new Player('ClayX', 71, 0),
    ])

    let events = game.simGame(t1, t2)
    for (let i = 0; i < events.length; ++i) {
      setTimeout(() => {
        message.channel.send(events[i])
      }, args[0] * (i + 1))
    }
  }
})

fs.readFile(path.join(__dirname, '..', 'token.txt'), (err, data) => {
  if (err) return console.log(err)
  client.login(data.toString())
})
