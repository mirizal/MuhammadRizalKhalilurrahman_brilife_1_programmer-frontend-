import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Index1() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [balikkan, setbalikkan] = useState("");
  const [arrayItemsPropinsi, setarrayItemsPropinsi] = useState([]);
  const [arrayItemsAlatKontrasepsi, setarrayItemsAlatKontrasepsi] = useState([]);
  const [selectedPropinsi, setselectedPropinsi] = useState();
  const [selectedAlatKontrasepsi, setselectedAlatKontrasepsi] = useState();
  const [jumlahPemakai, setjumlahPemakai] = useState();

  useEffect(() => {
    const urlPropinsi = "http://127.0.0.1:3123/get/propinsi";
    fetch(urlPropinsi)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          var i = 0;
          var propinsi = [];
          console.log(result[0].Nama_Propinsi);
          for (i = 0; i < result.length; i++) {
            var x = result[i].Nama_Propinsi;
            propinsi.push(x);
          }
          setarrayItemsPropinsi(propinsi);
          console.log(propinsi);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      const urlkontrasepsi = "http://127.0.0.1:3123/get/kontrasepsi";
    fetch(urlkontrasepsi)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          var i = 0;
          var alatKontrasepsi = [];
          console.log(result[0].Nama_Kontrasepsi);
          for (i = 0; i < result.length; i++) {
            var x = result[i].Nama_Kontrasepsi;
            alatKontrasepsi.push(x);
          }
          setarrayItemsAlatKontrasepsi(alatKontrasepsi);
          console.log(alatKontrasepsi);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function handleChange(e) {
    setjumlahPemakai(e.target.value);
    console.log(e.target.value);
  }

  function postToAPI() {
    return fetch('http://127.0.0.1:3123/post/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        Nama_Propinsi: selectedPropinsi, 
        Nama_Kontrasepsi: selectedAlatKontrasepsi, 
        Jumlah_Pemakai: jumlahPemakai 
      })
    })
      .then(response => response.status.toString())
      .then(res => {
        if (res === "200") {
          setbalikkan("Success");
        } else {
        setbalikkan("Failed");
        }
      }).catch(e => {
        setError(e);
        console.log(e);
        setbalikkan("Failed");
      })
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(jumlahPemakai);
    postToAPI();
  }

  return (
    <>
      <div className="main">
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="10">
                <h2 className="text-center">Entry Data Pemakai Alat Kontrasepsi</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Propinsi</label>
                      <Dropdown options={arrayItemsPropinsi} onChange={value => {setselectedPropinsi(value.value); console.log(value.value)}} placeholder="Select an option" />
                    </Col>
                    <Col md="6">
                      <label>Alat Kontrasepsi</label>
                      <Dropdown options={arrayItemsAlatKontrasepsi} onChange={value => {setselectedAlatKontrasepsi(value.value); console.log(value.value)}} placeholder="Select an option" />
                    </Col>
                  </Row>
                  <label>Jumlah Pemakai</label>
                  <Input
                    placeholder="Masukkan Jumlah Pemakai"
                    type="number"
                    rows="1"
                    onChange={handleChange}
                  />
                  <label>Respond: {balikkan}</label>
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Link to="/tabel">
                      <Button type="button" className="btn-fill" color="danger" size="lg">
                        Ke Tabel
                      </Button>
                      </Link>
                    </Col>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button  type="button" className="btn-fill" color="danger" size="lg" onClick={handleClick}>
                        Rekam
                      </Button>
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

export default Index1;
