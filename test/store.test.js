const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Stores", () => {
  describe("GET /", () => {
    it("should get all the stores", (done) => {
      chai
        .request(app)
        .get("/stores", () => {
          console.log("stores fetched successfully");
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });

    it("should get a single store", (done) => {
      const id = `64c629f597badb62caaf20ae`;
      chai
        .request(app)
        .get(`/stores/${id}`, () => {
          console.log(`store with id ${id} is successully fetched`);
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });

    it("should get a single stor", (done) => {
      const name = `Bailey Road Kart`;
      const storeName = name.toLocaleLowerCase();
      chai
        .request(app)
        .get(`/stores/name/${storeName}`, () => {
          console.log(`store with ${name} is successfully fetched`);
          done();
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done();
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });

    it("should not get a store", (done) => {
      const name = `Bailey Road Karts`;
      const storeName = name.toLocaleLowerCase();
      chai
        .request(app)
        .get(`/stores/name/${storeName}`, () => {
          console.log(`store with ${storeName} is successfully fetched`);
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(404);
            done();
          }
        });
    });
  });

  describe("POST", () => {
    it("should insert one store entry", (done) => {
      chai
        .request(app)
        .post(`/stores`)
        .send({
          name: "California Kart",
          description: "An online store for all your needs",
          address: "California, USA",
          phone: "+1 2344534899",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(201);
            done();
          }
        });
    });
    it("should not insert an entry for store if name is missing", (done) => {
      chai
        .request(app)
        .post("/stores")
        .send({
          name: "",
          description: "An online store for all your needs",
          address: "Bailey road, India",
          phone: "+91 2344567899",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(400);
            res.body.should.have
              .property("errormessage")
              .eql(`Store's name is required`);
            done();
          }
        });
    });
    it("should not insert an entry for store if address is missing", (done) => {
      chai
        .request(app)
        .post("/stores")
        .send({
          name: "Autin Kart",
          description: "An online store for all your needs",
          address: "",
          phone: "+1 2344567899",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(400);
            res.body.should.have
              .property("errormessage")
              .eql(`Store's address is required`);
            done();
          }
        });
    });

    it("should not insert an entry for store if phone no is missing", (done) => {
      chai
        .request(app)
        .post("/stores")
        .send({
          name: "Autin Kart",
          description: "An online store for all your needs",
          address: "Bailey road, India",
          phone: "",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(400);
            res.body.should.have
              .property("errormessage")
              .eql(`Store's phone no is required`);
            done();
          }
        });
    });
  });

  describe("PUT", () => {
    it("should update store's data", (done) => {
      const id = "64c8c01a5b0a637e1211710d";
      chai
        .request(app)
        .put(`/stores/${id}`)
        .send({
          name: "Autin Kart",
          description: "An online store for all your needs",
          address: "Bailey road, India",
          phone: "+1 2344567888",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });

    it("should not update store's data", (done) => {
      const id = "64c8c01a5b0a637e12117111";
      chai
        .request(app)
        .put(`/stores/${id}`)
        .send({
          name: "Autin Kart",
          description: "An online store for all your needs",
          address: "Bailey road, India",
          phone: "+1 2344567888",
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });
  });

  describe("DELETE", () => {
    it("should delete a store entry", (done) => {
      const id = `64c8c01a5b0a637e1211710d`;
      chai
        .request(app)
        .delete(`/stores/${id}`)
        .send()
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(204);
            done();
          }
        });
    });
    it("should not delete a store entry", (done) => {
      const id = `64c8c01a5b0a637e12117111`;
      chai
        .request(app)
        .delete(`/stores/${id}`)
        .send()
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done(err);
          } else {
            res.should.have.status(204);
            done();
          }
        });
    });
  });
});
