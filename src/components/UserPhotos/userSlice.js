import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const CLIENT_ID = 'wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw';

const initialState = {
  status: 'idle',
  entities: {}
}

export const fetchUserPhotos = createAsyncThunk('user/fetchUserPhotos', async (userId) => {
  const response = await axios(`https://api.unsplash.com/users/${userId}/photos/?client_id=${CLIENT_ID}`)
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPhotos.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchUserPhotos.fulfilled, (state, action) => {
      const newEntities = {};
      action.payload.forEach(element => {
        newEntities[element.id] = element;
      });
      state.entities = newEntities;
      state.status = 'idle';
    })
    .addCase(fetchUserPhotos.rejected, (state, action) => {
      state.status = 'error'
    })
  }
})

const selectUserPhotoEntities = (state) => state.user.entities;

export const selectUserPhotos = createSelector(selectUserPhotoEntities, (entities) => 
  Object.values(entities)
)

export const selectLoadingStatus = (state) => state.user.status;

export default userSlice.reducer;