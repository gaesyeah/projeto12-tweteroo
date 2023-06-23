import cors from 'cors';
import express from 'express';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const tweetsList = [];
const users = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!users.find(user => user.username === username)){
        users.push({username, avatar});
    } else {
        //para mudar a foto de perfil caso um usuario ja cadastrado entre de novo com outra foto
        users.forEach(user => {
            if (user.username === username){
                user.avatar = avatar;
            }
        })
    }
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    if(users.find(user => user.username === username)){
        tweetsList.push({username, tweet});
        return res.send('OK');
    }
    res.send('UNAUTHORIZED');
})

app.get('/tweets', (req, res) => {
    const resTweets = [...tweetsList];
    
    for(let i = 0; i < resTweets.length; i++){
        resTweets[i].avatar = users.find(user => user.username === resTweets[i].username).avatar;

        if (resTweets.length > 10){
            resTweets.shift();
        }
    }
        
    res.send(resTweets.reverse());
})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));