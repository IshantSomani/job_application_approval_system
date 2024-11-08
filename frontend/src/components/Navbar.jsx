import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, role } = useSelector((state) => state.auth);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout());
        navigate("/", { replace: true });
        window.location.reload();
    };

    const handleUploadResume = () => {
        navigate('/job-application-form');
        handleCloseNavMenu();
    };

    const handleJobApplication = () => {
        navigate('/ApplicationReviewPortal');
        handleCloseNavMenu();
    };

    return (
        <AppBar position="sticky"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {auth && (role === 'reviewer' || role === 'approver' || role === 'initiator') ? (
                                <>
                                    {(role === 'reviewer' || role === 'approver') && (
                                        <MenuItem key="job-application" onClick={handleJobApplication}>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                Job Application
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    <MenuItem key="upload-resume" onClick={handleUploadResume}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            Upload Resume
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key="logout" onClick={handleLogOut}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            <Button onClick={handleLogOut}>Logout</Button>
                                        </Typography>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={handleJobApplication}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            Job Application
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Signup</Link>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, justifyContent: "center", alignItems: "center" }}>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {auth && (role === 'reviewer' || role === 'approver' || role === 'initiator') ? (
                            <>
                                {(role === 'reviewer' || role === 'approver') && (
                                    <Button
                                        key="ApplicationReviewPortal"
                                        onClick={handleJobApplication}
                                        sx={{ m: 2, px: 2, py: 1, color: 'white', bgcolor: "black", display: 'block' }}
                                        component={Link}
                                        to="/ApplicationReviewPortal"
                                    >
                                        Job Application
                                    </Button>
                                )}
                                <Button
                                    key="upload-resume"
                                    onClick={handleUploadResume}
                                    sx={{ my: 2, px: 2, py: 1, color: 'white', bgcolor: "black", display: 'block' }}
                                    component={Link}
                                    to="/job-application-form"
                                >
                                    Upload Resume
                                </Button>

                                <Button
                                    key="logout"
                                    onClick={handleLogOut}
                                    sx={{ m: 2, px: 2, py: 1, color: 'white', bgcolor: "black", display: 'block' }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>

                                <Link to="/login">
                                    <Button sx={{ m: 1, px: 2, py: 1, color: 'white', bgcolor: "black", display: 'block' }}>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button sx={{ m: 1, px: 2, py: 1, color: 'white', bgcolor: "black", display: 'block' }}>Signup</Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;