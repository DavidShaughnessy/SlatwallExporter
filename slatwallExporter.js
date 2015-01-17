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

//Add Format
builder.selenium2.io.addDerivedLangFormatter("Java", {
    name: "SlatwallExporter",
    start:
      "package tests;\n" +
      "import org.junit.After;\n" +
      "import org.junit.Before;\n" +
      "import org.junit.AfterClass;\n" +
      "import org.junit.BeforeClass;\n" +
      "import org.junit.Test;\n" +
      "import static org.junit.Assert.*;\n" +
      "{extraImports}\n{junit_import_extra}" +
      "import java.util.concurrent.TimeUnit;\n" +
      "import java.util.Date;\n" +
      "import java.io.File;\n" +
      "import org.openqa.selenium.support.ui.Select;\n" +
      "import org.openqa.selenium.interactions.Actions;\n" +
      "import org.openqa.selenium.firefox.FirefoxDriver;\n" +
      "import org.openqa.selenium.*;\n" +
      "import static org.openqa.selenium.OutputType.*;\n" +
      "import tests.TestConfig;\n" +
      "\n" +
      "public class {scriptName} {junit_class_extra}{\n{junit_fields_extra}" +
      "    {driverVar}\n" +
      "    \n" +
      "    // Instantiate TestConfig with Base URL, User Email, and Password Here   " +
      "    \n" +
      "    TestConfig tc = new TestConfig(\"\",\"\",\"\");\n" +  
      "    @Before\n" +
      "    public void setUp() throws Exception {\n" +
      "        {initDriver}\n" +
      "        wd.manage().timeouts().implicitlyWait({timeoutSeconds}, TimeUnit.SECONDS);\n{junit_setup_extra}" +
      "        wd.get(tc.getBaseURL());\n" +
      '        wd.findElement(By.name("emailAddress")).click();\n' +
      '        wd.findElement(By.name("emailAddress")).clear();\n' +
      '        wd.findElement(By.name("emailAddress")).sendKeys(tc.getUserEmail());\n' +
      '        wd.findElement(By.name("password")).click();\n' +
      '        wd.findElement(By.name("password")).clear();\n' +
      '        wd.findElement(By.name("password")).sendKeys("tc.getPassword()");\n' +
      '        wd.findElement(By.xpath("//form[@id=\'adminLoginForm\']//button[.=\'Login\']")).click();\n' +  
      "    }\n" +
      "    \n" +
      "    @Test\n" +
      "    public void {scriptName}() {\n",
    driverVar:
      "FirefoxDriver wd;",
    initDriver:
      "wd = new FirefoxDriver();",
    end:
      "    }\n" +
      "    \n" +
      "    @After\n" +
      "    public void tearDown() {\n" +
      "        wd.quit();\n" +
      "    }\n" +
      "    \n" +
      "    public static boolean isAlertPresent(FirefoxDriver wd) {\n" +
      "        try {\n" +
      "            wd.switchTo().alert();\n" +
      "            return true;\n" +
      "        } catch (NoAlertPresentException e) {\n" +
      "            return false;\n" +
      "        }\n" +
      "    }\n" +
      "}\n",
    junit_import_extra: '',
    junit_class_extra: '',
    junit_fields_extra: '',
    junit_setup_extra: '',
    assert: function(step, escapeValue, doSubs, getter) {
      if (step.negated) {
        return "        assertNotEquals(" + doSubs(getter.cmp) + ", " + doSubs(getter.getter) + ");\n";
      } else {
        return "        assertEquals(" + doSubs(getter.cmp) + ", " + doSubs(getter.getter) + ");\n";
      }
    },
    boolean_assert: function(step, escapeValue, doSubs, getter) {
      if (step.negated) {
        return "        assertFalse(" + doSubs(getter.getter) + ");\n";
      } else {
        return "        assertTrue(" + doSubs(getter.getter) + ");\n";
      }
    }
  });

  builder.selenium2.io.suiteFormats.push({
    name: "Java/JUnit",
    extension: ".java",
    scriptFormatName: "Java/JUnit",
    format: function(scripts, path) {
      var name = path.path.split("/");
      name = name[name.length - 1];
      name = name.split(".")[0];
      var result = "" +
  "import junit.framework.Test;\n" +
  "import junit.framework.TestSuite;\n" +
  "\n" +
  "public class " + name + " {\n" +
  "    public static Test suite() {\n" + 
  "        TestSuite suite = new TestSuite();\n";
      for (var i = 0; i < scripts.length; i++) {
        name = scripts[i].exportpath.path.split("/");
        name = name[name.length - 1];
        name = name.split(".")[0];
        result += "        suite.addTestSuite(" + name + ".class);\n";
      } 
      result += "" +
  "        return suite;\n" +
  "    }\n" +
  "    \n" +
  "    public static void main(String[] args) {\n" +
  "        junit.textui.TestRunner.run(suite());\n" +
  "    }\n" +
  "}\n";
      return result;
    }
  });



  if (builder && builder.loader && builder.loader.loadNextMainScript) { builder.loader.loadNextMainScript(); }