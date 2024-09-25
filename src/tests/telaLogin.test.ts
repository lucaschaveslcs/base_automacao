import { Browser, BrowserContext, chromium, firefox, Page } from "playwright";
import { Actions as LoginPage } from "../objects/pages/login";
import { Setup } from "../setup";

jest.setTimeout(300000)

const setup = new Setup();

describe("Teste de Login", () => {
  let page: Page;
  let context: BrowserContext;
  let browser: Browser;
  let loginPage: LoginPage;

  beforeAll(async () => {
    browser = await setup.browserSetup(chromium);
    context = await setup.browserContext(browser);
  });

  beforeEach(async () => {
    global.nameTest = String(expect.getState().currentTestName);
    page = await setup.browserNewPage(context);
    loginPage = new LoginPage(page);
    await loginPage.goToPage();
  });

  afterEach(async () => {
   await setup.browserPageClose(page);
  });

  afterAll(async () => {
   await setup.browserClose(browser);
  })
  
  test.only("Realizar Login", async () => {   
    await loginPage.goToPage();
  });
});
