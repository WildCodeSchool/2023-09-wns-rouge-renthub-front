import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useMutation, useQuery } from '@apollo/client';
import { mutationSignOut, queryMeContext } from '../graphql/Users';
import { UserContextTypes } from '@/types/UserTypes';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchIcon from '@mui/icons-material/Search';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PATH_IMAGE } from '@/api/configApi';

const buttonStyles = {
  color: 'white',
  '& .MuiButton-startIcon': {
    marginRight: '-4px',
  },
};

export default function Header(): React.ReactNode {
  const router = useRouter();
  // User connected ?
  const { data, error } = useQuery<{ item: UserContextTypes }>(queryMeContext);
  const [userContext, setUserContext] = useState<UserContextTypes>(null);
  console.log('userContext', userContext);
  const [userConnected, setUserConnected] = useState<Boolean>(false);

  useEffect(() => {
    if (error) {
      setUserContext(null);
      setUserConnected(false);
    }
    if (data?.item) {
      setUserContext(data.item);
      setUserConnected(true);
    }
  }, [data, error]);

  // Signout
  const [doSignout] = useMutation(mutationSignOut, {
    onCompleted: () => {
      setUserContext(null);
      setAnchorElUser(null);
      setUserConnected(false);
      router.replace(`/connexion`);
    },
    refetchQueries: [{ query: queryMeContext }],
  });
  async function logout() {
    doSignout();
  }

  // Open / Close menu
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: '#343a40' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="header">
          <Box
            className="header_title"
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link href="/">
              <CookieIcon className="header_title_logo" />
            </Link>
            <Link href="/" className="header_title_name">
              RENTHUB
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: '#e89116',
              }}
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  router.replace(`/annonces/new`);
                }}
              >
                <Typography textAlign="center"> Déposer une annonce</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  router.replace(`/recherche`);
                }}
              >
                <Typography textAlign="center"> Recherche</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  router.replace(`/compte`);
                }}
              >
                <Typography textAlign="center"> Compte</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  router.replace(`/contact`);
                }}
              >
                <Typography textAlign="center"> Contact</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <CookieIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              color: '#e89116',
            }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#e89116',
              textDecoration: 'none',
            }}
          >
            RENTHUB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              className="header_link_button"
              startIcon={<EditNoteIcon fontSize="large" />}
              onClick={() => {
                handleCloseNavMenu();
                router.replace(`/annonces/new`);
              }}
              sx={buttonStyles}
            >
              Déposer une annonce
            </Button>
            <Button
              className="header_link_button"
              startIcon={<SearchIcon />}
              onClick={() => {
                handleCloseNavMenu();
                router.replace(`/recherche`);
              }}
              sx={buttonStyles}
            >
              Recherche
            </Button>
            <Button
              className="header_link_button"
              startIcon={<AccountCircleIcon />}
              onClick={() => {
                handleCloseNavMenu();
                router.replace(`/compte`);
              }}
              sx={buttonStyles}
            >
              Compte
            </Button>
            <Button
              className="header_link_button"
              startIcon={<ContactSupportIcon />}
              onClick={() => {
                handleCloseNavMenu();
                router.replace(`/contact`);
              }}
              sx={buttonStyles}
            >
              contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ouvrir le menu du profil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User avatar"
                  src={
                    userConnected && userContext.picture
                      ? `${PATH_IMAGE}/pictures/${userContext.picture}`
                      : `${PATH_IMAGE}/default/avatar.webp`
                  }
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userConnected ? (
                <Box>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.replace(`/compte`);
                    }}
                  >
                    <AccountCircleIcon />
                    <Typography textAlign="center">Mon compte</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ExitToAppIcon />
                    <Typography textAlign="center">Se déconnecter</Typography>
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    router.replace(`/connexion`);
                  }}
                >
                  <LoginIcon />
                  <Typography textAlign="center">Connexion</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
