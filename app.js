var shelljs = require('shelljs'),
	chokidar = require('chokidar'),
	watcher = chokidar.watch('pushList', {
		ignored : /[\/\\]\./,
		persistent : true
	}),
	log = console.log.bind(console);

watcher
	.on('add', function (path) {
		log('File', path, 'has been added');
	})
	.on('addDir', function (path) {
		log('Directory', path, 'has been added');
	})
	.on('change', function (path) {
		log('File', path, 'has been changed');
		shelljs.exec("node push.js");
		shelljs.exit(1);
	})
	.on('unlink', function (path) {
		log('File', path, 'has been removed');
	})
	.on('unlinkDir', function (path) {
		log('Directory', path, 'has been removed');
	})
	.on('error', function (error) {
		log('Error happened', error);
	})
	.on('ready', function () {
		log('Initial scan complete. Ready for changes.');
	})
	.on('raw', function (event, path, details) {
		log('Raw event info:', event, path, details);
		shelljs.exec("node push.js");
		//shelljs.exec("gulp push");
		//shelljs.exit(1);
	})