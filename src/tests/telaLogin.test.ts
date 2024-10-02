import { Browser, BrowserContext, chromium, firefox, Page } from "playwright";
import { Actions as LoginPage } from "../objects/pages/login";
import { Setup } from "../setup";

jest.setTimeout(300000);  //Tempo máximo que cada teste terá para poder executar

const setup = new Setup();

describe("Teste de Login", () => {
  let page: Page;                //Declaração da Page, Page = uma nova Aba dentro do contexto
  let context: BrowserContext;   //Declaração de Context, Context = representa uma nova 'janela' isolada no navegador, onde pode se ter várias pages diferentes
  let browser: Browser;          //Declaração do Browser, Browser refere-se ao navegador que será iniciado para realizar os testes
  let loginPage: LoginPage;      //Declaração de LoginPage, página na qual contém as actions que queremos utilizar

  beforeAll(async () => {                                //Ocorre antes dos testes iniciarem
    browser = await setup.browserSetup(chromium);        //Irá iniciar um navegador
    context = await setup.browserContext(browser);       //Irá abrir uma nova janela
  });

  beforeEach(async () => {                                          //Ocorre antes de CADA teste
    global.nameTest = String(expect.getState().currentTestName);    //Armazena o nome do test numa variavel global
    page = await setup.browserNewPage(context);                     //Instancia uma nova aba dentro da janela que ja foi aberta anteriormente
    loginPage = new LoginPage(page);                                //A página que contém os actions recebe a referencia da page que foi inicializada
  });

  afterEach(async () => {                                          //Ocorre após CADA teste
   await setup.browserPageClose(page);                             //Finaliza a aba do teste
  });

  afterAll(async () => {                                          //Ocorre após todos testes serem executados
   await setup.browserClose(browser);                             //Finaliza o navegador
  })
  
  test.only("Realizar Login", async () => {                       //Caso de teste a ser realizado
    await page.goto("https://www.saucedemo.com/");  
  });
});
