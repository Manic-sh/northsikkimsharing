import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { id: 1, name: "Package", icon: "icon-bed" },
    { id: 2, name: "Find Trip", icon: "icon-destination" },
    { id: 3, name: "Activity", icon: "icon-ski" },
    { id: 4, name: "Gallery", icon: "icon-tickets" },
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
