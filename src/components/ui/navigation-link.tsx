import { ReactNode, MouseEvent } from 'react';
import { useNavigation } from '@/hooks/use-navigation';

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export function NavigationLink({ 
  to, 
  children, 
  className, 
  replace = false, 
  external = false,
  onClick 
}: NavigationLinkProps) {
  const { navigateToPage } = useNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Handle external links
    if (external) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    // Handle internal navigation
    navigateToPage(to, { replace });
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}