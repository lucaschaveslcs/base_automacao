import { Browser, BrowserContext, BrowserType, Page } from "playwright";

export class Setup {
  private browserConfig = {
    // Para visualizar a execução deixar headless = FALSE 
    // Para NÃO ver a execução deixar headless = TRUE
    headless: false, 
    defaultViewport: null,
  };

  //funcao para abrir o navegador 
  public async browserSetup(browserToLaunch: BrowserType): Promise<Browser> {
    console.log("<=======ABRINDO BROWSER========>");
    return await browserToLaunch.launch(this.browserConfig);
  }

  //funcao para iniciar o context e com suas configurações necessarias
  public async browserContext(browser: Browser) {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      //permissions: ["geolocation", "camera", "notifications"],
    });
    //Adicionado geolocalização da Bem Promotora
    //await context.setGeolocation({latitude: -30.028459662222367,longitude: -51.23015503006843,});
    return context;
  }

  //funcao para abrir nova pagina
  public async browserNewPage(context: BrowserContext) {
    console.log("<=======ABRINDO PÁGINA========>");
    return await context.newPage();
  }

  //funcao para fechar a pagina
  public async browserPageClose(page: Page) {
    console.log("<=======FECHANDO PÁGINA========>");
    await page.close();
  }

  //funcao para fechar o browser
  public async browserClose(browser: Browser) {
    console.log("<=======FECHANDO BROWSER========>");
    await browser.close();
  }
}