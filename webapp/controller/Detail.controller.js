sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, History, MessageToast, UIComponent, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
      onInit: function () {
        var oViewModel = new JSONModel({
          currency: "EUR",
        });
        this.getView().setModel(oViewModel, "view");

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("overview", {}, true);
        }
      },

      _onObjectMatched: function (oEvent) {
        this.byId("rating").reset();
        this.getView().bindElement({
          path:
            "/" +
            window.decodeURIComponent(
              oEvent.getParameter("arguments").invoicePath
            ),
          model: "invoice",
        });
      },

      onRatingChange: function (oEvent) {
        var fValue = oEvent.getParameter("value");
        var oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();

        MessageToast.show(
          oResourceBundle.getText("ratingConfirmation", [fValue])
        );
      },
    });
  }
);
