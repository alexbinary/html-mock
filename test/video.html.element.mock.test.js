
let expect = require('chai').expect

let makeMockVideoElement = require('./../src/video.html.element.mock')

describe('mockVideoElement', function () {
  it('has a `paused` property', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('paused')
  })
  it('has a `currentTime` property', function () {
    let mockVideoElement = makeMockVideoElement()
    expect(mockVideoElement).to.have.property('currentTime')
  })
  it('can simulate play', function () {
    let mockVideoElement = makeMockVideoElement()
    mockVideoElement.pause()
    mockVideoElement.play()
    expect(
      mockVideoElement.paused
    ).to.be.false
  })
  it('can simulate pause', function () {
    let mockVideoElement = makeMockVideoElement()
    mockVideoElement.play()
    mockVideoElement.pause()
    expect(
      mockVideoElement.paused
    ).to.be.true
  })
})
