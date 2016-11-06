
let expect = require('chai').expect

let makeMockDocument = require('./../src/html.document.mock')
let makeMockHtmlElement = require('./../src/html.element.mock')

let mockDocument = makeMockDocument()

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
  }
}

describe('mockDocument', function () {
  it('takes list of queryable elements', function () {
    mockDocument.setAllQueryableElements(queryableElements)
  })
  it('takes list of active queryable elements', function () {
    mockDocument.setAllQueryableElements(queryableElements)
    mockDocument.setActiveQueryableElements([
      queryableElements.testElement
    ])
  })
  it('access element by name', function () {
    mockDocument.setAllQueryableElements(queryableElements)
    expect(
      mockDocument.elements.testElement
    ).to.equal(
      queryableElements.testElement.elements[0]
    )
  })
  it('access multiple elements by name with suffix `All`', function () {
    mockDocument.setAllQueryableElements(queryableElements)
    expect(
      mockDocument.elements.testElementAll
    ).to.deep.equal(
      queryableElements.testElement.elements
    )
  })
  it('querySelector matches same element on multiple selectors', function () {
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
    expect(
      mockDocument.querySelector('test-element-alt')
    ).to.equal(
      queryableElements.testElement.elements[0]
    )
  })
  it('querySelectorAll matches same set of elements on multiple selectors', function () {
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
    expect(
      mockDocument.querySelectorAll('test-element-alt')
    ).to.deep.equal(
      queryableElements.testElement.elements
    )
  })
  it('querySelector matches the first element with selector', function () {
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
  it('querySelectorAll matches all elements with selector', function () {
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
  it('querySelector does not match non-active elements', function () {
    mockDocument.setAllQueryableElements(queryableElements)
    mockDocument.setActiveQueryableElements([])
    expect(
      mockDocument.querySelector('test-element')
    ).to.equal(
      null
    )
  })
  it('querySelectorAll does not match non-active elements', function () {
    mockDocument.setAllQueryableElements(queryableElements)
    mockDocument.setActiveQueryableElements([])
    expect(
      mockDocument.querySelectorAll('test-element')
    ).to.deep.equal(
      []
    )
  })
})
