import React, { ReactNode, useEffect, useState } from 'react';
import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Space,
} from "@mantine/core";
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useStyles } from './mainLayout.styles';
import { useViewportSize } from '@mantine/hooks';

import logo from '../../assets/logo.jpeg';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import whatsapp from '../../assets/whatsapp.png';

type Props = {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { classes } = useStyles();
  const { auth, userMe } = useAuthContext();
  const [opened, setOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter();
  const { width } = useViewportSize();

  const detectScrollY = () => {
    if (window.scrollY > 6) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
      window.addEventListener("scroll", detectScrollY);
      return () => {
        window.removeEventListener("scroll", detectScrollY);
      }
  }, [])

  return (
    <AppShell
        navbarOffsetBreakpoint="md"
        fixed
        header = {
        <Header height={width > 768 ? 105 : 80} className={`${classes.headerBackground}`} withBorder={false} style={{boxShadow: isScrolled? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px': 'none'}}>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div  className={classes.burger}>
              <Anchor href="/" ml="xl">
                <Image 
                    src={logo}
                    width={170}
                    height={58}
                    alt='logo'
                    loading='eager'
                />
              </Anchor>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="md"
                color={`${colors.primaryColor}`}
                mr="xl"        
              />
            </div>
          </MediaQuery>
          <div className={classes.header}>
            <div className={classes.logo}>
              <Anchor href="/" className={classes.navitem}>
                <Image 
                  src={logo}
                  width={220}
                  height={83}
                  alt='logo'
                  loading='eager'
                />
               
              </Anchor>
            </div>
            <div className={classes.links}>
              <Anchor className={`${classes.navitem} ${router.pathname === "/" ? classes.active : "" }`} href="/">Home</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname.includes("/courses") ? classes.active : "" }`} href="/courses">Courses</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : "" }`} href="/about">About</Anchor>
              <Anchor className={`${classes.navitem} ${router.pathname === "/contact" ? classes.active : "" }`} href="/contact">Contact</Anchor>
              {auth ? <Anchor  className={classes.navitem} href={userMe.role === "student" ? "/students" : "/admin"}>Dashboard</Anchor> :
              <div>
                <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/login" ? classes.activeSignIn : "" }`} href="/auth/login" >Login</Anchor>
                <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/register" ? classes.activeSignUp : "" }`} href="/auth/register">Register</Anchor>
              </div>
              }
            </div>
          </div>
        </Header>}

        navbar = {<Navbar
          width={{ base: "100%", sm: 0 }}
          hidden={!opened}
        >
            <Drawer
              position='top'
              opened={opened}
              onClose={() => setOpened(false)}  
              overlayOpacity={0.55}
              overlayBlur={3} 
              transition="rotate-left"
              transitionDuration={250}
              transitionTimingFunction="ease"
              closeButtonLabel={"close"}
            >
              <Divider mb="md" />
              <div className={classes.navbar}>
                <Anchor className={`${classes.navitem} ${router.pathname === "/" ? classes.active : "" }`} href="/">Home</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname.includes("/courses") ? classes.active : "" }`} href="/courses">Courses</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname === "/about" ? classes.active : "" }`} href="/about">About</Anchor>
                <Space h="xs"/>
                <Anchor className={`${classes.navitem} ${router.pathname === "/contact" ? classes.active : "" }`} href="/contact">Contact</Anchor>
                {auth ? <Anchor  className={classes.navitem} href={userMe.role === "student" ? "/students" : "/admin"} mt="sm">Dashboard</Anchor> :
                <Group mt="lg">
                  <Anchor className={`${classes.navitem} ${classes.signin} ${router.pathname === "/auth/login" ? classes.activeSignIn : "" }`} href="/auth/login" >Login</Anchor>
                  <Anchor className={`${classes.navitem} ${classes.signup} ${router.pathname === "/auth/register" ? classes.activeSignUp : "" }`} href="/auth/register">Register</Anchor>
                </Group>
                }
              </div>
            </Drawer>
        </Navbar>}
    >
      <Anchor className={classes.whatsapp} href='https://wa.me/254703519593?text=Hello%2C%20I%20am%20interested%20in%20Coding4U' target='_blank'>
        <Image 
          src={whatsapp}
          height={60}
          width={60}
          alt="whatsapp icon"
        />
      </Anchor>
          {children}
    </AppShell>
  );
}

export default MainLayout;
