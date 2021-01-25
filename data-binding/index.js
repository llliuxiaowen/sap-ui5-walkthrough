sap.ui.require(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/resource/ResourceModel",
  ],
  function (JSONModel, XMLView, ResourceModel) {
    "use strict";

    // Attach an anonymous function to the SAPUI5 'init' event
    sap.ui.getCore().attachInit(function () {
      // Create a JSON model from an object literal
      var oModel = new JSONModel({
        // flat structure
        // @usage: value="{/firstName}"
        firstName: "Harry",
        lastName: "Hawk",
        enabled: true,
        panelHeaderText: "Data Binding Basics",
        salesAmount: 12345.6789,
        currencyCode: "EUR",
        priceThreshold: 20,
        // hierarchical structure
        // @usage: value="{/address/street}""
        address: {
          street: "Dietmar-Hopp-Allee 16",
          city: "Walldorf",
          zip: "69190",
          country: "Germany",
        },
      });
      sap.ui.getCore().setModel(oModel);

      var oProductModel = new JSONModel();
      oProductModel.loadData("./model/Products.json");
      // @usage: 	<List headerText="{i18n>productListTitle}" items="{products>/Products}">
      sap.ui.getCore().setModel(oProductModel, "products");

      // Create a resource bundle for language specific texts
      // i18n property names must not start with a slash character
      // @usage: text="{i18n>firstName}"
      var oResourceModel = new ResourceModel({
        bundleName: "sap.ui.demo.db.i18n.i18n",
        supportedLocales: ["", "de"],
        fallbackLocale: "",
      });
      sap.ui.getCore().setModel(oResourceModel, "i18n");

      // Display the XML view called "App"
      var oView = new XMLView({
        viewName: "sap.ui.demo.db.view.App",
      });

      // Register the view with the message manager
      // the error message itself will only be displayed when that particular field has focus
      // otherwise it has just a red border
      sap.ui.getCore().getMessageManager().registerObject(oView, true);

      // Insert the view into the DOM
      oView.placeAt("content");
    });
  }
);
