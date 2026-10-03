'use client';
import { useIdleTimer } from 'react-idle-timer';
export function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 60_000 * 3,
    timeout: 60_000,
    onAction: () => {
      fetch('/', {
        method: 'GET',
      }).catch((error) => {
      });
    },
  });
}
