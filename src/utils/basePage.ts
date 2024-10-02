import { Page } from "playwright";
import { GenerateLogError } from "../exceptedHandler/GenerateLogError";

export class BasePage {
  constructor(public page: Page) {
    this.page = page;
  }
  private msgError = "Não foi possível encontrar o elemento.";
  private generateLogError = new GenerateLogError();

  //funcao para preencher algum campo selecionado na pagina, necessario passar o campo e o valor que deseja preencher
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

  //funcao para clicar em elementos selecionados, necessario apenas passar o botao que deseja clicar
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

  //funcao para clicar em possiveis pop up que surgir na tela quando necessario, necessario passar o botao do popup caso ele apareça
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

  //Funcao para escolher em um "select" clicando no selector desejado e na opcao desejada, necessário passar qual select e seu valor desejado
  public async select(
    selector: string,
    option: string,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(selector);
      this.highElement(selector);
      await this.page.click(selector);
      this.highElement(selector);
      await this.page.selectOption(selector,{label: option});
    } catch (error) {
      await this.generateLogError.screenShotError(this.page, String(error));
      throw this.msgError;
    }
  }
}
