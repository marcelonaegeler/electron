( function () {
  "use strict";
  var remote = require( 'electron' ).remote;
  var getAddress = remote.getGlobal( 'getAddress' );

  var app = new Vue({
    el: '#app'
    , data: {
      title: 'Oie'
      , cep: ''
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
          var tmp_data = {};
          tmp_data.cidade = Helpers.getObjectFromArray( address, 'types', 'administrative_area_level_2' );
          tmp_data.estado = Helpers.getObjectFromArray( address, 'types', 'administrative_area_level_1' );
          tmp_data.bairro = Helpers.getObjectFromArray( address, 'types', 'sublocality' );
          tmp_data.endereco = Helpers.getObjectFromArray( address, 'types', 'address' );
          tmp_data.numero = Helpers.getObjectFromArray( address, 'types', 'number' );

          app.$data.cidade = tmp_data.cidade ? tmp_data.cidade.long_name : '';
          app.$data.estado = tmp_data.estado ? tmp_data.estado.short_name : '';
          app.$data.bairro = tmp_data.bairro ? tmp_data.bairro.long_name : '';
          app.$data.endereco = tmp_data.endereco ? tmp_data.endereco.long_name : '';
          app.$data.numero = tmp_data.numero ? tmp_data.numero.long_name : '';

          app.$data.search_button_disabled = false;
          app.$data.search_button_text = 'Buscar';
          
          Materialize.updateTextFields();
        });

      }
    }
  });

   $( ".button-collapse" ).sideNav();

})();
