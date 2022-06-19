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
    client.refresh;
    console.log(client.findElement);
    const field = await client.$$("android.widget.FrameLayout")
    console.log("field: ",field);
    const field2 = await client.$$("android.widget.LinearLayout");
    console.log("field2: ",field2);

    const field23ViewGroup = await client.$$("id:com.gm.despegar:id/countryName");
    console.log("Names: ",field23ViewGroup);


    assert.strictEqual(field3,"Argentina");
    await client.deleteSession();

}

main();


