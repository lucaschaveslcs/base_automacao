import { Page } from "playwright";
import { GenerateLogError } from "../exceptedHandler/GenerateLogError";

export class BasePage {
  constructor(public page: Page) {
    this.page = page;
  }
  private msgError = "Não foi possível encontrar o elemento.";
  private generateLogError = new GenerateLogError();

  public async fillInput(
    input: string,
    text: string,
    timeout?: number
  ): Promise<void> {
    try {
      await this.page.waitForSelector(input,{
        timeout: timeout === undefined ? 60000 : timeout,
      });
      this.highElement(input);
      await this.page.fill(input, text);
    } catch (error) {
      await this.generateLogError.screenShotError(this.page, String(error));
      throw this.msgError;
    }
  }

  //Funcao personalizada para destacar o elemento no qual foi clicado
  public async highElement(selector: string): Promise<void> {
    const high = await this.page.$eval(selector, (high) =>
      high.setAttribute("style", "background: #FF7F50; border: 2px solid red;")
    );
  }

  //funcao para clicar em elementos selecionados
  public async buttonClick(button: string, timeout?: number): Promise<void> {
    try {
      await this.page.waitForSelector(button, {
        timeout: timeout === undefined ? 60000 : timeout,
      });
      this.highElement(button);
      await this.page.click(button);
    } catch (error) {
      await this.generateLogError.screenShotError(this.page, String(error));
      throw this.msgError;
    }
  }

  public async popUpConfirme(
    selector: string,
    timeout: number
  ): Promise<void> {
    try {
      await this.page.waitForTimeout(timeout);
      const button = await this.page.isVisible(selector);
      if (!button) {
        return;
      }
      this.highElement(selector);
      await this.page.click(selector);
      return;
    } catch (error) {
      await this.generateLogError.screenShotError(this.page, String(error));
      throw this.msgError;
    }
  }

 
  //Funcao para escolher em um "select" clicando no selector desejado e na opcao desejada
  public async select(
    selector: string,
    option: string,
    timeout?: number
  ): Promise<void> {
    try {
      await this.page.waitForSelector(selector,{
        timeout: timeout === undefined ? 60000 : timeout,
      });
      this.highElement(selector);
      await this.page.click(selector);
      const element = await this.page.isVisible(option);
      if (!element) {
        this.highElement(selector);
        await this.page.click(selector);
      }
      this.highElement(option);
      await this.page.click(option);
    } catch (error) {
      await this.generateLogError.screenShotError(this.page, String(error));
      throw this.msgError;
    }
  }
}
