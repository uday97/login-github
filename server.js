var express=require('express');
const axios=require('axios');

const clientID = 'c6f21a44ed70d22d614e';
const clientSecret = 'c610f8f8d5d0e881733b9b9ecf147ddea865e0e3';

var app=express();

app.use(express.static(__dirname + '/public'));

app.get('/callback', (req, res) => {
    const requestToken = req.query.code
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      const accessToken = response.data.access_token
      res.redirect(`/welcome.html?access_token=${accessToken}`)
    })
  })

app.listen(8000,()=>{
    console.log('Server running on port 8000');
})

