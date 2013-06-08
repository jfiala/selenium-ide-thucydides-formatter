/*
 * Format for Thucydides Selenium Remote Control Java client.
 */

var subScriptLoader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
subScriptLoader.loadSubScript('chrome://thucydides-formatters/content/formats/thucydides-base.js', this);


this.name = "java-rc-thucydides";

function useSeparateEqualsForArray() {
    return true;
}

function testMethodName(testName) {
    return "step" + capitalize(testName);
}

function testTestName(testName) {
    return(testName);
}


function assertTrue(expression) {
    return "assertTrue(" + expression.toString() + ");";
}

function verifyTrue(expression) {
    return "verifyTrue(" + expression.toString() + ");";
}

function assertFalse(expression) {
    return "assertFalse(" + expression.toString() + ");";
}

function verifyFalse(expression) {
    return "verifyFalse(" + expression.toString() + ");";
}

function assignToVariable(type, variable, expression) {
    return type + " " + variable + " = " + expression.toString();
}

function ifCondition(expression, callback) {
    return "if (" + expression.toString() + ") {\n" + callback() + "}";
}

function joinExpression(expression) {
    return "join(" + expression.toString() + ", ',')";
}

function waitFor(expression) {
    return "for (int second = 0;; second++) {\n" +
        "\tif (second >= 60) fail(\"timeout\");\n" +
        "\ttry { " + (expression.setup ? expression.setup() + " " : "") +
        "if (" + expression.toString() + ") break; } catch (Exception e) {}\n" +
        "\tThread.sleep(1000);\n" +
        "}\n";
    //return "while (" + not(expression).toString() + ") { Thread.sleep(1000); }";
}

function assertOrVerifyFailure(line, isAssert) {
    var message = '"expected failure"';
    var failStatement = "fail(" + message + ");";
    return "try { " + line + " " + failStatement + " } catch (Throwable e) {}";
}

Equals.prototype.toString = function() {
    if (this.e1.toString().match(/^\d+$/)) {
        // int
        return this.e1.toString() + " == " + this.e2.toString();
    } else {
        // string
        return this.e1.toString() + ".equals(" + this.e2.toString() + ")";
    }
};

Equals.prototype.assert = function() {
    return "assertEquals(" + this.e1.toString() + ", " + this.e2.toString() + ");";
};

Equals.prototype.verify = function() {
    return "verifyEquals(" + this.e1.toString() + ", " + this.e2.toString() + ");";
};

NotEquals.prototype.toString = function() {
    return "!" + this.e1.toString() + ".equals(" + this.e2.toString() + ")";
};

NotEquals.prototype.assert = function() {
    return "assertNotEquals(" + this.e1.toString() + ", " + this.e2.toString() + ");";
};

NotEquals.prototype.verify = function() {
    return "verifyNotEquals(" + this.e1.toString() + ", " + this.e2.toString() + ");";
};

RegexpMatch.prototype.toString = function() {
    if (this.pattern.match(/^\^/) && this.pattern.match(/\$$/)) {
        return this.expression + ".matches(" + string(this.pattern) + ")";
    } else {
        return "Pattern.compile(" + string(this.pattern) + ").matcher(" + this.expression + ").find()";
    }
};

function pause(milliseconds) {
    return "Thread.sleep(" + parseInt(milliseconds, 10) + ");";
}

function echo(message) {
    return "System.out.println(" + xlateArgument(message) + ");";
}

function statement(expression) {
    return expression.toString() + ';';
}

function array(value) {
    var str = 'new String[] {';
    for (var i = 0; i < value.length; i++) {
        str += string(value[i]);
        if (i < value.length - 1) str += ", ";
    }
    str += '}';
    return str;
}

function nonBreakingSpace() {
    return "\"\\u00a0\"";
}

CallSelenium.prototype.toString = function() {
    var result = '';
    if (this.negative) {
        result += '!';
    }
    if (options.receiver) {
        result += options.receiver + '.';
    }
    result += this.message;
    result += '(';
    for (var i = 0; i < this.args.length; i++) {
        result += this.args[i];
        if (i < this.args.length - 1) {
            result += ', ';
        }
    }
    result += ')';
    return result;
};

function formatComment(comment) {
    return comment.comment.replace(/.+/mg, function(str) {
            return "// " + str;
        });
}

/**
 * Returns a string representing the suite for this formatter language.
 *
 * @param testSuite  the suite to format
 * @param filename   the file the formatted suite will be saved as
 */
