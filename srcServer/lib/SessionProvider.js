const { EventEmitter } = require('events');

const getSessions = require('./spreadSheet');
const sessionComparator = require('./sessionsComparator');

class SessionProvider extends EventEmitter {
  constructor() {
    super();
    this._currentData = [];

    this.loadSessionData().then(sessions => {
      this._currentData = sessions;
      this.emit('initialized');
    }).catch(console.error);

    setInterval(async () => {
      console.log('polling');

      this.handleUpdate(await this.loadSessionData());
    }, 10000);
  }

  async handleUpdate(newSessions) {
    const oldList = this._currentData;
    this._currentData = newSessions;

    sessionComparator(oldList, this._currentData)
      .forEach(change => {
        this.emit('sessionUpdate', change)
        console.log(change);
      });
  }

  async loadSessionData() {
    const sessions = await getSessions();

    return sessions;
  }

  async getSessions() {
    return this._currentData;
  }
}

module.exports = SessionProvider;
