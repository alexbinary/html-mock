
let makeMockHtmlElement = require('./html.element.mock')

function makeMockVideoElement () {
  let instance = makeMockHtmlElement()
  Object.assign(instance, {
    paused: false,
    currentTime: 0,
    play: function () {
      this.paused = false
    },
    pause: function () {
      this.paused = true
    }
  })
  return instance
}

module.exports = makeMockVideoElement
