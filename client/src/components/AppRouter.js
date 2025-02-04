import React, {useContext} from 'react';
import { Route, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}
            <Route path="*" element={SHOP_ROUTE} />
        </Routes>
    );
};

export default AppRouter;