import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { id: 1, name: "Home", icon: "icon-home" },
    { id: 2, name: "About Us", icon: "icon-user" },
    { id: 3, name: "Packages", icon: "icon-ski" },
    { id: 4, name: "Contact Us", icon: "icon-tickets" },
  ],
  currentTab: "Package",
};

export const findPlaceSlice = createSlice({
  name: "find-place",
  initialState,
  reducers: {
    addCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
  },
});

export const { addCurrentTab } = findPlaceSlice.actions;
export default findPlaceSlice.reducer;
