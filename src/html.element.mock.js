
function makeMockHtmlElement () {
  let eventListeners = {}
  let instance = {
    addEventListener: function (eventName, value) {
      if (!eventListeners[eventName]) {
        eventListeners[eventName] = []
      }
      eventListeners[eventName].push(value)
    },
    dispatchEvent: function (eventName) {
      for (let i in eventListeners[eventName]) {
        eventListeners[eventName][i]()
      }
    },
    isEventListener: function (eventName, value) {
      return Boolean(eventListeners[eventName] && eventListeners[eventName].indexOf(value) !== -1)
    },
    click: function () {
      this._clickCount += 1
    },
    innerHTML: '',
    value: '',
    disabled: false,
    _clickCount: 0
  }
  return instance
}

module.exports = makeMockHtmlElement
