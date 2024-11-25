import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

//adding user to api
const apidata = createAsyncThunk(
  "apidata",
  async (users, { rejectWithValue }) => {
    const jsondata = await fetch(
      "https://651ce36c44e393af2d58ddc6.mockapi.io/Crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      }
    );
    try {
      return jsondata.json(); //return users object but with updated values like id in that array of objects
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//getting all users from api

const apiallusers = createAsyncThunk(
  "apiallusers",
  async (xyz, { rejectWithValue }) => {
    const allapiusers = await fetch(
      "https://651ce36c44e393af2d58ddc6.mockapi.io/Crud"
    );
    try {
      const result = await allapiusers.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete user

const apideleteuser = createAsyncThunk(
  "apideleteuser",
  async (id, { rejectWithValue }) => {
    const alldeletinguser = await fetch(
      `https://651ce36c44e393af2d58ddc6.mockapi.io/Crud/${id}`,
      { method: "DELETE" }
    );

    try {
      const usertodelete = await alldeletinguser.json();
      return usertodelete;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update user

const apiupdateuser = createAsyncThunk(
  "apiupdateuser",
  async (user, { rejectWithValue }) => {
    const jsonupdateuser = await fetch(
      `https://651ce36c44e393af2d58ddc6.mockapi.io/Crud/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    try {
      const abc = await jsonupdateuser.json();
      console.log(abc);
      return abc;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const slices = createSlice({
  name: "todo slice",
  initialState: {
    data: [],
    isLoading: false,
    isError: null,
    requesteddata: [],
  },
  reducers: {
    getingrequesteddata: (state, action) => {
      state.requesteddata = action.payload;
    },
  },
  extraReducers: {
    [apidata.pending]: (state) => {
      state.isLoading = true;
    },
    [apidata.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    },
    [apidata.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
    [apiallusers.pending]: (state) => {
      state.isLoading = true;
    },
    [apiallusers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [apiallusers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
    [apideleteuser.pending]: (state) => {
      state.isLoading = true;
    },
    [apideleteuser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      state.data = state.data.filter((user) => user.id !== id);
    },
    [apideleteuser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
    [apiupdateuser.pending]: (state) => {
      state.isLoading = true;
    },
    [apiupdateuser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    [apiupdateuser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});

export default slices.reducer;
export { apidata, apiallusers, apideleteuser, apiupdateuser };
export const { getingrequesteddata } = slices.actions;
