const express = require("express");
const router = express.Router();
var Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/vote');

var pusher = new Pusher({
    appId: '467675',
    key: 'acd6f90bead34a39027a',
    secret: '9714ca457a75c4f937bd',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req,res)=>{
    Vote.find().then(votes => res.json({success:true, votes:votes }));
});

router.post('/', (req,res)=>{
    const newVote = {
        os: req.body.os,
        points:1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points : parseInt(vote.points),
            os: vote.os
          });
        
        return res.json({ success: true, message: 'Thank you for voting'})
    })
    pusher.trigger('os-poll', 'os-vote', {
        points : 1,
        os: req.body.os
      });
    
    return res.json({ success: true, message: 'Thank you for voting'})
})

module.exports = router;