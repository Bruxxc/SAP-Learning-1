sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
],
  function (Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Test", {


      onInit: function () {
        
      },

      // !!! Cambiar los datos requeridos para el usuario

      //Mostar Formulario
      onDisplayCUPanel: function () {

        //Cargar fragmento
        if (!this._oDialog) {
          this.pDialog = this.loadFragment({
            name: "sap.training.exc.view.fragments.CreateUserDialog"
          }).then(function (oDialog) {
            this._oDialog = oDialog;

            // Modelo para el formulario (cambiar datos necesarios)
            var oModel = new sap.ui.model.json.JSONModel({
              name: "",
              email: "",
              city: ""
            });

            //Settear modelo
            this._oDialog.setModel(oModel, "newUser");

            //Abrir formulario
            this._oDialog.open();

          }.bind(this));
        } else {
          //Abrir fragmento
          this._oDialog.open();
        }
      },

      //Ocultar formulario
      onCloseDialog: function () {
        this.byId("createUserDialog").close();
      },

      // IMPLEMENTAR->  FILTRAR USUARIOS POR ROL

      //Filtrar usuarios
      onFilterUsers: function (oEvent) {
        var uFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery && sQuery.length > 0) {
          uFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
        }
        var oTable = this.byId("UsersRoleTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter(uFilter);
      },


      //Navegar a detalles de usuario
      onNavToDetails: function (oEvent) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
          // Pasar id de usuario al navegar a details
          customerId: oItem.getBindingContext().getPath().substring("/UX_Customer".length)
        });
      },


      onCreateUser: function (oEvent){

      }

    });
  });