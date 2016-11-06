
let makeMockHtmlElement = require('./html.element.mock')

function makeMockVideoElement () {
  let element = makeMockHtmlElement()
  Object.assign(element, {
    paused: false,
    currentTime: 0,
    play: function () {
      this.paused = false
    },
    pause: function () {
      this.paused = true
    }
  })
  return element
}

module.exports = makeMockVideoElement
