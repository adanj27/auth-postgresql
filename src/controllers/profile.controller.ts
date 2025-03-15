import { Request, Response } from 'express';
import { findProfileByUserId, updateProfile } from '../models/profile.model';

// Obtener el perfil del usuario
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get userId from authenticated user token
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const profile = await findProfileByUserId(userId);
    console.log('Profile fetched:', profile);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({
      success: true,
      message: 'User profile retrieved successfully',
      user: {
        email: profile.email || 'No email',
        name: profile.name || 'No name',
        username: profile.username || 'No username',
        bio: profile.bio || 'No bio',
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: (error as Error).message
    });
  }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get userId from authenticated user token
    const userId = (req as any).user?.id;
    const { name } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const updatedProfile = await updateProfile(userId, name);

    if (!updatedProfile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: updatedProfile.name,
        bio: updatedProfile.bio || 'No bio',
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: (error as Error).message
    });
  }
};
