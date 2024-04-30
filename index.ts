import express, {Request, Response, NextFunction} from 'express';
import {inspect} from 'util';

const PORT = 28429;

const app = express();

app.use((req: Request & { rawBody?: any }, res: Response, next: NextFunction) => {
    let rawData = '';

    req.on('data', (chunk: Buffer) => {
        rawData += chunk.toString();
    });

    req.on('end', () => {
        req.rawBody = rawData;
        next();
    });
});

app.all('*', (req: Request & { rawBody?: any }, res: Response) => {
    console.log('');
    try {
        console.log(req.method, req.url);
        console.log('-----------');
        console.log('===req.rawBody===');
        console.log(req.rawBody);
        const body: any = JSON.parse(req.rawBody);
        console.log('===JSON===');
        console.log(body);
        const output = JSON.parse(body.output);
        console.log('===output JSON===');
        console.log(inspect(output, {depth: Infinity}));
    } catch (e) {
    }
    res.status(200).json({message: 'Received your request!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
