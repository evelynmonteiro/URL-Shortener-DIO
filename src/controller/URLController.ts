import { URLModel } from "../database/model/URL";
import { Request, Response } from "express";
import shorId from "shortid";
import { config } from "../config/Constants";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    // Ver se a URL já não existe
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL });

    if (url) {
      res.json(url);
      return;
    }

    // Criar o hash para essa URL
    const hash = shorId.generate();
    const shortURL = `${config.API_URL}/${hash}`;

    // Salvar a URL no banco
    const newUrl = await URLModel.create({ hash, shortURL, originURL });

    // Retornar a URL que a gente salvou
    res.json(newUrl);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    // Pegar hash da URL
    const { hash } = req.params;

    // Encontrar a URL original pelo hash
    const url = await URLModel.findOne({ hash });

    // Redirecionar para a URL original a partir da que encontramos no BD
    if (url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ error: "URL not found" });
  }
}
