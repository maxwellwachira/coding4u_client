import { Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons';
import Image from 'next/image';

import { useStyles } from './footer.styles';
import logo from '../../assets/logo.jpeg';
import { colors } from '../../constants/colors';


interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

 function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image 
            src={logo}
            width={240}
            height={83}
            alt='logo'
          />
          <Text size="xs" color="dimmed" className={classes.description} align="center">
            Don't wait, Enrol today
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 Coding4U. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg" component='a' href='https://twitter.com/coding_4u'>
            <IconBrandTwitter size={18} stroke={1.5} color={`${colors.primaryColor}`}/>
          </ActionIcon>
          <ActionIcon size="lg" component='a' href='https://www.facebook.com/profile.php?id=100087907676581&mibextid=ZbWKwL'>
            <IconBrandFacebook size={18} stroke={1.5} color={`${colors.primaryColor}`}/>
          </ActionIcon>
          <ActionIcon size="lg" component='a' href='https://www.instagram.com/p/ClgyESTMCzU/?igshid=YmMyMTA2M2Y='>
            <IconBrandInstagram size={18} stroke={1.5} color={`${colors.primaryColor}`}/>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default FooterLinks;