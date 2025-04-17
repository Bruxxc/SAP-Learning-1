sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ],
    function (Controller) {
      "use strict";
  
      return Controller.extend("sap.training.exc.controller.App", {
        
        onInit: function () {
          this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
          this.byId("appRouter").to(this.byId("mainPage"));
        },

        onGoToMainPage: function() {
          this.getOwnerComponent().getRouter().navTo("overview");
        },

        onGoToTestPage: function() {
          this.getOwnerComponent().getRouter().navTo("test");
        }

      });
});