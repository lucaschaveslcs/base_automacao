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
  
  //instanciando objetos de classes que serão utilizadas para realizar as ações na página
  private base = new BasePage(this.page);
  private generateLogError = new GenerateLogError();

  //classe onde criamos todas as funcoes para realizar as ações na página
  public async goToPage(): Promise<void> {
    await this.page.goto(process.env.URL+ "", { timeout: 30000 });
  }
  
}
export { Actions };
