import { combineReducers } from "redux";

import LoginPage from "../src/page/login/login";
const Routes = [
    { path: '/login', name: 'login', Component: LoginPage },
]

export default Routes;