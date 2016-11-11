
let expect = require('chai').expect

let makeMockElement = require('./../src/html.element.mock')

describe('html.element.mock', function () {
  it('has property `value`', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.have.property('value')
  })
  it('has property `innerHTML`', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.have.property('innerHTML')
  })
  it('has property `_clickCount`', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.have.property('_clickCount')
  })
  it('property `_clickCount` is 0 by default', function () {
    let mockElement = makeMockElement()
    expect(mockElement._clickCount).to.equal(0)
  })
  it('has method `click`', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.respondTo('click')
  })
  it('method `click` increments property `_clickCount`', function () {
    let mockElement = makeMockElement()
    let clickCountBefore = mockElement._clickCount
    mockElement.click()
    let clickCountAfter = mockElement._clickCount
    expect(
      clickCountAfter
    ).to.equal(
      clickCountBefore + 1
    )
  })
  it('add event listeners', function () {
    let mockElement = makeMockElement()
    mockElement.addEventListener('myevent', function () {})
    mockElement.addEventListener('myevent', function () {})
  })
  it('test registered listener', function () {
    let mockElement = makeMockElement()
    let cb1 = function () {}
    let cb2 = function () {}
    mockElement.addEventListener('myevent', cb1)
    expect(
      mockElement.isEventListener('myevent', cb1)
    ).to.be.true
    expect(
      mockElement.isEventListener('myevent', cb2)
    ).to.be.false
    expect(
      mockElement.isEventListener('myotherevent', cb1)
    ).to.be.false
  })
  it('dispatch event', function (done) {
    let mockElement = makeMockElement()
    let i = 0
    let cb = function () {
      i += 1
      if (i === 2) done()
    }
    mockElement.addEventListener('myevent', cb)
    mockElement.addEventListener('myevent', cb)
    mockElement.dispatchEvent('myevent')
  })
})
