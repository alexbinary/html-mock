
let expect = require('chai').expect

let makeMockDocument = require('./../src/html.document.mock')
let makeMockHtmlElement = require('./../src/html.element.mock')

let queryableElements = {
  testElement: {
    selectors: [
      'test-element',
      'test-element-alt'
    ],
    elements: [
      makeMockHtmlElement(),
      makeMockHtmlElement()
    ]
  },
  otherElement: {
    selectors: [
      'other-element'
    ],
    elements: [
      makeMockHtmlElement()
    ]
  },
  otherElement2: {
    selectors: [
      'other-element'
    ],
    elements: [
      makeMockHtmlElement()
    ]
  }
}

describe('html.document.mock', function () {
  it('take list of queryable elements', function () {
    let mockDocument = makeMockDocument()
    mockDocument.setAllQueryableElements(queryableElements)
  })
  it('take list of active queryable elements', function () {
    let mockDocument = makeMockDocument()
    mockDocument.setAllQueryableElements(queryableElements)
    mockDocument.setActiveQueryableElements([
      queryableElements.testElement
    ])
  })
  it('access element directly by name', function () {
    let mockDocument = makeMockDocument()
    mockDocument.setAllQueryableElements(queryableElements)
    expect(
      mockDocument.elements.testElement
    ).to.equal(
      queryableElements.testElement.elements[0]
    )
  })
  it('access multiple elements directly by name with suffix `All`', function () {
    let mockDocument = makeMockDocument()
    mockDocument.setAllQueryableElements(queryableElements)
    expect(
      mockDocument.elements.testElementAll
    ).to.deep.equal(
      queryableElements.testElement.elements
    )
  })
  it('access all elements directly by name whether set as active or not', function () {
    let mockDocument = makeMockDocument()
    mockDocument.setAllQueryableElements(queryableElements)
    mockDocument.setActiveQueryableElements([
      queryableElements.testElement
    ])
    expect(
      mockDocument.elements.testElement
    ).to.deep.equal(
      queryableElements.testElement.elements[0]
    )
    expect(
      mockDocument.elements.testElementAll
    ).to.deep.equal(
      queryableElements.testElement.elements
    )
    expect(
      mockDocument.elements.otherElement
    ).to.deep.equal(
      queryableElements.otherElement.elements[0]
    )
    expect(
      mockDocument.elements.otherElementAll
    ).to.deep.equal(
      queryableElements.otherElement.elements
    )
  })
  describe('querySelector', function () {
    it('return first element matching selector', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.testElement
      ])
      expect(
        mockDocument.querySelector('test-element')
      ).to.equal(
        queryableElements.testElement.elements[0]
      )
    })
    it('return correct element regardless of activation order', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.otherElement,
        queryableElements.testElement
      ])
      expect(
        mockDocument.querySelector('test-element')
      ).to.equal(
        queryableElements.testElement.elements[0]
      )
    })
    it('return null if no match', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements([])
      mockDocument.setActiveQueryableElements([])
      expect(
        mockDocument.querySelector('does-not-exist')
      ).to.equal(
        null
      )
    })
    it('can match same element on diffent selectors', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.testElement
      ])
      expect(
        mockDocument.querySelector('test-element')
      ).to.equal(
        queryableElements.testElement.elements[0]
      )
      expect(
        mockDocument.querySelector('test-element-alt')
      ).to.equal(
        queryableElements.testElement.elements[0]
      )
    })
    it('do not match non-active elements', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([])
      expect(
        mockDocument.querySelector('test-element')
      ).to.equal(
        null
      )
    })
  })
  describe('querySelectorAll', function () {
    it('return all elements matching selector', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.otherElement,
        queryableElements.otherElement2
      ])
      expect(
        mockDocument.querySelectorAll('other-element')
      ).to.deep.equal(
        [...queryableElements.otherElement.elements,
        ...queryableElements.otherElement2.elements]
      )
    })
    it('return correct elements regardless of activation order', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.otherElement,
        queryableElements.testElement
      ])
      expect(
        mockDocument.querySelectorAll('test-element')
      ).to.deep.equal(
        queryableElements.testElement.elements
      )
    })
    it('return empty array if no match', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements([])
      mockDocument.setActiveQueryableElements([])
      expect(
        mockDocument.querySelectorAll('does-not-exist')
      ).to.deep.equal(
        []
      )
    })
    it('can match same set of elements on different selectors', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([
        queryableElements.testElement
      ])
      expect(
        mockDocument.querySelectorAll('test-element')
      ).to.deep.equal(
        queryableElements.testElement.elements
      )
      expect(
        mockDocument.querySelectorAll('test-element-alt')
      ).to.deep.equal(
        queryableElements.testElement.elements
      )
    })
    it('do not match non-active elements', function () {
      let mockDocument = makeMockDocument()
      mockDocument.setAllQueryableElements(queryableElements)
      mockDocument.setActiveQueryableElements([])
      expect(
        mockDocument.querySelectorAll('test-element')
      ).to.deep.equal(
        []
      )
    })
  })
})
