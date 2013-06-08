package com.example.steps.test;

import net.thucydides.core.annotations.Issue;
import net.thucydides.core.annotations.Managed;
import net.thucydides.core.annotations.ManagedPages;
import net.thucydides.core.annotations.Steps;
import net.thucydides.core.annotations.Story;
import net.thucydides.core.annotations.Title;
import net.thucydides.core.annotations.WithTagValuesOf;
import net.thucydides.core.pages.Pages;
import net.thucydides.junit.runners.ThucydidesRunner;
import java.util.concurrent.TimeUnit;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverBackedSelenium;
import com.example.steps.Search;
import com.example.steps.Download;
import com.example.steps.Documentation;

@RunWith(ThucydidesRunner.class)
public class Suite {

@Managed(uniqueSession=false)
protected WebDriver driver;

@ManagedPages
public Pages pages;

private WebDriverBackedSelenium selenium;

		@Steps
		Search search;

		@Steps
		Download download;

		@Steps
		Documentation documentation;

		@Before
		public void setUp() throws Exception {
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			selenium = new WebDriverBackedSelenium(driver, pages.getDefaultBaseUrl());
			search.setSelenium(selenium);
			download.setSelenium(selenium);
			documentation.setSelenium(selenium);
		}
		@Test
		@Title("Suite")
		public void test() throws Exception {
			search.stepSearch();
			download.stepDownload();
			documentation.stepDocumentation();
		}
	}
