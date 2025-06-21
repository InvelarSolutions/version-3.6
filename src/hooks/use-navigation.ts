import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationState {
  isLoading: boolean;
  error: string | null;
}

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<NavigationState>({
    isLoading: false,
    error: null
  });

  const navigateToPage = useCallback(async (path: string, options?: { replace?: boolean }) => {
    // Don't navigate if we're already on the target page
    if (location.pathname === path) {
      return;
    }

    setState({ isLoading: true, error: null });

    try {
      // Simulate a small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Navigate to the new page
      navigate(path, { replace: options?.replace });
      
      // Reset loading state
      setState({ isLoading: false, error: null });
    } catch (error) {
      setState({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Navigation failed' 
      });
    }
  }, [navigate, location.pathname]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    navigateToPage,
    clearError,
    currentPath: location.pathname
  };
}