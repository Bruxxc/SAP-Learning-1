sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
    function (Controller, JSONModel,MessageToast, MessageBox, Filter, FilterOperator) {
      "use strict";
  
      return Controller.extend("sap.training.exc.controller.Test", {
        

        onInit: function() {
          var oModel = new JSONModel();

          var oView= this.getView();
          oView.setModel(oModel,"customer");


        },
        
        // !!! Cambiar los datos requeridos para el usuario


        onSave: function () {
          var oModelData = this.getView().getModel("customer").getData();
          

          var aRequiredFields = [
            "Form",
            "CustomerName",
            "Discount",
            "Street",
            "PostCode",
            "City",
            "Country",
            "Email",
            "Telephone"
          ];
          
          // Validar que todos los campos estén completos
          var bIsValid = aRequiredFields.every(function (sField) {
            return oModelData[sField] !== undefined && oModelData[sField] !== null && oModelData[sField].toString().trim() !== "";
          });
          
          if (!bIsValid) {
            MessageBox.warning("Por favor, complete todos los campos antes de crear el cliente.");
            return;
          }



          this.byId("customerTable").getBinding("items").create({
            "Form": oModelData.Form,
            "CustomerName": oModelData.CustomerName,
            "Discount": oModelData.Discount + "",
            "Street": oModelData.Street,
            "PostCode": oModelData.PostCode,
            "City": oModelData.City,
            "Country": oModelData.Country,
            "Email": oModelData.Email,
            "Telephone": oModelData.Telephone
          }).created().then(function () {
            MessageToast.show("Usuario creado correctamente");
          });


          },

          onCustomerChange: function (oEvent){
            var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
            this.byId("bookingTable").setBindingContext(oBindingContext);
          },



          onDisplayCUPanel: function (oEvent){
            if (!this._oDialog) {
              this.pDialog = this.loadFragment({
                name: "sap.training.exc.view.fragments.CreateUserDialog"
              });
              this.pDialog.then(function (oDialog) {
                oDialog.open();
              });
              
              var oModel = new sap.ui.model.json.JSONModel({
                name: "",
                email: "",
                city: ""
              });
              this._oDialog.setModel(oModel, "newUser");
            }
            this._oDialog.open();
          },

          onCloseDialog: function(){
            this.byId("createUserDialog").close();
          },
          
          // IMPLEMENTAR->  FILTRAR USUARIOS POR ROL

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
          

          
          onNavToDetails: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
          
          
          oRouter.navTo("detail", {
              // Pasar id de customer al navegar a details
              customerId: oItem.getBindingContext().getPath().substring("/UX_Customer".length)
            });
          }

  
      });
});