
# [Thucydides][2] Step Formatter for [Selenium IDE][1]

This is a Firefox plugin that adds Thucydides formatters to [Selenium IDE][1] so that tests can be exported as [Thucydides][2] Selenium test cases..

## Description
The mapping of Selenium Testcases to Thucydides is:
* Testcase = Thucydides Step, 
* Suite = Thucydides Test

This allows Thucydides to provide screenshots for each step.
To see how the Thucydides report looks like, see the [sample report][3] provided.

## Installation
1. Run build.bat.
2. Open webdriver-backed-formatters.xpi in Firefox.

## Credits
Adam Goucher - Author of the Selenium IDE plugin API 

[1]:http://seleniumhq.org/projects/ide/
[2]:http://www.thucydides.info/
[3]:https://github.com/jfiala/selenium-ide-thucydides-formatter/blob/master/sample/thucydides-report/thucydides-report.zip