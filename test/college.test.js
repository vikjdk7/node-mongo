const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("College API", () => {
  describe("GET /colleges", () => {
    it("It should GET all the colleges", (done) => {
      chai
        .request(app)
        .get("/colleges")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
  });
  describe("GET /college/:id", () => {
    it("It should GET a college by ID", (done) => {
      const collegeId = "5f1d3a9a1c9d440000a3f7c8";
      chai
        .request(app)
        .get("/college/" + collegeId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
  describe("POST /college", () => {
    it("It should POST a new college", (done) => {
      const college = {
        name: "St. Xavier's College",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        noOfStudents: 10000,
        courses: ["BSc", "BA", "BCom"],
      };
      chai
        .request(app)
        .post("/college")
        .send(college)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          done();
        });
    });
  });
  describe("PUT /college/:id", () => {
    it("It should PUT an existing college", (done) => {
      const collegeId = "5f1d3a9a1c9d440000a3f7c8";
      const college = {
        name: "St. Xavier's College",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        noOfStudents: 10000,
        courses: ["BSc", "BA", "BCom"],
      };
      chai
        .request(app)
        .put("/college/" + collegeId)
        .send(college)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
  describe("DELETE /college/:id", () => {
    it("It should DELETE an existing college", (done) => {
      const collegeId = "5f1d3a9a1c9d440000a3f7c8";
      chai
        .request(app)
        .delete("/college/" + collegeId)
        .end((err, response) => {
          response.should.have.status(204);
          done();
        });
    });
  });
  describe("DELETE /colleges", () => {
    it("It should DELETE all colleges", (done) => {
      chai
        .request(app)
        .delete("/colleges")
        .end((err, response) => {
          response.should.have.status(204);
          done();
        });
    });
  });

  describe("GET /college", () => {
    it("should get colleges with user filter", (done) => {
      chai
        .request(app)
        .get("/college")
        .query({ name: "St. Xavier's College" })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
  });
});
