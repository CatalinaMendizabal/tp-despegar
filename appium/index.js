const wdio = require("webdriverio");
const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "8",
        deviceName: "Pixel API 26",
        app: "appium/apk/despegar.apk",
        appPackage: "com.gm.despegar",
        appActivity: "com.despegar.ui.splash.SplashActivity",
        automationName: "UiAutomator2"
    }
};

async function main () {
    const client = await wdio.remote(opts);
    console.log("client: ", client);
    //const field = await $$('com.gm.despegar:id/countryName')
    console.log(client.findElement);
    const field = await client.$('com.gm.despegar:id/countryName')
    console.log("field: ", field)
    const value = await field.getText();
    console.log(value);
    assert.strictEqual(value,"Argentina");
    await client.deleteSession();

}

main();


