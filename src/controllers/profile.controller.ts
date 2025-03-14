import { Request, Response } from 'express';
import { findProfileByUserId, updateProfile } from '../models/profile.model';

// Obtener el perfil del usuario
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId;
    console.log('User ID from request:', userId); // Verifica el userId

    if (!userId) {
      res.status(400).json({ success: false, message: 'Invalid user data' });
      return;
    }

    const profile = await findProfileByUserId(userId as string);
    console.log('Profile fetched:', profile); // Verifica el perfil obtenido

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({
      success: true,
      message: 'User profile',
      user: {
        email: profile.email || 'No email', // Valor predeterminado si está vacío
        name: profile.name || 'No name',   // Valor predeterminado si está vacío
        username: profile.username || 'No username', // Valor predeterminado si está vacío
        bio: profile.bio || 'No bio',       // Valor predeterminado si está vacío
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: (error as Error).message // Agrega el mensaje de error para más detalles
    });
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
