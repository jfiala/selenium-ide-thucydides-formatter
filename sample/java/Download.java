package com.example.steps;

import com.thoughtworks.selenium.Selenium;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebDriver;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;
import static org.apache.commons.lang3.StringUtils.join;

import net.thucydides.core.annotations.Step;
import net.thucydides.core.pages.Pages;
import net.thucydides.core.steps.ScenarioSteps;

public class Download extends ScenarioSteps {

	public Download(Pages pages) {
		super(pages);
	}

	private Selenium selenium;

	@Step("Download")
	public void stepDownload() throws Exception {
		selenium.open("/");
		selenium.click("link=Download");
		selenium.waitForPageToLoad("30000");
		assertTrue(selenium.isTextPresent("Downloads"));
	}

	public void setSelenium(Selenium selenium) {
		this.selenium = selenium;
	}

}
