import { Router } from 'express';
import debug from 'debug';
import { createUser, getUserByEmail, loginUser } from './user.service';
import { userValidation } from './user.validation';

const userDebugLog = debug('user');

export const AUTH_ROUTE = '/auth';

const userRouter = Router();

userRouter.post('/register', userValidation, async (req, res) => {
  // Get user input
  const { name, email, password } = req.body;

  const oldUser = await getUserByEmail(email);

  if (oldUser) {
    userDebugLog('User already exists');
    return res.status(409).send({
      data: null,
      error: { message: 'User Already Exists. Please Login' },
    });
  }

  const createdUser = await createUser({ name, password, email });

  userDebugLog('User created successfully' + createdUser);

  res.status(200).send({
    data: {
      id: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    },
    error: null,
  });
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res
      .status(400)
      .send({ data: null, error: { message: 'All input is required' } });
  }
  const token = await loginUser(email, password);

  if (token) {
    userDebugLog(`Successfully signing in user with email: ${email}`);

    return res.status(200).json({
      data: {
        token,
      },
      error: null,
    });
  }

  userDebugLog(`Authentication failed for user with email: ${email}`);

  res.status(404).send({
    data: null,
    error: {
      message: 'No user with such email or password',
    },
  });
});

export { userRouter };
