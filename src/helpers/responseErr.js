class ResponseErr extends Error {
  #status = 0;

  constructor(status, msg) {
    super(msg);
    this.#status = status;
  }

  get getStatus() {
    return this.#status;
  }
}

export default ResponseErr;
