const express = require("express");
const Router = express();
const Joi = require('joi');
const mySQLconnection = require("../connection");
var mysql = require('mysql');

Router.use(express.json());

Router.get("/", ( req, res) => {
    res.send("This is get");
});

Router.get("/propinsi", ( req, res) => {
    mySQLconnection.connectionAbsen.query("SELECT * FROM list_propinsi", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

Router.get("/kontrasepsi", ( req, res) => {
    mySQLconnection.connectionAbsen.query("SELECT * FROM list_Kontrasepsi", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

// Router.get("/pemakaikontrasepsi", ( req, res) => {
//     mySQLconnection.connectionAbsen.query("SELECT * FROM list_pemakai_kontrasepsi", (err, rows, fields) => {
//         if (!err){
//             res.send(rows);
//         }else{
//             console.log(err);
//         }
//     });
// });

function searchJumlahPemakai(idPropinsi, idKontrasepsi, myArray) {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id_Propinsi == idPropinsi) {
            if (myArray[i].id_Kontrasepsi == idKontrasepsi) {
                return myArray[i].Jumlah_Pemakaian;
            }
        }
    }
}


Router.get("/pemakaikontrasepsi", ( req, res) => {
    mySQLconnection.connectionAbsen.query("SELECT * FROM list_pemakai_kontrasepsi", (err, rows, fields) => {
        if (!err){
            var listPemakaiKontrasepsi = rows;
            mySQLconnection.connectionAbsen.query("SELECT * FROM list_propinsi", (err, rows, fields) => {
                if (!err){
                    var listPropinsi = rows;
                    mySQLconnection.connectionAbsen.query("SELECT * FROM list_Kontrasepsi", (err, rows, fields) => {
                        if (!err){
                            var pused = [];
                            var listKontrasepsi = rows;
                            for (i = 0; i < listPropinsi.length; i++) {
                                var pil = searchJumlahPemakai((i+1),1,listPemakaiKontrasepsi);
                                var kondom = searchJumlahPemakai((i+1),2,listPemakaiKontrasepsi);
                                var iud = searchJumlahPemakai((i+1),3,listPemakaiKontrasepsi);
                                var kontra = {
                                    "id": (i+1),
                                    "Propinsi":listPropinsi[i].Nama_Propinsi,
                                    "Pil": (pil ? pil : 0),
                                    "Kondom": (kondom ? kondom : 0),
                                    "IUD": (iud ? iud : 0),
                                    "Jumlah": ((pil ? pil : 0) + (kondom ? kondom : 0) + (iud ? iud : 0)),
                                };
                                pused.push(kontra);
                            }
                            res.status(200);
                            res.send(pused);
                        }else{
                            console.log(err);
                        }
                    });
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});


module.exports = Router;