var express = require('express');
var rp = require('request-promise');
var router = express.Router();

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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('gallery', { title: 'Gallery' });
});

router.post('/list', async (req, res, next) => {
    try {
        var result = {
            "success": true,
            "message": "ok",
            "data": []
        };
        let accessToken = req.body.accessToken;
        listFolderOptions.headers["Authorization"] = 'Bearer ' + accessToken;
        getTemporaryLinkOptions.headers["Authorization"] = 'Bearer ' + accessToken;

        let list = await rp(listFolderOptions);
        console.log('list.entries.length: ', list.entries.length);

        for (i = 0; i < list.entries.length; i++) {
            getTemporaryLinkOptions.body.path = list.entries[i]["path_lower"];
            let imageObj = await rp(getTemporaryLinkOptions);
            result.data.push(imageObj.link);
        }
        res.status(200).send(result);
    } catch (e) {
        console.error(e);
        result.success = false;
        result.message = "error";
        res.status(500).send(result);
    }
});

module.exports = router;
