import { useState, ReactNode } from 'react';
import { Burger, Header, Navbar, MediaQuery, ScrollArea, Text, AppShell, Box } from '@mantine/core';
import {
  IconGauge,
  IconUsers,
  IconCertificate,
  IconLogout,
  IconDeviceComputerCamera,
  IconUpload,
  IconApps,
} from '@tabler/icons';
import { useRouter } from 'next/router';

import { UserButton } from '../../components/userButton/userButton';
import { LinksGroup } from '../../components/navbarLinkGroups/navbarLinkGroups';
import { useStyles } from './studentLayout.styles';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';

type Props = {
  children: ReactNode;
}

export function StudentLayout({children}: Props ) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const { userMe } = useAuthContext();

  const getInitials = (nameString: string) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }


  const data = [
    { 
      label: 'Main Page', 
      icon: IconApps, 
      link: '/', 
      active: router.pathname === '/' ? true : false
    },
    { 
      label: 'Dashboard', 
      icon: IconGauge, 
      link: '/students', 
      active: router.pathname === '/students' ? true : false
    },
    {
      label: 'Live Session',
      icon: IconDeviceComputerCamera,
      link: '/students/live-session',
      active: router.pathname === '/students/live-session' ? true : false,
    },
    {
      label: 'My referrals',
      icon: IconUsers,
      link: '/students/referrals',
      active: router.pathname === '/students/referrals' ? true : false,
    },
    {
      label: 'Uploads',
      icon: IconUpload,
      link: '/students/uploads',
      active: router.pathname === '/students/uploads' ? true : false,
    },
    { 
      label: 'Certificates', 
      icon: IconCertificate, 
      link: '/students/certificates', 
      active: router.pathname === '/students/certificates' ? true : false,
    },
  
    { 
      label: 'Logout', 
      icon: IconLogout, 
      link: '/auth/logout',  
      active: router.pathname === '/students/logout' ? true : false,
    },
  ];

  const links = data.map((item) => <LinksGroup {...item} key={item.label}/>);

  return (
      <AppShell
        header={
         <Header height={60} p="md" style={{background: 'black'}}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={`${colors.primaryColor}`}
                mr="xl"
              />
            </MediaQuery>
            <Box ml={30}>
                <Text size={28} weight={600} color={'white'}>Coding4U</Text>
            </Box>
           
          </div>
        </Header>
        }
        navbar = {
          <Navbar height={`cal(100vh - 50px)`} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} p="sm" className={classes.navbar} >
            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
              <UserButton
                  initials={getInitials(`${userMe.firstName} ${userMe.lastName}`)}
                  name={`${userMe.firstName} ${userMe.lastName}`}
                  email={`${userMe.email}`}
                />
            </Navbar.Section>   
        </Navbar>
        }
      >
        {children}
      </AppShell>
    
  );
}
