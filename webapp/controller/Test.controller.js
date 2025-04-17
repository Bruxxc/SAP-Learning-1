sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ],
    function (Controller) {
      "use strict";
  
      return Controller.extend("sap.training.exc.controller.Test", {
        onInit: function(){
            this.contador=0;
        },
        testFunction: function(){
            console.log("TUKI");
            sap.m.MessageToast.show("¡Botón clickeado!");
            this.contador++;
            var oContadorText= this.byId("contadorText");
            oContadorText.setText(this.contador);
        }

  
      });
});