import {Browser} from "webdriverio";

const wdio = require("webdriverio");
const assert = require("assert");
const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "8",
        deviceName: "emulator-5554",
        app: "/Users/JoseRojas/Projects/aseguramiento/tp-despegar/appium/apk/despegar.apk",
        appPackage: "com.gm.despegar",
        appActivity: "com.despegar.ui.splash.SplashActivity",
        automationName: "UiAutomator2"
    }
};

let browser: Browser<any>;
jest.setTimeout(30000);

beforeEach(async () => {
    browser = await wdio.remote(opts);
});

afterEach(async () => {
    await browser.deleteSession();
});

describe('Example Test', () => {
    it('field should be Argentina', async () => {
        let container;
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/recyclerView');
            return container?.error === undefined;
        }, {timeout: 5000, timeoutMsg: 'timeout'});
        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        let field = await container.$$('android.widget.LinearLayout')[0].$('android.widget.TextView');

        expect(await field.getText()).toBe('Argentina');
    });
});