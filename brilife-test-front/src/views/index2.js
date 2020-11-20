import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// reactstrap components
import {
    Button,
    Form,
    Container,
    Row,
    Col,
} from "reactstrap";
import 'react-dropdown/style.css';
import { TableFooter } from '@material-ui/core';

function Index2() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalPil, settotalPil] = useState();
    const [totalKondom, settotalKondom] = useState();
    const [totalIUD, settotalIUD] = useState();
    const [totalTotal, settotalTotal] = useState();

    const useStyles = makeStyles({
        table: {
        minWidth: 650,
        },
    });

    const classes = useStyles();

    useEffect(() => {
        const urlpemakaikontrasepsi = "http://127.0.0.1:3123/get/pemakaikontrasepsi";
        fetch(urlpemakaikontrasepsi)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            let totPil = 0;
            let totKondom = 0;
            let totIUD = 0;
            let totTotal = 0;
            let i = 0;
            for (i = 0; i < result.length; i++) {
                totPil += parseInt(result[i].Pil);
                totKondom += result[i].Kondom;
                totIUD += result[i].IUD;
                totTotal += result[i].Jumlah;
            }
            setItems(result);
            console.log(result);
            console.log(totPil);
            settotalPil(totPil);
            settotalKondom(totKondom);
            settotalIUD(totIUD);
            settotalTotal(totTotal);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        ).then( () => {
            
            
        })
    }, [])

    return (
    <>
        <div className="main">
            <div className="section landing-section">
            <Container>
                <Row>
                <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">BADAN KOORDINASI KELUARGA BERENCANA NASIONAL REKAPITULASI PEMAKAI ALAT KONTRASEPSI DI INDONESIA</h2>
                <Form className="contact-form">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" rowSpan={2}>No.</TableCell>
                                    <TableCell align="center"rowSpan={2}>Propinsi</TableCell>
                                    <TableCell align="center"colSpan={3}>Pemakai Alat Kontrasepsi</TableCell>
                                    <TableCell align="center"rowSpan={2}>Jumlah</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Pil</TableCell>
                                    <TableCell align="center">Kondom</TableCell>
                                    <TableCell align="center">IUD</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {items.map((items) => (
                                <TableRow key={items.id}>
                                    <TableCell component="th" scope="row">
                                        {items.id}
                                    </TableCell>
                                    <TableCell align="left">{items.Propinsi}</TableCell>
                                    <TableCell align="center">{items.Pil}</TableCell>
                                    <TableCell align="center">{items.Kondom}</TableCell>
                                    <TableCell align="center">{items.IUD}</TableCell>
                                    <TableCell align="center">{items.Jumlah}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell align="center"colSpan={2}>Jumlah</TableCell>
                                    <TableCell align="center">{totalPil}</TableCell>
                                    <TableCell align="center">{totalKondom}</TableCell>
                                    <TableCell align="center">{totalIUD}</TableCell>
                                    <TableCell align="center">{totalTotal}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Row>
                        <Col className="ml-auto mr-auto" md="4">
                        <Link to="/index">
                        <Button type="button" className="btn-fill" color="danger" size="lg">
                            Kembali Ke Entry
                        </Button>
                        </Link>
                        </Col>
                    </Row>
                    </Form>
                </Col>
                </Row>
            </Container>
            </div>
        </div>
        </>
    );
}

export default Index2;
