
function makeMockDocument () {
  let queryableElements = {}
  let activeQueryableElements = []
  let instance = {
    setAllQueryableElements: function (newQueryableElements) {
      queryableElements = newQueryableElements
      this.elements = {}
      for (let i in queryableElements) {
        this.elements[i] = queryableElements[i].element
      }
    },
    setActiveQueryableElements: function (newActiveQueryableElements) {
      activeQueryableElements = newActiveQueryableElements
    },
    querySelector: function (selector) {
      for (let i in activeQueryableElements) {
        if (activeQueryableElements[i].selectors.indexOf(selector) !== -1) {
          return activeQueryableElements[i].element
        }
      }
      return null
    },
    querySelectorAll: function (selector) {
      let matchElements = []
      for (let i in activeQueryableElements) {
        if (activeQueryableElements[i].selectors.indexOf(selector) !== -1) {
          matchElements.push(activeQueryableElements[i].element)
        }
      }
      return matchElements
    }
  }
  return instance
}

module.exports = makeMockDocument
