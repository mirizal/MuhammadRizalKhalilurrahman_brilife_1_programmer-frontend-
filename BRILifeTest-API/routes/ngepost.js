const express = require("express");
const { string } = require("joi");
const Router = express();
const Joi = require('joi');
const mySQLconnection = require("../connection");


Router.use(express.json());

Router.get("/", ( req, res) => {
    res.send("This is post");
});

function altPost (tambahan, idPropinsi, idAlatKontrasepsi, req, res) {
    mySQLconnection.connectionAbsen.query(`UPDATE list_pemakai_kontrasepsi SET Jumlah_Pemakaian = ${tambahan} WHERE id_Propinsi = ${idPropinsi} AND id_Kontrasepsi = ${idAlatKontrasepsi}`, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.status(200);
            res.send("ok");
        } else {
            console.log(err);
            res.status(400);
            res.send("err: "+ err);
            return;
        }
    });
}

Router.post("/entry", (req, res) => {
    const Propinsi = req.body.Nama_Propinsi;
    const AlatKontrasepsi = req.body.Nama_Kontrasepsi;
    const JumlahPemakai = req.body.Jumlah_Pemakai;
    var idPropinsi;
    var idAlatKontrasepsi;
    console.log("Propinsi: " + Propinsi);
    console.log("AlatKontrasepsi: " + AlatKontrasepsi);
    console.log("JumlahPemakai: " + JumlahPemakai);
    if (Propinsi && AlatKontrasepsi && JumlahPemakai) {
        mySQLconnection.connectionAbsen.query(`SELECT id_Propinsi FROM list_propinsi WHERE Nama_Propinsi = '${Propinsi}'`, (err, rows, fields) => {
            if (!err) {
                idPropinsi = rows[0].id_Propinsi;
                mySQLconnection.connectionAbsen.query(`SELECT id_Kontrasepsi FROM list_kontrasepsi WHERE Nama_Kontrasepsi = '${AlatKontrasepsi}'`, (err, rows, fields) => {
                    if (!err) {
                        idAlatKontrasepsi = rows[0].id_Kontrasepsi;
                        console.log("idPropinsi: " + idPropinsi);
                        console.log("idAlatKontrasepsi: " + idAlatKontrasepsi);
                        mySQLconnection.connectionAbsen.query(`SELECT * FROM list_pemakai_kontrasepsi WHERE id_Propinsi = ${idPropinsi} AND id_Kontrasepsi = ${idAlatKontrasepsi}`, (err, rows, fields) => {
                            if (!err) {
                                if (rows.length == 0) {
                                    mySQLconnection.connectionAbsen.query(`INSERT INTO list_pemakai_kontrasepsi (id_Propinsi, id_Kontrasepsi, Jumlah_Pemakaian) VALUES (${idPropinsi}, ${idAlatKontrasepsi}, ${JumlahPemakai})`, (err, rows, fields) => {
                                        if (!err) {
                                            console.log(rows);
                                            res.status(200);
                                            res.send("ok");
                                        } else {
                                            console.log(err);
                                            res.status(400);
                                            res.send("err: "+ err);
                                            return;
                                        }
                                    });
                                } else {
                                    altPost((rows.length > 0) ? (parseInt(rows[0].Jumlah_Pemakaian) + parseInt(JumlahPemakai)) : null, idPropinsi, idAlatKontrasepsi, req, res);
                                }
                            } else {
                                console.log(err);
                                res.status(400);
                                res.send("err: "+ err);
                                return;
                            }
                        });
                    } else {
                        console.log(err);
                        res.status(404);
                        res.send("Alat Kontrasepsi tidak dapat Ditemukan");
                        return;
                    }
                });
            } else {
                console.log(err);
                res.status(404);
                res.send("Propinsi tidak dapat Ditemukan");
                return;
            }
        });
    } else {
        res.status(400);
        res.send("Empty Field");
        console.log("Empty Field");
    }
});

module.exports = Router;