// const Visitor = require('../models/Visitor')
const models = require('../models/index')
const Visitor = models.Visitor;

// get '/'
exports.main = (req, res) => {
  res.render('index');
}

// get '/visitors'
exports.get_visitors = (req, res) => {
  // select ~ from
  Visitor.findAll().then((result) => {
    console.log('findAll >', result);
    res.render('visitor', { data: result })
  })
}

// post '/visitor'
exports.post_visitor = (req, res) => {
  console.log(req.body);
  const { name, comment } = req.body;
  // insert into ~ values
  Visitor.create({
    name: name,
    comment: comment
  }).then((result) => {
    console.log('create >', result);
    res.send(result);
  })
}

// get '/visitor' - localhost:PORT/visitor?id=1
exports.get_visitor = (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  // insert into ~ values
  Visitor.findOne({
    where: {id: req.query.id}
  }).then((result) => {
    console.log('findOne >', result);
    res.send(result);
  })
}

// get '/visitor' - localhost:PORT/visitor/:id
exports.get_visitor2 = (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  // insert into ~ values
  Visitor.findOne({
    where: {id: req.params.id}
  }).then((result) => {
    console.log('findOne2 >', result);
    res.send(result);
  })
}

// delete '/visitor'
exports.delete_visitor = (req, res) => {
  console.log(req.body.id);
  // insert into ~ values
  Visitor.destroy({
    where: {id: req.body.id}
  }).then((result) => {
    console.log('destory >', result);
    res.send('삭제 성공!');
  })
}

// update /visitor
exports.put_visitor = (req, res) => {
  console.log(req.body);

  Visitor.update(
    {
      name: req.body.name,
      comment: req.body.comment
    },
    {
      where: {id: req.body.id}
    }
  ).then((result) => {
    console.log('update >', result);
    res.send('수정 성공!')
  })
}
