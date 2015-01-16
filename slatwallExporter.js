SlatwallExporter = {};
// Executed on startup.
alert("Starting up SlatwallExporter!");

// Executed on shutdown.
SlatwallExporter.shutdown = function() {
  alert("Shutting down SlatwallExporter!");
};


// Add menu item.
builder.gui.menu.addItem('file', "Show me a logo", 'file-show-logo', function() {
  // Using newNode to create dialog.
  var dialog = newNode('div', {'class': 'dialog', 'id': 'logo-dialog'},
    newNode('h1', "Slatwall!"),
    // Getting full resource path.
    newNode('img', {'src': builder.plugins.getResourcePath('SlatwallExporter', 'slatwall.logo.png')}),
    // Adding listeners in newNode.
    newNode('p',
      newNode('a', {'href': '#', 'click': function() { jQuery('#logo-dialog').remove(); }}, "Close")
    )
  );
  // Showing dialog.
  builder.dialogs.show(dialog);
});

builder.selenium2.io.addDerivedLangFormatter("Java", {
  name: "SlatwallExporter",
  extension: ".cfc",
  start:
    "\n" +
    "component name='{scriptName}' extends='Slatwall.meta.tests.functional.SlatwallFunctionalTestBase'\n{\n" +
    "    \n" +
    "    //@Test\n" +
    "    public any function {scriptName}() {\n",
  end:
    "    }\n" +
    "    \n" +
    "}\n",
  canExport: function(stepType) { return true; },
  nonExportables: function(script) { return []; }
});
