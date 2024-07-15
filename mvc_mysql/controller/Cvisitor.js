const Visitor = require('../model/Visitor');

// GET '/' - index
exports.main = (req, res) => {
  res.render('index.ejs');
}

// GET '/visitors' - 방명록 목록
exports.get_visitors = (req, res) => {
  Visitor.getVisitors((result) => {
    //모델의 rows를 result로 받아냄
    console.log('Cvisitor.js > ', result);
    res.render('visitor.ejs', {data: result});
  })
}

// POST '/visitor'
exports.post_visitor = (req, res) => {
  console.log(req.body);
  const { name, comment } = req.body;
  Visitor.postVisitor(req.body, (result) => {
    // result: rows.insertId => ex) 3
    console.log(result);
    res.send({ id: result, name, comment})
  })
}

// GET '/visitor' => localhost:PORT/visitor?id=N
exports.get_visitor = (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  Visitor.getVisitor(req.query.id, (result) => {
    // result: rows[0] 
    console.log('get_visitor Cvisitor.js > ', result);
    res.send(result);
  })
}

exports.delete_visitor= (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  Visitor.deleteVisitor(req.body.id, (result) => {
    console.log('get_visitor Cvisitor.js > ', result);
    res.send("삭제 성공!!");
  })
}