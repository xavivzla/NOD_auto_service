import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Menu as MenuIcon
} from '@material-ui/icons'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Divider,
  Menu,
  Link,
  Button
} from '@material-ui/core'
// import capitalize from '../utils/capitalize'

import Nav from 'components/Admin/Nav'

const useStyles = makeStyles(theme => ({
  drawerContent: {
    height  : '100%',
    overflow: 'auto'
  },
  hiddenUpMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  iconMenu: {
    color: theme.palette.common.white
  },
  linkLabel: {
    '&:after': {
      backgroundColor: theme.palette.primary.main,
      bottom         : -2,
      content        : '""',
      height         : 1,
      left           : 0,
      position       : 'absolute',
      right          : 0,
      transform      : 'scaleX(0)',
      transition     : 'all .2s ease 0s'
    },
    '&:hover': {
      '&:after': {
        transform: 'scaleX(1)'
      }
    },
    cursor  : 'pointer',
    position: 'relative'
  },
  linkLabelSecondary: {
    '&:after': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  logoCompany: {
    '& > img': {
      maxHeight: 50,
      maxWidth : 115
    },
    alignItems    : 'center',
    cursor        : 'pointer',
    display       : 'flex',
    height        : 64,
    justifyContent: 'center',
    // marginLeft    : theme.spacing(3),
    // marginRight   : 10,
    margin        : theme.spacing(0, 1),
    position      : 'relative'
  },
  main: {
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto'
    },
    backgroundColor: theme.palette.grey[200],
    display        : 'flex',
    flex           : 1,
    height         : '100%',
    overflow       : 'hidden',
    position       : 'relative'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuDashboardItem: {
    alignItems: 'center',
    display   : 'flex',
    padding   : theme.spacing(1, 2),
    width     : '100%'
  },
  menuDashboardItemLink: {
    display: 'flex'
  },
  menuDashboardListItem: {
    // '&:hover': {
    //   backgroundColor: theme.palette.primary[600]
    // },
    color  : theme.palette.common.white,
    padding: 0
  },
  menuDashboardListItemActive: {
    '&:hover': {
      backgroundColor: theme.palette.common.white
    },
    // '& > div': {
    //   color: 'inherit'
    // },
    // '&:active': {
    //   backgroundColor: theme.palette.common.white,
    //   color          : theme.palette.primary.main
    // },
    backgroundColor: theme.palette.common.white,
    color          : theme.palette.primary.main
  },
  menuItemContentName: {
    '&:focus': {
      outline: 'none'
    },
    display      : 'flex',
    flexDirection: 'column'
  },
  menuItemName: {
    fontSize  : '1rem',
    fontWeight: 600,
    lineHeight: '1.5',
    minHeight : 'auto',
    padding   : theme.spacing(1, 2)
  },
  menuLink: {
    '& > a': {
      color  : theme.palette.grey[800],
      display: 'block',
      width  : '100%'
    },
    '& > a:hover': {
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'none'
    },
    padding       : theme.spacing(1, 2),
    textDecoration: 'none',
    width         : '100%'
  },
  notificationIcon: {
    '& svg': {
      fontSize: '1.75rem'
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color          : theme.palette.grey[500]
    },
    color: theme.palette.grey[600]
  },
  profileName: {
    alignItems     : 'center',
    backgroundColor: theme.palette.grey[200],
    border         : `2px solid ${theme.palette.primary.main}`,
    borderRadius   : '50%',
    color          : theme.palette.grey[500],
    display        : 'flex',
    fontSize       : '0.75rem',
    height         : 34,
    justifyContent : 'center',
    position       : 'relative',
    width          : 34
  },
  root: {
    display                       : 'flex',
    flexDirection                 : 'column',
    height                        : '100vh',
    overflow                      : 'hidden',
    width                         : '100%',
    [theme.breakpoints.down('sm')]: {
      height   : '100%',
      minHeight: '100vh'
    }
  },
  title: {
    color   : theme.palette.primary.main,
    flexGrow: 1
  },
  toolbar: {
    display       : 'flex',
    justifyContent: 'space-between',
    paddingRight  : 24 // keep right padding when drawer closed
  },
  toolbarCenter: {
    display       : 'flex',
    flex          : 1,
    justifyContent: 'space-between'
    // padding       : theme.spacing(0, 1)
  },
  toolbarCenterLeft: {
    '& > a': {
      '&:first-child': {
        marginLeft: 0
      },
      marginLeft: theme.spacing(1)
    },
    padding: theme.spacing(0, 1)
  },
  toolbarCenterRight: {
    '& > a': {
      '&:last-child': {
        marginRight: 0
      },
      marginRight: theme.spacing(1)
    },
    padding: theme.spacing(0, 1)
  },
  topBar: {
    backgroundColor: theme.palette.common.white,
    boxShadow      : '0px 2px 5px rgba(0, 0, 0, 0.1)'
  },
  wrapperContent: {
    [theme.breakpoints.down('sm')]: {
      overflow: 'initial'
    },
    borderRadius  : 4,
    display       : 'flex',
    flex          : 1,
    justifyContent: 'center',
    // margin        : theme.spacing(1),
    // overflow      : 'auto',
    overflow      : 'hidden',
    padding       : theme.spacing(1),
    position      : 'relative'
    // width         : `calc(100% - ${drawerWidthMin}px)`
  }
}), { name: 'Dashboard' })

function Dashboard(props) {
  const {
    user = {},
    userMenu = [],
    actions = {},
    logo = {},
    // menus = [],
    menuTopLeft = [],
    menuTopRight = [],
    children
  } = props

  const {
    logout
  } = actions

  const history = useHistory()

  const {
    // location
  } = history

  const classes = useStyles()
  const [ anchorEl, setAnchorEl ] = useState(null)

  const _handleClickToggleDrawer = () => setToggleDrawer(!isOpenDrawer)
  const _handleOpenMenu = ev => setAnchorEl(ev.currentTarget)
  const _handleCloseMenu = () => setAnchorEl(null)

  // const _handlePreventRoute = mUrl => (ev) => {
  //   if(location.pathname === mUrl) ev.preventDefault()
  // }

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.topBar}
        color='default'
        position='relative'>
        <Toolbar className={classes.toolbar} >
          <IconButton
            aria-label='menu' className={classes.hiddenUpMobile} edge='start'
            onClick={_handleClickToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Link className={classes.logoCompany} component={RouterLink} to='/'>
            <img
              alt='Logo Main'
              src={logo.source} />
          </Link>
          <div className={classes.toolbarCenter}>
            <div className={classes.toolbarCenterLeft}>
              {
                menuTopLeft.map((item, index) => {
                  const auxProps = isExternalURL(item.url) ?
                    {
                      href: item.url
                    } :
                    {
                      component: RouterLink,
                      to       : item.url
                    }

                  return (
                    item.type === 'button' ?
                      <Button
                        color={item.color ? item.color : 'default'}
                        key={`menu-top-left-${index}`}
                        target={item.target ? item.target : '_blank'}
                        variant={item.variant ? item.variant : 'text'}
                        {...auxProps}>
                        {item.title}
                      </Button> :
                      item.type === 'link' ?
                        <Link
                          className={
                            clsx(
                              classes.linkLabel,
                              {
                                [classes[`linkLabel${capitalize(item.color || '')}`]]: Boolean(item.color)
                              }
                            )
                          }
                          color={item.color ? item.color : undefined}
                          key={`menu-top-left-${index}`}
                          target={item.target}
                          underline='none'
                          {...auxProps}>
                          {item.title}
                        </Link> :
                        <div key={`menu-top-left-${index}`}>{item.title}</div>
                  )
                })
              }
            </div>
            <div className={classes.toolbarCenterRight}>
              {
                menuTopRight.map((item, index) => {
                  const auxProps = isExternalURL(item.url) ?
                    {
                      href: item.url
                    } :
                    {
                      component: RouterLink,
                      to       : item.url
                    }

                  return (
                    item.type === 'button' ?
                      <Button
                        color={item.color ? item.color : 'default'}
                        key={`menu-top-right-${index}`}
                        variant={item.variant ? item.variant : 'text'}
                        {...auxProps}>
                        {item.title}
                      </Button> :
                      item.type === 'link' ?
                        <Link
                          className={
                            clsx(
                              classes.linkLabel,
                              {
                                [classes[`linkLabel${capitalize(item.color || '')}`]]: Boolean(item.color)
                              }
                            )
                          }
                          color={item.color ? item.color : undefined}
                          key={`menu-top-right-${index}`}
                          rel={item.target === '_blank' ? 'noopener' : undefined}
                          target={item.target}
                          underline='none'
                          {...auxProps}>
                          {item.title}
                        </Link> :
                        <div key={`menu-top-right-${index}`}>{item.title}</div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <IconButton
              aria-controls='simple-menu'
              aria-haspopup='true'
              className={classes.notificationIcon}
              color='inherit'
              onClick={_handleOpenMenu}>
              {/* <AvatarUser user={user} /> */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right',
                vertical  : 'bottom'
              }}
              getContentAnchorEl={null}
              keepMounted
              MenuListProps={{
                style: {
                  padding: 0
                }
              }}
              onClose={_handleCloseMenu}
              open={Boolean(anchorEl)}
              transformOrigin={{
                horizontal: 'right',
                vertical  : 'top'
              }}>
              <li
                className={classes.menuItemContentName}
                tabIndex={-1}>
                <Typography
                  className={classes.menuItemName}
                  variant='inherit'>
                  {user.firstName} {user.lastName}
                </Typography>
                <Divider />
              </li>
              {
                userMenu.length ?
                  userMenu.map((item, n) => (
                    item.type === 'action' ?
                      <MenuItem
                        className={classes.menuLink}
                        key={n}
                        onClick={logout}>
                        {item.title}
                      </MenuItem> :
                      isExternalURL(item.url) ?
                        <MenuItem
                          className={classes.menuLink}
                          key={n}>
                          <Link
                            component='a'
                            href={item.url}
                            target={item.target ? item.target : '_blank'}>{item.title}</Link>
                        </MenuItem> :
                        <MenuItem
                          className={classes.menuLink}
                          key={n}>
                          <Link
                            component={RouterLink}
                            to={item.url}>
                            {item.title}
                          </Link>
                        </MenuItem>
                  )) : null
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.drawerContent}>
          <Nav />
        </div>
        <div className={classes.wrapperContent}>
          {children}
        </div>
      </main>
    </div>
  )
}

// Dashboard.muiName = 'Dashboard'

export default Dashboard
