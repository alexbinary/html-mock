
function makeMockDocument () {
  let queryableElements = {}
  let activeQueryableElements = {}
  let instance = {
    setAllQueryableElements: function (newQueryableElements) {
      queryableElements = newQueryableElements
      this.elements = {}
      for (let i in queryableElements) {
        this.elements[i] = queryableElements[i].elements[0]
        this.elements[i + 'All'] = queryableElements[i].elements
      }
    },
    setActiveQueryableElements: function (newActiveQueryableElements) {
      activeQueryableElements = newActiveQueryableElements
    },
    querySelector: function (selector) {
      for (let i in activeQueryableElements) {
        if (activeQueryableElements[i].selectors.indexOf(selector) !== -1) {
          return activeQueryableElements[i].elements[0]
        }
      }
      return null
    },
    querySelectorAll: function (selector) {
      let matchElements = []
      for (let i in activeQueryableElements) {
        if (activeQueryableElements[i].selectors.indexOf(selector) !== -1) {
          matchElements.push(...activeQueryableElements[i].elements)
        }
      }
      return matchElements
    }
  }
  return instance
}

module.exports = makeMockDocument
