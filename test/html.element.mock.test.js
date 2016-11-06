
let expect = require('chai').expect

let makeMockElement = require('./../src/html.element.mock')

describe('mockElement', function () {
  it('has a `value` property', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.have.property('value')
  })
  it('has a `innerHTML` property', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.have.property('innerHTML')
  })
  it('is clickable', function () {
    let mockElement = makeMockElement()
    expect(mockElement).to.respondTo('click')
  })
  it('can add event listeners', function () {
    let mockElement = makeMockElement()
    mockElement.addEventListener('myevent', function () {})
    mockElement.addEventListener('myevent', function () {})
  })
  it('can test if a value is attached to a specific event', function () {
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
  it('can dispatch event', function (done) {
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