function formatSuite(testSuite, filename) {
    var suiteClass = /^(\w+)/.exec(filename)[1];
    suiteClass = suiteClass[0].toUpperCase() + suiteClass.substring(1);
    
    var formattedSuite = "package " + this.options.packageName +".test;\n" 
    	+ "\n" 
    	+"import net.thucydides.core.annotations.Issue;\n" 
    	+ "import net.thucydides.core.annotations.Managed;\n"
    	+ "import net.thucydides.core.annotations.ManagedPages;\n"
    	+ "import net.thucydides.core.annotations.Steps;\n"
    	+ "import net.thucydides.core.annotations.Story;\n"
    	+ "import net.thucydides.core.annotations.Title;\n"
    	+ "import net.thucydides.core.annotations.WithTagValuesOf;\n"
    	+ "import net.thucydides.core.pages.Pages;\n"
    	+ "import net.thucydides.junit.runners.ThucydidesRunner;\n"
    	+ "import java.util.concurrent.TimeUnit;\n"
    	
    	+ "import org.junit.Before;\n"
    	+ "import org.junit.Test;\n"
    	+ "import org.junit.runner.RunWith;\n"
    	+ "import org.openqa.selenium.WebDriver;\n"
    	+ "import org.openqa.selenium.WebDriverBackedSelenium;\n";
    	
    for (var i = 0; i < testSuite.tests.length; ++i) {
        var testClass = testSuite.tests[i].getTitle();
        
        formattedSuite += "import " + this.options.packageName + "." + testClass + ";\n";
    }
    
    formattedSuite +=  "\n"
    	+ "@RunWith(ThucydidesRunner.class)\n"
    	+ "public class " + suiteClass + " {\n"
        + "\n"
        + indents(1) + "@Managed(uniqueSession=false)\n"
        + indents(1) + "protected WebDriver driver;\n"
        + "\n"
        + indents(1) + "@ManagedPages\n"
        + indents(1) + "public Pages pages;\n"
        + indents(1) + "\n"
        + indents(1) + "private WebDriverBackedSelenium selenium;\n"
        + "\n";
    
    for (var i = 0; i < testSuite.tests.length; ++i) {
        var testClass = testSuite.tests[i].getTitle();
        var testClassVariable = testClass.toLowerCase();
        
        formattedSuite += indents(1) + "@Steps\n";
        formattedSuite += indents(1) + testClass + " " + testClassVariable + ";\n";
        formattedSuite += "\n";
    }
    
    formattedSuite += indents(1) +"@Before\n" 
    	+ indents(1) +"public void setUp() throws Exception {\n"
    	+ indents(2) +"driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);\n"
    	
    	+ indents(2) +"selenium = new WebDriverBackedSelenium(driver, pages.getDefaultBaseUrl());\n";
    
    for (var i = 0; i < testSuite.tests.length; ++i) {
        var testClass = testSuite.tests[i].getTitle();
        var testClassVariable = testClass.toLowerCase();
        
        formattedSuite += indents(2) + testClassVariable + ".setSelenium(selenium)" + ";\n";
    }
    
    formattedSuite += indents(1) + "}\n";
    
    formattedSuite += indents(1) +"@Test\n"
    	+ indents(1) +"@Title(\"" + suiteClass + "\")\n"
    	+ indents(1) +"public void test() throws Exception {\n";
    
    for (var i = 0; i < testSuite.tests.length; ++i) {
        var testClass = testSuite.tests[i].getTitle();
        var testClassVariable = testClass.toLowerCase();
        
        formattedSuite += indents(2) + testClassVariable + ".step" + testClass + "();\n";
    }
    
    	
    formattedSuite += indents(1) + "}\n"
    	+  "}\n";
   
    return formattedSuite;
}

function defaultExtension() {
  return this.options.defaultExtension;
}

this.options = {
    receiver: "selenium",
    environment: "*chrome",
    packageName: "com.example.steps",
    superClass: "ScenarioSteps",
    indent: 'tab',
    initialIndents: '2',
    defaultExtension: "java"
};

options.header =
    "package ${packageName};\n" +
    "\n" +
    "import com.thoughtworks.selenium.Selenium;\n" +
    "import org.openqa.selenium.firefox.FirefoxDriver;\n" +
    "import org.openqa.selenium.WebDriver;\n" +
    "import org.junit.After;\n" +
    "import org.junit.Before;\n" +
    "import org.junit.Test;\n" +
    "import static org.junit.Assert.*;\n" +
    "import java.util.regex.Pattern;\n" +
    "import static org.apache.commons.lang3.StringUtils.join;\n" +
    "\n" +
    "import net.thucydides.core.annotations.Step;\n" +
    "import net.thucydides.core.pages.Pages;\n" +
    "import net.thucydides.core.steps.ScenarioSteps;\n" +
    
    "\n" +
    "public class ${className} extends ${superClass} {\n" +
    "\n" +
    indents(1) + "public ${className}(Pages pages) {\n" +
    indents(2) + "super(pages);\n" +
    indents(1) + "}\n" +   
    "\n" +
    indents(1) + "private Selenium selenium;\n" +
    "\n" +
    indents(1) + "@Step(\"${testName}\")\n" +
    indents(1) + "public void ${methodName}() throws Exception {\n";

options.footer =
    indents(1) + "}\n" +
    "\n" +
    indents(1) + "public void setSelenium(Selenium selenium) {\n" +
    indents(2) + "this.selenium = selenium;\n" +
    indents(1) + "}\n" +
    "\n" +
    
    
    
    "}\n";

this.configForm = 
    '<description>Variable for Selenium instance</description>' +
    '<textbox id="options_receiver" />' +
    '<description>Environment</description>' +
    '<textbox id="options_environment" />' +
    '<description>Package</description>' +
    '<textbox id="options_packageName" />' +
    '<description>Superclass</description>' +
    '<textbox id="options_superClass" />';