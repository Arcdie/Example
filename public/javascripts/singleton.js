/* global io */

class Singleton {
  constructor(host) {
    if (Singleton.exists) {
      return Singleton.instance;
    }

    Singleton.instance = this;
    Singleton.exists = true;

    // this.socket = io.connect(host);
    this.instance = Math.floor(Math.random() * Math.floor(10));
  }

  getInstance() {
    return this.instance;
  }
}
