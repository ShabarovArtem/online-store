import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";

//observer - чтобы отслеживать изменения в режиме реального времени
const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate(); // Замена useHistory на useNavigate

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{ color: 'white' }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)} // Используем navigate вместо history.push
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={logOut} // Упрощаем onClick
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;