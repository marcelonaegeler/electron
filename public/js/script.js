( function () {
  "use strict";
  var remote = require( 'electron' ).remote;
  var getAddress = remote.getGlobal( 'getAddress' );

  var app = new Vue({
    el: '#app'
    , data: {
      cep: ''
      , endereco: ''
      , numero: ''
      , bairro: ''
      , cidade: ''
      , estado: ''
    }
    , methods: {
      searchCEP: function () {
        if ( app.$data.cep.length < 8 ) {
          return false;
        }

        getAddress( app.$data.cep, function ( address ) {
          address = address.results[ 0 ].address_components;
          app.$data.cidade = Helpers.getObjectFromArray( address, 'types', 'administrative_area_level_2' ).long_name;


          Materialize.updateTextFields();
        });

      }
    }
  });

})();
