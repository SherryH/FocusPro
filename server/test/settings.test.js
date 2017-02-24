var router = require('../routers.js');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
var routes = router(app, '');
const request = require('supertest');
const pg = require('pg');
const db = require('../databases/Schema.js');

const chai = require('chai');

const expect = chai.expect;

//set up DB connection
before((done) =>{
  //more on connection: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WKyhjBIrInU
  const connectionString = process.env.DATABASE_URL || require('../config/config.js').LOCAL_DATABASE_URL;
  global.client = new pg.Client(connectionString);
  global.client.connect();
  done();
});

//close DB connection
after(() =>{
  global.client.end();
});

/*
var Setting = db.define('Setting', {
  picture: Sequelize.STRING,
  quote: Sequelize.STRING,
  reflection_freq: Sequelize.INTEGER,
  reminder: Sequelize.BOOLEAN,
  reminder_type: Sequelize.STRING,
  reminder_freq: Sequelize.INTEGER,
  reminder_address: Sequelize.STRING
});

//Extension schema
var Extension = db.define('Extension', {
  url: {type: Sequelize.STRING, unique: true},
  time_spent: Sequelize.INTEGER,
  freq: Sequelize.INTEGER
});

//Url schema
var Url = db.define('Url', {
  url: {type: Sequelize.STRING, unique: true},
  blacklist_type: Sequelize.STRING,
  blacklist_time: Sequelize.INTEGER
});
*/

describe('GET and POST requests FOR SETTINGS', () => {
    //load dummy data
  beforeEach((done) =>{
    var user1 = {username: 'dummy3', email: 'example@gmail.com', auth0_id: 'auth_id3', daily_goal: 'wakeup earlier than yesterday'};
    var user2 = {username: 'dummy2', email: 'example1@gmail.com', auth0_id: 'auth_id4', daily_goal: 'wakeup before noon'};
     //var blacklist = {UserId: UserId1, url: "www.gmail@com", blacklist_type: "Infrequent", "blacklist_time": 10}
   

    db.User.create(user1).then(function(user) {
      global.UserId = user.id;
      db.User.create(user2).then(function(user){
        var setting1 = {picture: "Dumb", quote: "Laconic", reflection_freq: 10, 
        reminder: false, reminder_type: "Regular", reminder_freq: 10, reminder_address: "Apple Street", UserId: UserId}
        db.Setting.create(setting1).then(function(setting) {
            done();
          });
      });
    });
  });
/*
    db.User.create(user2).then(function(user) {
      global.UserId2 = user.id;
      var extension = {url: "www.yahoo.com", time_spent: 20, freq: 30}
      db.Extension.create(extension).then(function(extension) {
        done();
      })
    })
  });
*/
  //clean dummy data
  afterEach((done) =>{
    //delete all users in db
    db.User.destroy({where:{}}).then((num) => {
      done();
    });
  });

  describe('POST NEW SETTINGS', () =>{
    it('/api/users/:auth0_id/setting creates settings',(done) =>{
      console.log('POST in goals', UserId);
      const dummySetting = {picture: "Dumb", quote: "Laconic", reflection_freq: 10, reminder: false, reminder_type: "Regular", reminder_freq: 10, reminder_address: "Apple Street",
      UserId: UserId};
      request(app)
      .post('/api/users/auth_id3/setting')
      .send(dummySetting)
      .end((err,res) =>{
        if(err) {
          console.error('POSTING TO SETTINGS ERROR: \n',err);
        }
        expect(res.statusCode).to.equal(201);
        expect(res.body.data.picture).to.equal(dummySetting.picture);
        //expect(res.body.data.quote).to.equal(dummySetting.quote);
        expect(res.body.data.reflection_freq).to.equal(dummySetting.reflection_freq);
        expect(res.body.data.reminder).to.equal(dummySetting.reminder);
        expect(res.body.data.reminder_address).to.equal(dummySetting.reminder_address);
        expect(res.body.data.reminder_freq).to.equal(dummySetting.reminder_freq);
        expect(res.body.data.reminder_type).to.equal(dummySetting.reminder_type);
        done();
      });
    });
  });
  /*

  describe('GET all settings', () =>{
    it('/api/users/:username/setting fetches all goals given user has goals',(done) =>{
      var goal = {goal: 'Mow Lawn', progress: 10, goal_picture: "Picture", UserId: UserId};
        db.Goal.create(goal).then(function(goal){
      });
      request(app)
      .get('/api/users/:username/setting')
      .end((err,res) =>{
        if(err) {
          console.error('GETTING SETTINGS ERROR: \n',err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.some((goal) =>goal.goal==='Mow Lawn')).to.be.true;
        done();
      });
    });
  });

  describe('POST new blacklisted websites', () =>{
    it('/api/users/:username/setting creates settings',(done) =>{
      console.log('POST in goals', UserId);
      const goalA = {goal: 'Mow Lawn', progress: 10, goal_picture: "Picture", UserId: UserId};
      request(app)
      .post('/api/users/auth_id3/goals')
      .send(goalA)
      .end((err,res) =>{
        if(err) {
          console.error('POST /api/users/username/goals \n',err);
        }
        expect(res.statusCode).to.equal(201);
        expect(res.body.data.goal).to.equal(goalA.goal);
        expect(res.body.data.progress).to.equal(goalA.progress);
        expect(res.body.data.goal_picture).to.equal(goalA.goal_picture);
        done();
      });
    });
  });

  describe('GET all blacklisted urls', () =>{
    it('/api/users/:auth0_id/goals fetches all goals given user has goals',(done) =>{
      var goal = {goal: 'Mow Lawn', progress: 10, goal_picture: "Picture", UserId: UserId};
        db.Goal.create(goal).then(function(goal){
      });
      request(app)
      .get('/api/users/auth_id3/goals')
      .end((err,res) =>{
        if(err) {
          console.error('GET /api/users \n',err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.some((goal) =>goal.goal==='Mow Lawn')).to.be.true;
        done();
      });
    });
  });

  describe('GET all extended data', () =>{
    it('/api/users/:auth0_id/goals fetches all goals given user has goals',(done) =>{
      var goal = {goal: 'Mow Lawn', progress: 10, goal_picture: "Picture", UserId: UserId};
        db.Goal.create(goal).then(function(goal){
      });
      request(app)
      .get('/api/users/auth_id3/goals')
      .end((err,res) =>{
        if(err) {
          console.error('GET /api/users \n',err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.some((goal) =>goal.goal==='Mow Lawn')).to.be.true;
        done();
      });
    });
  });
  */
})
