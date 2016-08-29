var mongo = require( 'mongoskin' )
	, db = mongo.db( 'mongodb://localhost:27017/electron', { native_parser: true } );

exports.db = db;
exports.mongo = mongo;
