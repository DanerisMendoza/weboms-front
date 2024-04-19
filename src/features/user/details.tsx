import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  useDispatch } from 'react-redux'
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from '../../api.js';

// const dispatch = useDispatch()

// ts
export interface UserDetailsState {
    id: String,
    username: String,
    name: String,
    role: number[], //0=> admin, 1=>enduser
    profile_pic_path: String,
}


// state
const initialUserDetailsState: UserDetailsState = {
    id: '',
    username: '',
    name: '',
    role: [],
    profile_pic_path: '',
};

const usersState: UserDetailsState[] = [

];


// slice
export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: initialUserDetailsState,
    reducers: {
        set_user_details: (state, action: PayloadAction<any>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.profile_pic_path = action.payload.profile_pic_path;
        },
        clear_user_details: (state) => {
            state.id = '';
            state.username = '';
            state.name = '';
            state.role = [];
            state.profile_pic_path = '';
        },
    },
});

export const usersSlice = createSlice({
    name: "users",
    initialState: usersState,
    reducers: {
        set_users: (state, action: PayloadAction<any>) => {
            // Clear existing users
            state.splice(0, state.length);
            // Add new users
            state.push(...action.payload);
        },
        clear_users: (state) => {
            [
                {
                    username: '',
                    name: '',
                    role: [],
                    profile_pic_path: [],
                },
            ]
        },
    },
});

// api
export const getUserDetails = (dispatch: any) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/getUserByToken").then((response) => {
            dispatch(set_user_details(response.data)); 
            resolve(response); 
        }).catch(error => {
            reject(error); 
        });
    });
}

// export const getUserDetails = () => async (dispatch: any) => {
//     try {
//         const response = await axiosInstance.get("/api/getUserByToken");
//         dispatch(set_user_details(response.data)); 
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//     }
// };

export const getUsers = () => async (dispatch: any) => {
    try {
        const response = await axiosInstance.get("/api/users");
        dispatch(set_users(response.data)); // Assuming response.data has { username, name, role }
    } catch (error) {
        // Handle error if needed
        console.error("Error fetching user details:", error);
    }
};

export const deleteUser = (item) => async (dispatch: any) => {
    try {
        await axiosInstance.delete(`/api/users/${item._id}`).then((response)=>{
            // console.log(response)
            dispatch(getUsers());
        });
    } catch (error) {
        // Handle error if needed
        console.error("Error fetching user details:", error);
    }
};


export const { set_user_details, clear_user_details } = userDetailsSlice.actions;
export const { set_users } = usersSlice.actions;

export const userDetailsReducer = userDetailsSlice.reducer;
export const usersReducer = usersSlice.reducer;