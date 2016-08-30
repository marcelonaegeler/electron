var Helpers = ( function () {

  var getObjectFromArray = function ( arr, property, value, callback ) {
    var result = null;
    for ( var i = 0, l = arr.length; i < l; i++ ) {
      var item = arr[ i ];
      if ( item[ property ] && item[ property ].indexOf( value ) > -1 ) {
        result = item;
        break;
      }
    }

    return result;
  };

  return {
    getObjectFromArray: getObjectFromArray
  };
})();
