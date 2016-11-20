
let expect = require('chai').expect

let makeMockDocument = require('./../src/html.document.mock')
let makeMockHtmlElement = require('./../src/html.element.mock')

let queryableElements = {
  testElement: {
    selectors: [
      'test-element',
      'test-element-alt'
    ],
    element: makeMockHtmlElement()
  },
  otherElement: {
    selectors: [
      'other-element'
    ],
    element: makeMockHtmlElement()
  },
  otherElement2: {
    selectors: [
      'other-element'
    ],
    element: makeMockHtmlElement()
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
      queryableElements.testElement.element
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
      queryableElements.testElement.element
    )
    expect(
      mockDocument.elements.otherElement
    ).to.deep.equal(
      queryableElements.otherElement.element
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
        queryableElements.testElement.element
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
        queryableElements.testElement.element
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
        queryableElements.testElement.element
      )
      expect(
        mockDocument.querySelector('test-element-alt')
      ).to.equal(
        queryableElements.testElement.element
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
      ).to.deep.equal([
        queryableElements.otherElement.element,
        queryableElements.otherElement2.element
      ])
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
      ).to.deep.equal([
        queryableElements.testElement.element
      ])
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
      ).to.deep.equal([
        queryableElements.testElement.element
      ])
      expect(
        mockDocument.querySelectorAll('test-element-alt')
      ).to.deep.equal([
        queryableElements.testElement.element
      ])
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
