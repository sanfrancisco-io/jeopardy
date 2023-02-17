import { NavLink } from 'react-router-dom';

import classes from './main_navigation.module.css';

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to='/game'
                            className={({ isActive }) =>
                                isActive ? classes.active : ''
                            }
                            end
                        >
                            Game
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/statistics'
                            className={({ isActive }) =>
                                isActive ? classes.active : ''
                            }
                            end
                        >
                            Statistics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
