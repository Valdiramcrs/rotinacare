import { Router, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/auth/me
 * Retorna dados do usuário autenticado + perfil de paciente
 */
router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Buscar perfil do paciente
    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', req.user!.id)
      .single();
    
    // PGRST116 = não encontrado (ok para usuário novo)
    if (error && error.code !== 'PGRST116') {
      console.error('[Auth] Failed to fetch patient:', error);
      throw error;
    }
    
    res.json({
      user: {
        id: req.user!.id,
        email: req.user!.email,
        name: req.user!.name,
      },
      patient: patient || null,
      isNewUser: !patient,
    });
  } catch (error) {
    console.error('[Auth] Failed to get user data:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

/**
 * POST /api/auth/create-profile
 * Cria perfil de paciente para usuário novo
 */
router.post('/create-profile', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { full_name, birth_date, phone_number } = req.body;
    
    if (!full_name) {
      return res.status(400).json({ error: 'full_name is required' });
    }
    
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        id: req.user!.id,
        full_name,
        birth_date: birth_date || null,
        phone_number: phone_number || null,
      })
      .select()
      .single();
    
    if (error) {
      // Já existe
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Profile already exists' });
      }
      throw error;
    }
    
    res.status(201).json({ patient });
  } catch (error) {
    console.error('[Auth] Failed to create profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

/**
 * POST /api/auth/logout
 * Logout (client-side handled, mas pode invalidar sessão server-side se necessário)
 */
router.post('/logout', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  // Supabase Auth gerencia sessões client-side
  // Aqui podemos fazer cleanup adicional se necessário
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
