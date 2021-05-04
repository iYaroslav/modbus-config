function CircularBuffer(size) {
  this.size = size
}

CircularBuffer.prototype = Object.create(Array.prototype)
CircularBuffer.prototype.constructor = CircularBuffer

CircularBuffer.prototype.push = function push(element) {
  Array.prototype.push.call(this, element)
  while (this.length > this.size) {
    this.shift()
  }
}

export default CircularBuffer
