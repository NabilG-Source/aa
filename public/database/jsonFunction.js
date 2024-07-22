const fs = require('fs');

const loadRegistered = (path) => {
    const jsonBuffer = fs.readFileSync(path, 'utf-8');
    const jsonContact = JSON.parse(jsonBuffer);
    return jsonContact;
}

module.exports = {
    loadRegistered: loadRegistered
}