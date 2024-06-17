import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { selectIsRefreshing } from '../../redux/auth/authSelectors';

import { CheckAliveThunk } from '../../redux/auth/authOperations';

import {
  IdleTimerProvider,
  IdleTimerConsumer,
  IIdleTimer,
} from 'react-idle-timer';

export const IdleOverlay = () => {
  const [_, setIsIdle] = useState(false);
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  const handleResume = async (idleTimer: IIdleTimer) => {
    try {
      await dispatch(CheckAliveThunk()).unwrap();
      idleTimer.start();
      setIsIdle(false);
    } catch {}
  };

  return (
    <IdleTimerProvider
      timeout={600000}
      debounce={0}
      crossTab={true}
      startManually={false}
      startOnMount={true}
      stopOnIdle={false}
      syncTimers={0}
      throttle={0}
      eventsThrottle={0}
      onIdle={() => setIsIdle(true)}
    >
      <IdleTimerConsumer>
        {idleTimer =>
          idleTimer.isIdle() && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80">
              <div className="text-center text-white">
                <p className="mb-4">You have been inactive for a while.</p>
                <button
                  onClick={async () => await handleResume(idleTimer)}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-400"
                  disabled={isRefreshing}
                >
                  RESUME
                </button>
              </div>
            </div>
          )
        }
      </IdleTimerConsumer>
    </IdleTimerProvider>
  );
};
