'use strict';

const PORT = process.env.PORT || 8000;

let jade = require('jade');
let http = require('http');
let nodeStatic = require('node-static');
let qs = require('qs');
let moment = require('moment');

let file = new nodeStatic.Server('./public');

http.createServer((req, res) => {

  console.log( 'req.url: ', req.url );

  let html;

  let themes = ['cerulean', 'cosmo', 'cyborg', 'flatly', 'darkly', 'journal',
  'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab',
  'superhero', 'united', 'yeti'];

  let qsParts = req.url.split('?');
  console.log( 'qsParts: ', qsParts );
  let path =  qsParts[0];
  let query = qs.parse(qsParts[1]);
  let messages = [ {
    "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Mindi",
    "date": moment().format(),
    "url": 'http://img.thrfun.com/img/114/722/bunny_losing_its_fur_ts1.jpg' 
  },
  {
    "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Alicia",
    "date": moment().format(),
    "url": 'http://ccspca.com/wp-content/plugins/igit-related-posts-with-thumb-images-after-posts/timthumb.php?src=/wp-content/uploads/2013/06/SASHA-thumb-150x150.jpg&w=100&h=100&zc=0' 
  },
  {
    "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Denis",
    "date": moment().format(),
    "url": 'http://i308.photobucket.com/albums/kk354/iluffleshim2much/ferret.gif' 
  },
  {
    "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Kim",
    "date": moment().format(),
    "url": 'http://www.thegreenhead.com/imgs/thumbs/lions-mane-cat-hat-2.jpg' 
  },
  {
    "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Damon",
    "date": moment().format(),
    "url": 'http://www.calidris.photography/Birdscapes/2015-0528-WBI/i-NvWfv4w/2/Ti/DSC_3367-Ti.jpg' 
  },
  { "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
    "name": "Austin",
    "date": moment().format(),
     "url": 'http://ep.yimg.com/ay/yhst-63436268999074/lazybeans-bean-bag-polar-bear-10-fiesta-1.gif' 
  }
]
  //console.log( 'query: ', query );
  switch(path){
    case '/': {
      html = jade.renderFile('./views/index.jade', {
        theme: validateTheme(query.theme, themes),
        themes: themes,
        page: ''
    });
      res.end(html);
      break;
    }
    case '/messages': {
      html = jade.renderFile('./views/messages.jade', {
        theme: validateTheme(query.theme, themes),
        messages: messages,
        themes: themes,
        page: 'messages'
      });
      res.end(html);
      break;
    }
    case '/post': {
      html = jade.renderFile('./views/newPost.jade', {
        theme: validateTheme(query.theme, themes),
        themes: themes,
        page: 'post'
      //  Date: moment.format()
      })
      res.end(html);
    }
  }
  file.serve(req, res);
})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log( `Node server listening on ${PORT}` );
})

function validateTheme(theme, themes) {
  if(theme) {
    theme = theme.toLowerCase();
  }

  if(themes.indexOf(theme) != -1) {
    return theme;
  } else {
    return null;
  }
}
