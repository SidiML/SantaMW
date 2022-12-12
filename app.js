const express = require('express')
const app = express()
const port = 3000
const mysql = require('promise-mysql')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const connectionOption = {
    host: "localhost",
    database: "SantaMW",
    user:"root",
    password: "",
    port: 3306
}

mysql.createConnection(connectionOption)
.then(async(db) => {
    app.get('/',function(req, res) {
        res.json('Bien connecté')
    })

app.get('/categories' , (req, res) => {
    db.query('SELECT * FROM categories', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        res.sendStatus(404);
    })
    });

// show
app.get('/categories/:id' , (req, res) => {
    const result = db.query('SELECT * FROM categories WHERE id = ?',[req.params.id], (err,rows, fields) => {
               
        if (!err){
            res.send(rows);
        }else{
            res.sendStatus(404);
        } 
        
        
    })
    });

// create
app.post('/categories', async(req,res) => {
    //console.log(req.body) // visible dans le terminal
    const name = req.body.name
    const responseDB = await db.query('INSERT INTO categories (name) VALUES (?)',[name])
    res.json({status:200, responseDB})
});

// app.put('/categorie/:id',(req, res) => {
//     let sqlQuery = `UPDATE categoriess SET WHERE id=? name=?`,[id,name]
//     let query = db.query(sqlQuery, (err, results) => {
//       if(err) throw err;
//       res.send(apiResponse(results));
//     });
//   });
// Update

app.put('/categories/:id', async (req,res) => {
    const {id} = req.params
    const {name} = req.body;
    const responseDB = await db.query("UPDATE categories SET name=? WHERE id=?",[name, id])
    res.json({status:200, responseDB})
});

app.delete('/categories/:id', async(req,res) => {
    const {id} = req.params;
    const responseDB = await db.query("DELETE FROM categories WHERE id=?", [id])
    res.json({status:200, responseDB})
});

})

    




app.listen(3000,() => {
    console.log(`j'ecoute sur le port `)
})