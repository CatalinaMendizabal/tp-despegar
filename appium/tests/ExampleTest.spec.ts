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
        app: "/Users/tefiporacchia/Proyects/tp-despegar/appium/apk/despegar.apk",
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
    xit('field should be Argentina', async () => {
        let container;
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/recyclerView');
            return container?.error === undefined;
        }, {timeout: 5000, timeoutMsg: 'timeout'});
        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        let field = await container.$$('android.widget.LinearLayout')[0].$('android.widget.TextView');

        expect(await field.getText()).toBe('Argentina');
    });

    xit('field should be Bolivia', async () => {
        let container;
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/recyclerView');
            return container?.error === undefined;
        }, {timeout: 5000, timeoutMsg: 'timeout'});
        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        let field = await container.$$('android.widget.LinearLayout')[1].$('android.widget.TextView');
        expect(await field.getText()).toBe('Bolivia');
    });

    xit('field should be Brasil', async () => {
        let container;
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/recyclerView');
            return container?.error === undefined;
        }, {timeout: 5000, timeoutMsg: 'timeout'});
        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        let field = await container.$$('android.widget.LinearLayout')[1].$('android.widget.TextView');
        expect(await field.getText()).toBe('Bolivia');
    });

    it('Click Argentina, click login, enter credentials and check for flights', async () => {
        let container;
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/recyclerView');
            return container?.error === undefined;
        }, {timeout: 5000, timeoutMsg: 'timeout'});

        container = await browser.$('id:com.gm.despegar:id/recyclerView');
        await container.$$('android.widget.LinearLayout')[0].click();

        await browser.waitUntil(async () => {
            container = await browser.$('android.widget.ProgressBar')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        //Should show up as loading
        container = await browser.$('android.widget.ProgressBar');

        await browser.waitUntil(async () => {
            container = await browser.$('android.widget.RelativeLayout')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        container = await browser.$('android.widget.RelativeLayout');

        //Should have the desired login button
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/button_loginhomefragment_despegarlogin')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        container = await browser.$('id:com.gm.despegar:id/button_loginhomefragment_despegarlogin');
        await container.click();


        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/emailView_loginwithemailpasswordfragment')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        //Filling inputs with credentials to log in
        await browser.$('id:com.gm.despegar:id/edittext_viewemail_email').setValue("Tefitaok@yahoo.com.ar");
        await browser.$('id:com.gm.despegar:id/edittext_viewpassword_password').setValue("Despegar12");
        await browser.$('id:com.gm.despegar:id/button_loginwithemailpasswordfragment_login').click();

        //Should show up as loading again
        await browser.waitUntil(async () => {
            container = await browser.$('android.widget.ProgressBar')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        container = await browser.$('android.widget.ProgressBar');

        //Plane icon button should appear for clicking
        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/productIcon');
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        await browser.$('id:com.gm.despegar:id/productIcon').click();

        await browser.waitUntil(async () => {
            container = await browser.$('id:com.gm.despegar:id/embedded_container')
            return container?.error === undefined;
        }, {timeout: 10000, timeoutMsg: 'timeout'});

        let destinoField = await browser.$$('id:com.gm.despegar:id/sboxPlace')[1];

        // "Where do you plan to take a flight to?" input should appear
        expect(await destinoField.getText()).toBe('Ingresá hacia dónde viajas');


        //Si rompe, sacarle el acento a la o de dónde, correr el test y que falle, y despues volver a agregarselo, y va a correr bien

    });
});