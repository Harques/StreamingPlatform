import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false,
        history: null
    };

    public render() {            
        return (
            <header>
                <Navbar bsStyle="pills" className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/browse">Yayınlar</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink style={{fontSize: '16px'}} tag={Link} className="text-dark" to="/dashboard">Yayın</NavLink>
                                </NavItem>      
                                <NavItem>
                                    <NavLink style={{fontSize: '16px'}} tag={Link} className="text-dark" to="/browse">Gözat</NavLink>
                                </NavItem>                            
                                <NavItem>
                                    <NavLink style={{fontSize: '16px'}} className="text-dark" to="/" onClick={this.signOut}>Çıkış</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private signOut() {
        window.history.replaceState(null, '', '/')
        window.location.href = '/'  
    }
}
