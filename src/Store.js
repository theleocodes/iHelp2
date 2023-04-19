import { create } from "zustand";

// define the store
export const useStore = create((set) => ({
  showAddmodal: false,
  setshowAddmodal: () =>
    set((state) => ({
      showAddmodal: !state.showAddmodal,
    })),

  showWarningModal: false,
  setshowWarningModal: () =>
    set((state) => ({
      showWarningModal: !state.showWarningModal,
    })),

  modalType: "project",
  setModalType: (type) =>
    set((state) => ({
      modalType: type,
    })),
}));
