import { create } from 'zustand';

type ConfettiStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// Global store for confetti "Controls" (open/close)

export const useConfettiStore = create<ConfettiStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));