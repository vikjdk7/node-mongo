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

    it("should get a single store", (done) => {
      const name = `Bailey Road Kart`;
      const storeName = name.toLocaleLowerCase()
      chai
        .request(app)
        .get(`/stores/name/${storeName}`, () => {
          console.log(`store with ${name} is successfully fetched`);
          done();
        })
        .end((err, res) => {
          if (err) {
            console.log(err.message);
            done()
          } else {
            res.should.have.status(200);
            done();
          }
        });
    });

    it("should not get a store", (done) => {
        const name = `Bailey Road Karts`;
        const storeName = name.toLocaleLowerCase()
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
});
