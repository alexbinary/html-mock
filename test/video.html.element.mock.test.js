
let expect = require('chai').expect

let makeMockVideoElement = require('./../src/video.html.element.mock')

describe('video.html.element.mock', function () {
  it('has property `paused`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('paused')
  })
  it('property `paused` is boolean', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement.paused).to.be.a('boolean')
  })
  it('property `paused` is false by default', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement.paused).to.equal(false)
  })
  it('has property `currentTime`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('currentTime')
  })
  it('property `currentTime` is number', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement.currentTime).to.be.a('number')
  })
  it('property `currentTime` is 0 by default', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement.currentTime).to.equal(0)
  })
  it('has method `play`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.respondTo('play')
  })
  it('has method `pause`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.respondTo('pause')
  })
  it('simulate play', function () {
    let mockVideoElement = makeMockVideoElement()
    mockVideoElement.pause()
    mockVideoElement.play()
    expect(
      mockVideoElement.paused
    ).to.be.false
  })
  it('simulate pause', function () {
    let mockVideoElement = makeMockVideoElement()
    mockVideoElement.play()
    mockVideoElement.pause()
    expect(
      mockVideoElement.paused
    ).to.be.true
  })
})
