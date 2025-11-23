import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import EMPLOYEE_ROUTES from "./employee_paths";
import AUTH_ROUTES from "./auth_paths";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeAddPage from "../pages/EmployeeAddPage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import EmployeeUpdatePage from "../pages/EmployeeUpdatePage";
import EmployeeDeletePage from "../pages/EmployeeDeletePage";
import EmployeeSearchPage from "../pages/EmployeeSearchPage"
import {useAuth} from "../context/AuthContext";


import NavigationBar from "../components/NavigationBar";
import HomePage from "../pages/HomePage";


const PrivateRoute = ({children}) => {
    const {isLoggedIn} = useAuth();
    return isLoggedIn ? children : <Navigate to={AUTH_ROUTES.login} replace/>;
};


export default function AppRoutes() {
    return (<Router>
        <NavigationBar/>
        <Routes>

            <Route path="/" element={
                <PrivateRoute>
                    <HomePage/>
                </PrivateRoute>
            }
            />

            <Route path="/search" element={
                <PrivateRoute>
                    <EmployeeSearchPage/>
                </PrivateRoute>
            }
            />


            {/* Public Routes */}
            <Route path={AUTH_ROUTES.login} element={<LoginPage/>}/>
            <Route path={AUTH_ROUTES.register} element={<RegisterPage/>}/>

            {/* Protected Routes */}
            <Route path={AUTH_ROUTES.home} element={
                <PrivateRoute>
                    <HomePage/>
                </PrivateRoute>}
            />
            <Route path={EMPLOYEE_ROUTES.list} element={
                <PrivateRoute>
                    <EmployeeListPage/>
                </PrivateRoute>}
            />
            <Route path={EMPLOYEE_ROUTES.details} element={
                <PrivateRoute>
                    <EmployeeDetailsPage/>
                </PrivateRoute>}
            />
            <Route path={EMPLOYEE_ROUTES.add} element={
                <PrivateRoute>
                    <EmployeeAddPage/>
                </PrivateRoute>}
            />
            <Route path={EMPLOYEE_ROUTES.edit} element={
                <PrivateRoute>
                    <EmployeeUpdatePage/>
                </PrivateRoute>}
            />
            <Route path={EMPLOYEE_ROUTES.delete} element={
                <PrivateRoute>
                    <EmployeeDeletePage/>
                </PrivateRoute>}
            />


            {/* Redirect all unknown routes */}
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    </Router>);
}
