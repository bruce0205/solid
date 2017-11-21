var rp = require('request-promise');
const API_BASE = 'https://api.dropboxapi.com/2';

module.exports = class Client {
    /**
     * @param {String} accessToken
     */
    constructor(accessToken) {
        this._accessToken = accessToken || '';
    }


    listFolder(path) {
        var options = {
            method: 'POST',
            uri: `${API_BASE}/files/list_folder`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + this._accessToken
            },
            body: {
                "path": path
            },
            json: true // Automatically stringifies the body to JSON
        }
        return rp(options);
    }

    getTemporaryLink(path) {
        var options = {
            method: 'POST',
            uri: `${API_BASE}/files/get_temporary_link`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + this._accessToken
            },
            body: {
                "path": path
            },
            json: true // Automatically stringifies the body to JSON
        }
        return rp(options);
    }
}