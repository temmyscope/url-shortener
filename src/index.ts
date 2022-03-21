import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { generate } from 'randomized-string';
import { body, validationResult } from 'express-validator';
import { Mongoose } from './configs/db.config';
import { UrlMapModel } from './models/UrlMap';

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

const domain: string = "localhost:3000";

app.post('/api/shorten', [ body('longUrl').isURL({}) ], 
    async(req: Request, res: Response) => {

    let longUrl: string = req.body.longUrl;
    let UrlMap: UrlMapType | null = await UrlMapModel.findOne({ rawUrl: longUrl });

    if ( !(UrlMap instanceof UrlMapModel) || UrlMap == null) {
        let shortUrl: string = generate({
            charset: "hex", lowerCaseOnly: false, length: 8, symbolsOnly: false
        });
        if ( UrlMapModel.countDocuments({ shortUrl }) > 0 ) {
            shortUrl = generate({
                charset: "hex", lowerCaseOnly: false, length: 8, symbolsOnly: false
            });
        }
        UrlMap = new UrlMapModel({ rawUrl: longUrl, shortUrl });
        await UrlMap?.save();
    }

    return res.status(200).json({ 
        success: true, data: { 
            shortUrl: `${domain}/${UrlMap?.shortUrl}`, longUrl,
        }
    });
});

app.get('/:shortId', async(req: Request, res: Response) => {
    let shortUrl: string = req.params.shortId;

    let longUrl: string; 
    
    let urlMap: UrlMapType | null = await UrlMapModel.findOne({ shortUrl: shortUrl });
    longUrl = urlMap?.rawUrl ?? "";
    
    return res.status(200).json({ 
        success: true, data: { longUrl: longUrl }
    });
});

app.listen(3000, () => console.log('The application is listening on port 3000!') );

