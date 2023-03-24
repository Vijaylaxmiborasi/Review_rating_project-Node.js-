let server = require("../index");
let chaiHttp = require('chai-http');
var chai = require('chai');
const utils = require("../models/userModelSchema");
const routes = require('../Routes/userRoute');

chai.should();
chai.use(chaiHttp);

//TEst the get resource limits
describe('User login api', () =>{
describe('POST/api/user', () => {
  it("It should return login user detail : ",(done)=>{
    const data = {
          userEmail : "vijaylaxmiborasi1526@gmail.com",
          password : "Vijaylaxmi@26"
    };
    chai
    .request(server)
    .post("/user/user_login")
    .send(data)
    .end((err, res)=>{
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property('success').eq('success');
        res.body.should.have.property('message').eq('Login Success');
        res.body.should.have.property('token');
        done();
    });
  });

  it("It should return error message detail : ",(done)=>{
    const data = {
        userEmail : "vijaylaxmiborasi152@gmail.com",
        password : "Vijaylaxmi@26"
    };
    chai
    .request(server)
    .post("/user/user_login")
    .send(data)
    .end((err, res)=>{
        res.should.have.status(401);
        res.body.should.have.property('success').eq('failure');
        res.body.should.have.property('message').eq('Invalid credentials.');
        
    });
    done(); 
  });
  it('It should return Email or password Error Message :',(done)=>{
    const data = {
      userEmail : "vijaylaxmiborasi1526@gmail.com",
      password : "Vijaylax",
    };
    chai
    .request(server)
    .post("/user/user_login")
    .send(data)
    .end((err, res)=>{
      res.should.have.status(401);
      res.body.should.have.property('success').eq('failure');
      res.body.should.have.property('message').eq('Invalid credentials.') 
      done();
    })
  })
});
});



