function delayed(events, delay, channel) {
  let counter = 0
  let interval = setInterval(() => {
    channel.send(events[counter])
    counter++
    if (counter >= events.length) clearInterval(interval)
  }, delay)
}

exports.delayed = delayed
