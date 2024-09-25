import { Browser, BrowserContext, BrowserType, Page } from "playwright";

export class Setup {
  private browserConfig = {
    // Para visualizar a execução deixar headless = FALSE 
    // Para NÃO ver a execução deixar headless = TRUE
    headless: false, 
    defaultViewport: null,
  };

  public async browserSetup(browserToLaunch: BrowserType): Promise<Browser> {
    console.log("<=======ABRINDO BROWSER========>");
    return await browserToLaunch.launch(this.browserConfig);
  }

  public async browserContext(browser: Browser) {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      //permissions: ["geolocation", "camera", "notifications"],
    });
    //Adicionado geolocalização da Bem Promotora
    //await context.setGeolocation({latitude: -30.028459662222367,longitude: -51.23015503006843,});
    return context;
  }

  public async browserNewPage(context: BrowserContext) {
    console.log("<=======ABRINDO PÁGINA========>");
    return await context.newPage();
  }

  public async browserPageClose(page: Page) {
    console.log("<=======FECHANDO PÁGINA========>");
    await page.close();
  }

  public async browserClose(browser: Browser) {
    console.log("<=======FECHANDO BROWSER========>");
    await browser.close();
  }
}