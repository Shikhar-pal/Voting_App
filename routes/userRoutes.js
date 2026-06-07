const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


// Signup route to create a new user
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    // If role is admin, check if admin already exists
    if (data.role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });

      if (existingAdmin) {
        return res.status(400).json({
          error: 'Admin already exists'
        });
      }
    }

    const newUser = new User(data);
    const response = await newUser.save();

    const payload = {
      id: response._id
    };

    const token = generateToken(payload);

    res.status(200).json({
      response,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Login route 
router.post('/login', async (req, res) => {
  try {
    // extracting aadharCardNumber and password from request body
    const { aadharCardNumber, password } = req.body;
    // finding user by aadharCardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // payload for JWT token generation
    const payload = {
      id: user._id,
    };
    // generate JWT token
    const token = generateToken(payload);
    res.json({ token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Profile route to get user details
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } 

});

// Route to update user password
router.put('/:profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // find the user by id
    const user = await User.findById(userId);

    // If password is incorrect, return error
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // update password
    user.password = newPassword;
    await user.save();
    console.log('Password updated');
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user route (for admin use)
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await User.findByIdAndDelete(userId);

    if (!response) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.status(200).json({
      message: 'User deleted successfully'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


module.exports = router;