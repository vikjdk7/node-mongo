const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {
    // Test to get all users
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    // Test to get single user
    it("should get a single user record", (done) => {
      const id = `64be5fc67c6f86a6f49cc775`;
      chai
        .request(app)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to get single user record
    it("should not get a single user record", (done) => {
      const id = "64be5fc67c6f86a6f49cc999";
      chai
        .request(app)
        .get(`/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("POST", () => {
    it("should add a new user", (done) => {
      chai
        .request(app)
        .post(`/users`)
        .send({
          username: "Kathie123",
          password: "123458",
          email: "kathie12@gmail.com",
          firstname: "Kathie",
          lastname: "Sierra",
          phone: "9891982111",
        })
        .end((err, res) => {
          if (typeof res !== "undefined") {
            res.should.have.status(201);
            done();
          } else {
            res.should.have.status(500);
            done();
          }
        });
    });
  });

  describe("PUT", () => {
    it("should update a user's information", (done) => {
      const id = `64c225f7c572c3a799c3ff8b`;
      chai
        .request(app)
        .put(`/users/${id}`)
        .send({
          username: "Peter123",
          password: "123458",
          email: "peter@gmail.com",
          firstname: "Peter",
          lastname: "parker",
          phone: "1234567799",
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

    it("should not update a user's information", (done) => {
      const id = `64c225f7c572c3a799c3ff34`;
      chai
        .request(app)
        .put(`/users/${id}`)
        .send({
          username: "Peter123",
          password: "123458",
          email: "peter@gmail.com",
          firstname: "Peter",
          lastname: "parker",
          phone: "1234567799",
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
    it("should remove a user's information", (done) => {
      const id = `64c225f7c572c3a799c3ff8b`;
      chai
        .request(app)
        .delete(`/users/${id}`)
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
    it("should not remove a user", (done) => {
      const id = `64c225f7c572c3a799c3ff77`;
      chai
        .request(app)
        .delete(`/users/${id}`)
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
    it("should remove all users", (done) => {
      chai
        .request(app)
        .delete(`/users`)
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

    it("should not remove all users", (done) => {
      chai
        .request(app)
        .delete(`/users`)
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
