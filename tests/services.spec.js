const { test, expect } = require("@playwright/test");

// test.use({ browserName: "firefox" });

test("Check page title", async ({ page, baseURL, browserName, browser }) => {

   await page.goto(baseURL);
    //  await secondPage.goto("http://example.com");

    console.log("browserName", browserName);
    // Get the inner text of header
    const Header = await page.innerText('header');

    expect(Header).toBe("THINGS TO DO");
    // await expect(page).toHaveURL("http://localhost:3000");
});

test("Add new item in list", async ({ page }) => {
    await page.goto("http://localhost:3000");

     // Click [placeholder="Add New"]
    await page.locator('[placeholder="Add New"]').click();

    // Fill [placeholder="Add New"]
    await page.locator('[placeholder="Add New"]').fill('Learn Playwright');

    // Press Enter
    await page.locator('[placeholder="Add New"]').press('Enter');

    // Find the entered label in DOM
    const list = await (await page.$$("#todoListId >> li >> label >> text=Learn Playwright")).at(0).innerText();

    expect(list).toBe("Learn Playwright");
});

// Capture screenshot of test
test("Click search icon to search items", async ({ page }) => {

    await page.goto("http://localhost:3000");

    const search =  await page.$('[placeholder="Search"]');

    expect(search).toBeNull();

    await page.locator("footer >> a >> nth=1").click();

    await page.screenshot({ path: "screenshots.png" });

    expect(await page.$('[placeholder="Search"]')).toBeTruthy();
});

// Use test info to run this test in different environment
test("Click complete button to see completed items", async ({ browser, baseURL, browserName }) => {
    const newPage = await browser.newPage({
        recordVideo: { dir: 'videos/' }
    });

    await newPage.goto(baseURL);

    const completeButton = await newPage.locator('footer >> a:has-text("Completed")');

    await completeButton.click();

    expect(await newPage.$('#todoListId')).toBeFalsy();
});
