( function () {
  "use strict";
  var remote = require( 'electron' ).remote;
  var getAddress = remote.getGlobal( 'getAddress' );
  var Clients = remote.getGlobal( 'Clients' );

  var app = new Vue({
    el: '#app'
    , data: {
      title: 'Oie'

      , postal_code: ''
      , address: ''
      , number: ''
      , sublocality: ''
      , city: ''
      , state: ''

      , phone: ''
      , name: ''

      , search_button_disabled: false
      , search_button_text: 'Buscar'
      , search_postal_code_error: null
    }
    , methods: {

      findClient: function () {

        Clients.getExample( app.$data.phone, function ( res ) {
          for ( var i in res ) {
            app.$data[ i ] = res[ i ];
          }
        });
      }

      , searchCEP: function () {
        if ( app.$data.postal_code.length < 8 ) {
          return false;
        }

        app.$data.search_button_disabled = true;
        app.$data.search_button_text = 'Buscando...';

        getAddress( app.$data.postal_code, function ( result ) {
          if ( !result.results || !result.results[ 0 ] ) {
            app.$data.search_button_disabled = false;
            app.$data.search_button_text = 'Buscar';
            app.$data.search_postal_code_error = 'CEP não encontrado!';
            return;
          }

          result = result.results[ 0 ].address_components;
          app.$data.search_postal_code_error = null;

          var tmp_data = {};
          tmp_data.city = Helpers.getObjectFromArray( result, 'types', 'administrative_area_level_2' );
          tmp_data.state = Helpers.getObjectFromArray( result, 'types', 'administrative_area_level_1' );
          tmp_data.sublocality = Helpers.getObjectFromArray( result, 'types', 'sublocality' );
          tmp_data.address = Helpers.getObjectFromArray( result, 'types', 'route' );
          tmp_data.number = Helpers.getObjectFromArray( result, 'types', 'number' );

          app.$data.city = tmp_data.city ? tmp_data.city.long_name : '';
          app.$data.state = tmp_data.state ? tmp_data.state.short_name : '';
          app.$data.sublocality = tmp_data.sublocality ? tmp_data.sublocality.long_name : '';
          app.$data.address = tmp_data.address ? tmp_data.address.long_name : '';
          app.$data.number = tmp_data.number ? tmp_data.number.long_name : '';

          app.$data.search_button_disabled = false;
          app.$data.search_button_text = 'Buscar';

          Materialize.updateTextFields();
        });

      }
    }
  });

   $( ".button-collapse" ).sideNav();

})();
