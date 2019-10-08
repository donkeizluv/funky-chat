class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = ValidationError.NAME;
  }
  static get NAME() {
    return "ValidationError";
  }
}
module.exports = {
  ValidationError
};
