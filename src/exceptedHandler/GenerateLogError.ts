import * as fs from "fs";
import * as path from "path";
import { Page } from "playwright";


export class GenerateLogError {
  private pathArq = path.join(
    __dirname,
    "..",
    "..",
    "html-report",
    "screenshot",
    "log.json"
  );

  public async screenShotError(page: Page, error: string) {
    let json = this.jsonRead();
    let testeName = global.nameTest;
    let value = this.formatNameString(error);
    let nameReplace = testeName.replace(" ", "").replace(" ", "");
    let nameScreen = `${json.logs.length + 1}-Teste-${nameReplace}`;

    json.logs.push({
      Teste: testeName,
      Erro: value,
      screenshot: nameScreen,
    });

    fs.writeFileSync(this.pathArq, JSON.stringify(json), "utf8");
    await page.screenshot({
      path: `./html-report/screenshot/${nameScreen}.png`,
    });
  }

  private jsonRead(): any {
    let jsonFile = fs.readFileSync(this.pathArq, "utf8");
    let json = JSON.parse(jsonFile);
    return json;
  }

  private formatNameString(name: string) {
    let nameString = String(name);
    let value = nameString.replace(/[^A-Za-z 0-9 - : / . ]/g, "");
    return value;
  }

}
