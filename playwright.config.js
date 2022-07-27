const { devices } = require("@playwright/test");

const config = {
	use: {
		browserName: "chromium",
		ignoreHTTPSErrors: true,
        baseURL: "http://localhost:3000",
        headless: true,
        trace: "off",
	},
    // Retries run the test 2 times on test case fail
    // retries: 2,
    // TO run test cases in different browsers
    // projects: [
    //     {
    //       name: 'chromium',
    //       use: { ...devices["Pixel 2"] },
    //     },
    //     {
    //       name: 'firefox',
    //       use: { ...devices['Desktop Firefox'] },
    //     },
    // ],
};

module.exports = config;

