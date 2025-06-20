// src/store/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserTypes } from '../types/UserTypes';
type AuthState = {
    user: UserTypes | null;
};

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserTypes>) {
            state.user = action.payload;
        },

        updateCompagnion(state, action: PayloadAction<{
            compagnion_nom: string;
            compagnion_type: string;
        }>) {
            if (state.user) {
                state.user.compagnion_nom = action.payload.compagnion_nom;
                state.user.compagnion_type = action.payload.compagnion_type;
            }
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, updateCompagnion, clearUser } = authSlice.actions;
export default authSlice.reducer;
