var express = require('express');
var router = new express.Router();
var knex = require('../db/db.js');

var Constants = require('../helpers/Constants.js');


router.get('/', (req, res) => {
  knex.table('globals').select('*').
  then((data) => {
    var result = {};
    //το στελνει σαν dictionary
    for (var ic = 0; ic < data.length; ic += 1) {
      result[data[ic].Name] = data[ic].Value;
    }
    res.send(result);
  });
});


router.get('/id/:id', (req, res) => {
  knex.table('globals').select('*').
where({ id: req.params.id }).
then((data) => res.send(data[0]));
});

router.get('/:name', (req, res) => {
  knex.table('globals').select('*').
where({ Name: req.params.name }).
then((data) => res.send(data[0]));
});

router.post('/', (req, res) => {
  if (req.user.role != Contants.Roles.Admin) {
    res.sendStatus(403);
  }
  knex.table('globals').insert(req.body).
then((data) => res.send(data));
});



router.post('/change/workingHours', (req, res) => {
  const times = req.body.value;
  knex.table('globals').where({ Name: 'MourgosWorkingHours' }).
  update({ Value: times }).
  then(() => res.send(true));
});


module.exports = router;