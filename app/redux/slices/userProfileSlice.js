import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch user profile information
export const fetchUserProfile = createAsyncThunk('/userProfile', async () => {
  const response = await fetch('/api/userProfile');
  if (!response.ok) {
    throw new Error('Failed to fetch user profile.');
  }
  const result = await response.json();
  return result.data.data;
});

// Thunk to update user profile information
export const updateUserProfile = createAsyncThunk(
  '/updateUserProfile',
  async (updatedUserProfile) => {
    const response = await fetch('/api/updateUserProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserProfile),
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile.');
    }

    const result = await response.json();
    return result.data.data;
  }
);

const initialState = {
  profile: '',
  loading: false,
  error: null
};

// Slice for user profile
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    resetUserProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Set fetched profile
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { resetUserProfileError } = userProfileSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.userProfile?.profile;
export const selectUserProfileLoading = (state) => state.userProfile?.loading;
export const selectUserProfileError = (state) => state.userProfile?.error;

// Export reducer
export default userProfileSlice.reducer;
