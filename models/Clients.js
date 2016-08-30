var mongoskin = require( '../config_db' )
  , db = mongoskin.db
  , mongo = mongoskin.mongo
  , router = {};

// var router = {};

var clientSchema = function ( data ) {
	return {
		name: data.name
		, phone: data.phone
    , address: data.address
    , number: data.number
    , sublocality: data.sublocality
    , city: data.city
    , state: data.state
    , postal_code: data.postal_code
	};
};


router.getExample = function ( phone, callback ) {
  var clientExample = {
    name: 'Marcelo A Naegeler'
		, phone: '4788556581'
    , address: 'Rua Wilhelm Wesphal'
    , number: 166
    , sublocality: 'Industrial'
    , city: 'Timbó'
    , state: 'Santa Catarina'
    , postal_code: '89120000'
  };

  return callback( clientSchema( clientExample ) );
};

module.exports = router;
