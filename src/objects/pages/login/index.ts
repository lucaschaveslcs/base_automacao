const dotenv = require("dotenv");
dotenv.config();
import { Page } from "playwright";
import { GenerateLogError } from "../../../exceptedHandler/GenerateLogError";
import { Selectors } from "./Elements";
import { BasePage } from "../../../utils/basePage";

class Actions {
  constructor(private page: Page) {
    this.page = page;
  }

  private credenciais: any={
    loginValido: {
      login: process.env.LOGIN_VALIDO,
      pass: process.env.PASSWORD_VALIDO,
    },
    loginInvalido: {
      login: process.env.LOGIN_INVALIDO,
      pass: process.env.PASSWORD_INVALIDO,
    }
  }
  
  //instanciando objetos de classes que serão utilizadas para realizar as ações na página
  private base = new BasePage(this.page);
  private generateLogError = new GenerateLogError();

  //classe onde criamos todas as funcoes para realizar as ações na página
  public async goToPage(): Promise<void> {
    await this.page.goto(process.env.URL+ "", { timeout: 30000 });
  }

  //action para realizar login 
  public async realizarLogin(users: string): Promise<void>{
    const user = this.credenciais[users]
    //preenchendo campo username
    await this.base.fillInput(Selectors.inputUsername, user.login);
    //preenchendo campo password
    await this.base.fillInput(Selectors.inputPassword, user.pass);
    //clicar no botao login
    await this.base.buttonClick(Selectors.botaoLogin);
  
}

 //funcao para validar login 
 public async validarLogin(): Promise<boolean> {
  try{
   //await this.page.waitForSelector(Selectors.validator);  Podemos utilizar essa função ou simplesmente por o timeout como abaixo
   const elemento = await this.page.isVisible(Selectors.validator, { timeout: 60000 });
   if(!elemento){
    await this.generateLogError.screenShotError(this.page, "Erro ao efetuar login");
    return false;
   }
   return true;
 }  catch (error) {
  await this.generateLogError.screenShotError(this.page, String(error));
  throw error;
}
}

 //funcao para validar mensagem de erro 
 public async validarMensagemErro(): Promise<boolean>{
  try{
   //await this.page.waitForSelector(Selectors.validator);  Podemos utilizar essa função ou simplesmente por o timeout como abaixo
   const msgErro = await this.page.isVisible(Selectors.msgError, { timeout: 60000 });
   if(!msgErro){
    await this.generateLogError.screenShotError(this.page, "Não foi possível validar mensagem");
    return false;
   }
   return true;
 }catch (error) {
  await this.generateLogError.screenShotError(this.page, String(error));
  throw error;
}
}


}
export { Actions };
