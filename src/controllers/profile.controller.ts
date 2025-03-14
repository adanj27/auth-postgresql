import { Request, Response } from 'express';
import { findProfileByUserId, updateProfile } from '../models/profile.model';

// Obtener el perfil del usuario
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body || !req.body.user || !req.body.user.id) {
      res.status(400).json({ success: false, message: 'Invalid user data' });
      return;
    }

    const user = req.body.user;
    console.log('User received:', user);

    const profile = await findProfileByUserId(user.id);
    console.log('Profile fetched:', profile);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({
      success: true,
      message: 'User profile',
      user: {
        email: user.email,
        name: user.name,
        username: profile.username,
        bio: profile.bio,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Actualizar el perfil del usuario
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body.user;
    const { name } = req.body;

    const updatedProfile = await updateProfile(user.id, name);

    if (!updatedProfile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        email: user.email,
        name: user.name,
        username: updatedProfile.name,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
