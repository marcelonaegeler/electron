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
      , search_button_disabled: false
      , search_button_text: 'Buscar'
    }
    , methods: {
      searchCEP: function () {
        if ( app.$data.cep.length < 8 ) {
          return false;
        }

        app.$data.search_button_disabled = true;
        app.$data.search_button_text = 'Buscando...';

        getAddress( app.$data.cep, function ( address ) {
          address = address.results[ 0 ].address_components;
          app.$data.cidade = Helpers.getObjectFromArray( address, 'types', 'administrative_area_level_2' ).long_name;


          app.$data.search_button_disabled = false;
          app.$data.search_button_text = 'Buscar';
          Materialize.updateTextFields();
        });

      }
    }
  });

})();
