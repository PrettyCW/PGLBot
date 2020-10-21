function delayed(events, delay, channel) {
  for (let i = 0; i < events.length; ++i) {
    setTimeout(() => {
      channel.send(events[i])
    }, delay * (i + 1))
  }
}

exports.delayed = delayed
