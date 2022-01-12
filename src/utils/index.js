function objectIsEmpty(object) {
  return Object.keys(object).length === 0 && object.constructor === Object
}

module.exports = {
  objectIsEmpty
}
