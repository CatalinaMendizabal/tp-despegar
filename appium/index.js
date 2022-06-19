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

async function main () {
    const browser = await wdio.remote(opts);
    let container;
    await browser.waitUntil(async () => {
        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        return container?.error === undefined;
    }, {timeout: 5000, timeoutMsg: 'timeout'});
    let field = await container.$$('android.widget.LinearLayout')[0].$('android.widget.TextView');
    console.log("field: ", await field.getText());
    await browser.deleteSession();
}

main();


