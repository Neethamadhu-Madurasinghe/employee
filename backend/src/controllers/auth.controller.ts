import { Request, Response } from 'express';
// import * as authService from '../services/auth.service'; // Placeholder

export const login = async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  try {
    // const result = await authService.login(email, password); // Placeholder
    // res.status(200).json(result);
    res.status(501).json({ message: 'Auth login not implemented' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
