import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { body } from 'express-validator';
import { Mongoose } from './configs/db.config';
import { UrlMapModel } from './models/UrlMap';
import { generateShortCode } from './utils/helpers';

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const app: Express = express();
app.use(express.json({ limit: '15MB' }));

Mongoose.connectDB();

type UrlMapType = {
    shortUrl: string;
    rawUrl: string;
    save: () => any
}

const domain: string = "localhost:8000";

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("../swagger.json");


app.post('/api/shorten', [ body('longUrl').isURL({}) ], 
    async(req: Request, res: Response) => {

    let longUrl: string = req.body.longUrl;
    let UrlMap: UrlMapType | null = await UrlMapModel.findOne({ rawUrl: longUrl });

    if ( !(UrlMap instanceof UrlMapModel) || UrlMap == null) {
        let shortUrl: string = generateShortCode(5, 8);

        if ( UrlMapModel.countDocuments({ shortUrl }) > 0 ) {
            shortUrl = generateShortCode(5, 8);
        }
        UrlMap = new UrlMapModel({ rawUrl: longUrl, shortUrl });
        await UrlMap?.save();
    }

    return res.status(200).json({ 
        success: true, data: { 
            shortUrl: `${domain}/${UrlMap?.shortUrl}`
        }
    });
});

app.post('/api/resolve', [ body('shortId').isString(), body('shortId').isAlphanumeric() ], 
    async(req: Request, res: Response) => {

    let shortUrl: string = req.body.shortId;
    let longUrl: string; 

    let urlMap: UrlMapType | null = await UrlMapModel.findOne({ shortUrl: shortUrl });

    if ( urlMap == null ) {
        return res.status(404).json({ success: false, status: "link not found" });
    }
    longUrl = urlMap.rawUrl ?? "";

    return res.status(200).json({ success: true, data: { longUrl: longUrl } });
});

app.use(
    '/api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(8000, () => console.log('The application is listening on port 8000!') );