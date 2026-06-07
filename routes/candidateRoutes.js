const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const Candidate = require('./../models/candidate');

// get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);   
        if(user.role === 'admin') {
            return true;
        }
    }catch (err) {
        return false;
    }
};

// Post route to create a new candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    if(!await checkAdminRole(req.user.id)) {  
        return res.status(403).json({ message: 'User has not admin role' });
    }
    const data = req.body;
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();
    console.log('Candidate saved');
    res.status(200).json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Put route to update candidate details
router.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
  try {
        if(!await checkAdminRole(req.user.id)) {  
            return res.status(404).json({ message: 'User has not admin role' });
       }
    const candidateId = req.params.candidateId;
    const updatedCandidateData = req.body;
    const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, { new: true, runValidators: true });
    if(!response) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    console.log('candidate data updated');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete route to delete a candidate
router.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
  try {
        if(!await checkAdminRole(req.user.id)) {  
            return res.status(403).json({ message: 'User has not admin role' });
       }
    const candidateId = req.params.candidateId;
    const response = await Candidate.findByIdAndDelete(candidateId);
    if(!response) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    console.log('candidate deleted');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// let's start voting for a candidate
router.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    // no admin can vote for a candidate, only voters can vote once
    candidateId = req.params.candidateId;
    userId = req.user.id;
    try {
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user is an admin
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Admin is not allowed to vote' });
        }

        // Check if the user has already voted
        if (user.isVoted) {
            return res.status(400).json({ error: 'You have already voted' });
        }

        // Update candidate's vote count
        candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();

        // Mark user as having voted
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// vote count
router.get('/vote/count/', async (req, res) => {
    try {
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });
        const voteRecord = candidate.map((data) => {    
            return {
                party: data.party,
                count: data.voteCount
            };
        });
        res.status(200).json({ candidates: voteRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;