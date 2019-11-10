const { EventEmitter } = require('events');

const chokidar = require('chokidar');
const Hypher = require('hypher');
const german = require('hyphenation.de');

const sessionComparator = require('./sessionsComparator');
const jsonFileLoader = require('./jsonFileLoader');

const hyphenator = new Hypher(german);

class SessionProvider extends EventEmitter {
  constructor(filePath) {
    super();
    this._filePath = filePath;
    this._currentData = [];

    this._installFileWatcher();

    this.loadSessionData().then(sessions => {
      this._currentData = sessions;
      this.emit('initialized');
    }).catch(console.error);
  }

  _installFileWatcher() {
    chokidar.watch(this._filePath, { usePolling: true, interval: 500 })
      .on('change', () => this._handleFileUpdate())
      .on('error', error => console.error('Chokidar error: ', error));
  }

  async _handleFileUpdate() {
    const oldList = this._currentData;
    this._currentData = await this.loadSessionData();

    sessionComparator(oldList, this._currentData)
      .forEach(change => this.emit('sessionUpdate', change));
  }

  async loadSessionData() {
    let sessions = await jsonFileLoader.loadJsonFile(this._filePath);      

    sessions = sessions.map(session => {
      return {
        ...session,
        //title: hyphenator.hyphenateText(session.title)
      };
    });

    return sessions
  }

  async getSessions() {
    return this._currentData;
  }

  _validate(data) {
    if (!Array.isArray(data)) {
      throw new Error('must be an array');
    }

    if (data.length === 0) {
      throw new Error('can not be empty');
    }

    return data;
  }
}

module.exports = SessionProvider;
