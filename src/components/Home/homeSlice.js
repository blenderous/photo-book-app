import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const CLIENT_ID = 'wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw';

const initialState = {
  status: 'idle',
  entities: {}
}

export const fetchPhotos = createAsyncThunk('home/fetchPhotos', async () => {
  const response = await axios(`https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`)
  return response.data;
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(fetchPhotos.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPhotos.fulfilled, (state, action) => {
      const newEntities = {}
      action.payload.forEach(element => {
        newEntities[element.id] = element;
      });
      state.entities = newEntities;
      state.status = 'idle';
    })
    .addCase(fetchPhotos.rejected, (state, action) => {
      state.status = 'error';
    })
  }
})

const selectPhotoEntities = (state) => state.home.entities;

export const selectPhotos = createSelector(selectPhotoEntities, (entities) => 
  Object.values(entities)
)

export const selectLoadingStatus = (state) => state.home.status;

export default homeSlice.reducer;