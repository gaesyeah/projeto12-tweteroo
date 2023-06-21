import cors from 'cors';
import express from 'express';

const PORT = 5000;
const app = express();
app.use(cors());

app.get('/tweets', (req, res) => {
    const MOCK = [
        {
            username: "bobesponja",
            avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
            tweet: "Eu amo hambúrguer de siri!"
        }
    ];

    res.send(MOCK);
})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${5000}`));