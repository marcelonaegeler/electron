( function () {
  "use strict";

  var remote = require('electron').remote;

  console.log( remote.getGlobal( 'variavel' ) );

  new Vue({
    el: '#app'
    , data: {
      message: 'Started!'
    }
  });

})();
