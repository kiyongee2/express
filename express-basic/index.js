import express from "express";
import mysql from "mysql";

const app = express();

app.use(express.json()); //json 데이터 파싱

//db 접속 정보
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "jsuser",
    password: "pwjs",
    port: "3306",
    database: "jsdb"
});

db.connect(err => {
    console.log("db 연결 성공!!");
    console.log("err", err);
})

// 서버 포트 번호
app.listen(8000, () => {
    console.log("8000 서버 호출");
});

//기본 주소 요청
app.get("/", ()=>{
    console.log("기본 주소 요청")
});

app.get("/hello", ()=>{
    console.log("/hello 주소 요청")
});

//req - 매개 값
app.get("/qs", (req)=>{
    console.log(req.query)
    console.log(req.query.p1)
    console.log(req.query.p2)
});

app.post("/hello", ()=>{
    console.log("/hello post 요청")
});

app.post("/post-req", (req)=>{
    console.log(req.body)
    console.log(req.body.name)
    const {name, age} = req.body
    console.log(`name: ${name}, age: ${age}`)
});

// client에서 전달된(요청) 데이터를 db에 저장
app.post("/save", (req) => {
    //전달 데이터 받기
    const {name, capital, population} = req.body;
    console.log(`name: ${name}, capital: ${capital}, population: ${population}`);
    const sql = "insert into t_nations(name, capital, population) values (?, ?, ?)";
    db.query(sql, [name, capital, population], (err, results, fields) => {
        console.log("err", err);
        console.log("results", results);
        console.log("fields", fields);
    })
})

//목록 조회 (res -> model 개념- 프런트로 보내줌)
app.get("/list", (req, res) => {
    const sql = "select * from t_nations";
    db.query(sql, (err, results, fields) => {
        console.log("err", err);
        console.log("results", results);
        console.log("fields", fields);
        //프런트로 응답
        res.json(results);
    })
})

// 1건 조회
app.get("/:id", (req, res) => {
    console.log(req.params);
    console.log(req.params.id);

    const id = req.params.id;
    const sql = "select * from t_nations where id = ?";
    db.query(sql, [id], (err, results, fields) => {
        console.log("err", err);
        console.log("results", results);
        //console.log("fields", fields);

        //프런트로 응답
        if(results.length == 0){
            //조회 결과 없음
            res.status(404).send("요청하신 데이터를 찾을 수 없습니다.")
        }else{
            //res.json(results);
            res.status(200).send(results);
        }
    })
})

//수정 처리
app.put("/:id", (req, res) => {
    const {id, name, capital, population} = req.body
    console.log(`id: ${id}, name: ${name}, capital: ${capital}, population: ${population}`);
    const sql = "update t_nations set population = ? where  id = ?"
    db.query(sql, [population, id], (err, results, fields) => {
        console.log("err", err);
        console.log("results", results);
        console.log("fields", fields);
    })
})

// 삭제 처리
app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "delete from t_nations where id = ?";
    db.query(sql, [id], (err, results, fields) => {
        console.log("err", err);
        console.log("results", results);
    })
})
