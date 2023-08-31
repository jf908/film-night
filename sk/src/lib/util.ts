export function formatDuration(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours}hr${hours === 1 ? '' : 's'} ${minutes}min${minutes === 1 ? '' : 's'}`;
}

export function throttle<T>(callback: (arg: T) => void, limit: number): (arg: T) => void {
  let waiting = false;
  let queued: {
    value: T;
  } | null = null;

  function inFuture() {
    if (queued) {
      callback(queued.value);
      queued = null;
      setTimeout(inFuture, limit);
    } else {
      waiting = false;
    }
  }

  return (arg: T) => {
    if (!waiting) {
      callback(arg);
      waiting = true;
      setTimeout(inFuture, limit);
    } else {
      queued = { value: arg };
    }
  };
}
