import { offset, flip, shift, type Placement } from 'svelte-floating-ui/dom';
import { createFloatingActions } from 'svelte-floating-ui';
import type { Readable } from 'svelte/store';

export interface TooltipOptions {
  placement?: Placement;
}

export function createTooltip(options?: TooltipOptions) {
  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'fixed',
    placement: options?.placement ?? 'top',
    middleware: [offset(6), flip(), shift()],
  });

  return [floatingRef, floatingContent] as const;
}

export type TooltipContext = {
  showing: Readable<string | null>;
  groupTooltip: string;
  showTooltip: (id: string) => void;
  hideTooltip: (id: string) => void;
};

export const createRandomId = () => Math.random().toString(36).slice(2);
