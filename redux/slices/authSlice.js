import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    profile: null,
    rememberedCredentials: null,
  },

  reducers: {
    // login: (state, action) => {
    //   // state.userEmail = action.payload.email;
    //   state.token = action.payload.token;
    //   AsyncStorage.setItem("userToken", action.payload.token);
    // },
    // register: (state, action) => {
    //   // state.userEmail = action.payload.email;
    //   state.token = action.payload.token;
    //   AsyncStorage.setItem("userToken", action.payload.token);
    // },
    login: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },

    register: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },

    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setRememberedCredentials: (state, action) => {
      state.rememberedCredentials = action.payload;

      if (action.payload) {
        const userDataString = JSON.stringify(state.rememberedCredentials);
        AsyncStorage.setItem("rememberedCredentials", userDataString);
      } else {
        AsyncStorage.removeItem("rememberedCredentials");
      }
    },
    logout: (state, action) => {
      try {
        AsyncStorage.removeItem("userToken");
        // await AsyncStorage.removeItem("userEmail");
        state.token = null;
        AsyncStorage.removeItem("userId");
        // state.userEmail = null;
        // state.profile = null;
        // state.rememberedCredentials = null;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// export actions
export const { login, register, logout, setProfile, setRememberedCredentials } =
  authSlice.actions;

// export reducer
export default authSlice.reducer;
// export const rehydrateTokenAction = () => async (dispatch) => {
//   const token = await AsyncStorage.getItem("userToken");
//   dispatch(rehydrateToken(token));
// };
