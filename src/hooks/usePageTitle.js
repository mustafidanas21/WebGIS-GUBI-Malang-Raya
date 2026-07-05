import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | GUBI Malang Raya` : 'GUBI Malang Raya';
  }, [title]);
}
