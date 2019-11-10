const moment = require('moment');
const GS = require('google-spreadsheet');

async function getSessions() {
  const gs = new GS('1bv611pp-HgooxnUCeWDIl7Qxf5Vxk4S25-G7FUhFHBU')
  const info = await getInfo(gs);

  const sheet = info.worksheets[info.worksheets.length - 1];
  const day = sheet.title;
  const cells = await getCells(sheet);

  const rooms = [];
  const slots = [];
  const result = [];

  cells.forEach(cell => {
    if (cell.row !== 1) {
      return;
    }

    rooms[cell.col] = cell.value;
  });

  cells.forEach(cell => {
    if (cell.col !== 1) {
      return;
    }

    const [start, end] = cell.value.split(' - ');
    slots[cell.row] = {
      start: moment(day + 'T' + start).format(),
      end: moment(day + 'T' + end).format(),
    };
  });

  cells.forEach(cell => {
    if (cell.col === 1 || cell.row === 1) {
      return;
    }
      
    const [host, title] = cell.value.split('\n');
    result.push({
      id: `SWEC|${day}|${cell.col-2}|${cell.row-2}`,
      title,
      host,
      room: rooms[cell.col],
      ...slots[cell.row]
    });
  });

  return result;
}

function getInfo(gs) {
  return new Promise((resolve, reject) => {
    gs.getInfo((error, info) => {
      if (error) {
        return reject(error);
      }

      resolve(info)
    })
  })
}

function getCells(sheet) {
  return new Promise((resolve, reject) => {
    sheet.getCells({}, (error, cells) => {
      if (error) {
        return reject(error);
      }

      resolve(cells)
    })
  })
}

module.exports = getSessions