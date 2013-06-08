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

public class Search extends ScenarioSteps {

	public Search(Pages pages) {
		super(pages);
	}

	private Selenium selenium;

	@Step("Search")
	public void stepSearch() throws Exception {
		selenium.open("/");
		selenium.type("id=q", "thucydides");
		selenium.click("id=submit");
		selenium.waitForPageToLoad("30000");
		selenium.click("//div[@id='cse']/div/div/div/div[5]/div[2]/div/div/div/div/table/tbody/tr/td[2]/div/a");
		selenium.waitForPageToLoad("30000");
	}

	public void setSelenium(Selenium selenium) {
		this.selenium = selenium;
	}

}
