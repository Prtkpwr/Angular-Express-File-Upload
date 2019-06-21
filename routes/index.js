var express = require('express');
var router = express.Router();
var multer = require('multer');
var DIR = './uploads/';
var upload = multer({ dest: DIR }).single('TEMP');
var fs = require('fs');

var Unrar = require('node-unrar');


router.get('/', function (req, res) {
	res.send('this is a file uploader endpoint!')
});

router.post('/', function (req, res) {
	var path = '';
	upload(req, res, function (err) {
		if (err) {
			// An error occurred when uploading
			console.log(err);
			return res.status(422).send("an Error occured")
		}
		path = req.file.path;
		return res.send("Upload Completed for " + path);
	});
})

router.post('/rename', function (req, res) {
	res.send({
		"response": req.body.originalFileName + " uploaded"
	})
	fs.rename(`./uploads/${req.body.newFileName}`, `./uploads/${req.body.originalFileName}`, function (err) {
		if (err) console.log('ERROR: ' + err);
	});
	console.log(getFileExtension(req.body.originalFileName))
	if (getFileExtension(req.body.originalFileName) == "rar") {
		extractFile(`./uploads/${req.body.originalFileName}`, './uploads/')
	}
})

let extractFile = function (rarPath, extractPath) {
	var rar = new Unrar(rarPath);
	rar.extract(extractPath, null, function (err) {
		console.log("Done!")
	});
}

let getFileExtension = function (filename) {
	return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

module.exports = router;
