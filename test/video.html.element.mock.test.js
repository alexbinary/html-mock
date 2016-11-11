
let expect = require('chai').expect

let makeMockVideoElement = require('./../src/video.html.element.mock')

describe('video.html.element.mock', function () {
  it('has property `paused`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('paused')
  })
  it('has property `currentTime`', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('currentTime')
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
