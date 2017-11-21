var rp = require('request-promise');

var listFolderOptions = {
    method: 'POST',
    uri: 'https://api.dropboxapi.com/2/files/list_folder',
    headers: {
        "Content-Type": "application/json",
        "Authorization": ""
    },
    body: {
        "path": "/Gallery"
    },
    json: true // Automatically stringifies the body to JSON
}

var getTemporaryLinkOptions = {
    method: 'POST',
    uri: 'https://api.dropboxapi.com/2/files/get_temporary_link',
    headers: {
        "Content-Type": "application/json",
        "Authorization": ""
    },
    body: {
        "path": ""
    },
    json: true // Automatically stringifies the body to JSON
}

var dropbox = {
    setAuthorization: (accessToken) => {
        listFolderOptions.headers["Authorization"] = 'Bearer ' + accessToken;
        getTemporaryLinkOptions.headers["Authorization"] = 'Bearer ' + accessToken;
    },
    listFolder: (accessToken) => {
        listFolderOptions.headers["Authorization"] = 'Bearer ' + accessToken;
        return rp(listFolderOptions);
    },
    getTemporaryLink: (accessToken, path) => {
        getTemporaryLinkOptions.headers["Authorization"] = 'Bearer ' + accessToken;
        getTemporaryLinkOptions.body.path = path;
        return rp(getTemporaryLinkOptions);
    }
}

module.exports = dropbox;