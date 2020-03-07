class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(event, callback) {
    const _event = this._events[event] || (this._events[event] = [])
    _event.push(callback)
  }

  emit(event, arg) {
    const _event = this._events[event] || []
    _event.slice().forEach(callback => callback(arg))
  }
}

module.exports = EventEmitter
