import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};

export const fetchPlots = createAsyncThunk(
  'plots/fetchPlots',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:1337/api/plots');
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const fetchAddPlots = createAsyncThunk(
  'plots/fetchAddPlots',
  async (data, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:1337/api/plots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { item: data } }),
      });
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const fetchDeletePlots = createAsyncThunk(
  'plots/fetchDeletePlots',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:1337/api/plots/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
const plotSlice = createSlice({
  name: 'plots',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data.map((item) => item.attributes.item);
        state.data = action.payload.data.map((item, index) => {
          return {
            identificator: action.payload.data[index].id,
            ...item.attributes.item,
          };
        });
      })
      .addCase(fetchPlots.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAddPlots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddPlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push({
          identificator: action.payload.data.id,
          ...action.payload.data.attributes.item,
        });
      })
      .addCase(fetchAddPlots.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchDeletePlots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeletePlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action);
        state.data.push(action.payload.data.attributes.item);
        state.data = state.data.filter(
          (plot) => plot.id !== action.payload.data.attributes.item.id
        );
      })
      .addCase(fetchDeletePlots.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement } = plotSlice.actions;

export const selectPlotsStatus = (state) => state.plots.status;
export const selectPlotsData = (state) => state.plots.data;

export default plotSlice.reducer;
