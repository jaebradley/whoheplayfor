import * as React from 'react';

function useDetectClickOutsideComponent({
  ref,
  onClick,
}: {
  ref: React.RefObject<HTMLElement>;
  onClick: (event: MouseEvent) => void;
}): void {
  const handleClick = React.useCallback(
    (event: MouseEvent) => {
      if (ref) {
        const { current } = ref;
        if (current && !current.contains(event.target as Node)) {
          onClick(event);
        }
      }
    },
    [ref, onClick],
  );

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
}

export default useDetectClickOutsideComponent;
