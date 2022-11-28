import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Box, Button, Card, Center, Container, createStyles, Grid, Stack, Text, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import hero from '../assets/hero.png';
import schedule from '../assets/schedule.jpg';
import curriculum from '../assets/curriculum.jpg';
import coaching from '../assets/coaching.jpg';
import expert from '../assets/expert.png';
import iot from '../assets/js.png';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';

const useStyles = createStyles((theme) => ({
  cardWidth: {
    width: 230,
    minHeight: 350, 
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
  },

  exploreButton: {
    backgroundColor: `${colors.primaryColor}`,
    border: `2px solid ${colors.primaryColor}`,
    borderRadius: "10px",
    display: "inline-block",
    padding: "5px 12px",
    textAlign: "center",
    color:  theme.colors.gray[0],
    fontWeight: 'bold',
    margin: '30px 0',
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
    '&:hover': {
       opacity: 0.7,
       backgroundColor: `${colors.primaryColor}`,
       textDecoration: 'none'
        
    }
  },

  heading: {
    fontSize: '40px',
    fontWeight: 550,
  },

  headingTwo: {
    fontSize: '25px',
    fontWeight: 600
  },

  heroGradient: {
    maxWidth:1080,
    background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
    borderRadius: '40px 40px 240px 40px',
    marginBottom: 90,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  primaryLightBackground: {
    background: `${colors.primaryLight}`,
  },

  primaryText : {
    color : `${colors.primaryColor}`
  },
 

  secondaryText: {
    color: `${colors.secondaryColor}`
  },

  subscribeGradient: {
    maxWidth:1080,
    background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
    borderRadius: 40,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  subscribeWidth: {
    maxWidth: 400,
    width: "85%"
  },

  whiteText: {
    color: theme.colors.gray[0]
  }
 
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  const { width } = useViewportSize();

  return (
    <>
      <Head>
        <title>Coding4U | Home</title>
        <meta name="description" content="Coding4U Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Box className={classes.heroGradient}>
          <Container mt="xl">
            <Grid gutter={70}>
              <Grid.Col md={6}>
                <Stack>
                  <Text className={`${classes.heading}`} color="white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum efficitur arcu, eget gravida dui lobortis non. Integer hendrerit enim vitae metus consectetur egestas. Donec sit amet aliquam sem, et volutpat nisi. Maecenas augue elit, fringilla vel risus at, egestas pharetra erat. Nam in dolor ante. Aenean tincidunt iaculis felis. Nam dignissim dignissim sem vitae sagittis.</Text>
                </Stack>
                <Button
                  component='a'
                  href='#'
                  className={classes.exploreButton}
                >
                  Get started
                </Button>
              </Grid.Col>
              <Grid.Col md={6}>
                <Center>
                  <Image 
                    src={hero}
                    height={width >= 768 ? 500 : 350}
                    width={width >= 768 ? 500 : 310}
                    alt="Hero image"
                  />
                </Center>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Container>
          <Grid gutter="xl">
            <Grid.Col md={3}>
              <Text size={35} weight={600} color={`${colors.primaryColor}`}>Why should you Join Us</Text>
              <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum efficitur arcu, eget gravida dui lobortis non. Integer hendrerit enim vitae metus consectetur egestas. Donec sit amet</Text>
            </Grid.Col>
            <Grid.Col md={3}>
              <Stack align="center">
                <Card shadow={"lg"} radius={40} className={classes.cardWidth}>
                  <Card.Section>
                    <Center>
                      <Image
                        src={schedule}
                        width={200}
                        height={229}
                        alt="convinient schedule"
                      />
                    </Center>
                  </Card.Section>
                  <Text ml={20} size={23} weight={500}>
                    Convenient<br />Study<br />Schedule
                  </Text>
                </Card>
              </Stack>
            </Grid.Col>
            <Grid.Col md={3}>
              <Stack align="center">
                <Card shadow={"lg"} radius={40} className={classes.cardWidth} mt={width <= 992 ? 0 : 30} >
                  <Card.Section>
                    <Center my={20}>
                      <Image
                        src={curriculum}
                        width={245}
                        height={180}
                        alt="Good Curriculum"
                      />
                    </Center>
                  </Card.Section>
                  <Text ml={20} size={23} weight={500} mt={10}>
                  Well<br />Developed<br />Curriculum
                  </Text>
                </Card>
              </Stack>
            </Grid.Col>
            <Grid.Col md={3}>
              <Stack align="center">
                <Card radius={40} className={classes.cardWidth}>
                  <Card.Section>
                    <Center my={20}>
                      <Image
                        src={coaching}
                        width={300}
                        height={180}
                        alt="Best tutors"
                      />
                    </Center>
                  </Card.Section>
                  <Text ml={20} size={23} weight={500} mt={10}>
                    Well<br />Trained<br />Tutors
                  </Text>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Box className={classes.primaryLightBackground} my={70}>
          <Container py={50}>
            <Grid gutter={60}>
              <Grid.Col md={6}>
                <Text size={32} weight={550}>
                  Our Curriculum has been<br/>
                  <span className={classes.primaryText}>Developed by Industry Experts</span>
                </Text>
                <Text my="xl">
                  In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi 
                </Text>
                <Text size={25} weight={550}>
                  Our tutors are also<br/>
                  <span className={classes.primaryText}>Industry Experts</span>
                </Text>
                <Text my="xl">
                  In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi 
                </Text>
                <Button
                  component='a'
                  href='#'
                  className={classes.exploreButton}
                >
                  Get Started
                </Button>
              </Grid.Col>
              <Grid.Col md={6} my="xl">
                <Center>
                  <Image
                    src={expert}
                    alt="our experts"
                    width={width >= 768 ? 500 : 310}
                    height={width >= 768 ? 500 : 350}
                  />
                </Center>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Container>
          <Center mt={40}>
            <Text className={`${classes.primaryText}`} mt="xl" size={32} weight={550}>What We offer</Text>
          </Center>
          <Text my="xl">
             In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur, mauris odio malesuada est, eget imperdiet nunc mi eu massa. Proin sit amet nulla leo. Donec vitae blandit odio. Curabitur justo eros, porttitor eu quam a, interdum scelerisque eros.
          </Text>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Starter Package</Text>
          <Grid gutter={50}>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src='/scratch.svg'
                  height={width >= 768 ? 350 : 300}
                  width={width >= 768 ? 400 : 300}
                  alt="Starter package"
                />
              </Center>
            </Grid.Col>
            <Grid.Col md={6}>
              <Text mt="sm">
                 In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur, mauris odio malesuada est, eget imperdiet nunc mi eu massa. Proin sit amet nulla leo. Donec vitae blandit odio. Curabitur justo eros, porttitor eu quam a, interdum scelerisque eros
             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Course
             </Button>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Intermediate Package</Text>
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Text mt="sm">
                 In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur, mauris odio malesuada est, eget imperdiet nunc mi eu massa. Proin sit amet nulla leo. Donec vitae blandit odio. Curabitur justo eros, porttitor eu quam a, interdum scelerisque eros
             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Courses
             </Button>
            </Grid.Col>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src="/intermediate.svg"
                  height={width >= 768 ? 350 : 300}
                  width={width >= 768 ? 400 : 300}
                  alt="Intermediate"
                />
              </Center>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Advanced Package</Text>
          <Grid gutter={70}>
            <Grid.Col md={6}>
              <Center>
                <Image 
                  src={iot}
                  height={width >= 768 ? 350 : 300}
                  width={width >= 768 ? 400 : 300}
                  alt="IoT"
                />
              </Center>
            </Grid.Col>
            <Grid.Col md={6}>
              <Text mt="sm">
                 In hac habitasse platea dictumst. Nunc quis elit in velit viverra vestibulum. Sed id urna et erat venenatis aliquam. Ut aliquet risus in nisi elementum, ac vulputate neque maximus. Ut nisi lorem, scelerisque rhoncus mattis eu, vehicula a mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus, leo at consequat consectetur, mauris odio malesuada est, eget imperdiet nunc mi eu massa. Proin sit amet nulla leo. Donec vitae blandit odio. Curabitur justo eros, porttitor eu quam a, interdum scelerisque eros
             </Text>
             <Button
              component='a'
              href='#'
              className={classes.exploreButton}
             >
              Explore Courses
             </Button>
            </Grid.Col>
          </Grid>
        </Container>

        <Box className={classes.subscribeGradient} my={70}>
          <Container>
            <Grid>
              <Grid.Col md={7} mt={30}>
                <Text size={32} weight={550} color="white">Don't be left out, <br />Subscribe to our News Letter</Text>
                <form className={classes.subscribeWidth}>
                    <TextInput 
                        mt="xl"
                        placeholder={`        Enter Your Email`}
                        rightSection={<Button radius={"lg"} size="lg" style={{background: `${colors.primaryColor}`}}>Subscribe</Button>}
                        radius="lg"
                        size="lg"
                    />
                </form>
              </Grid.Col>
              <Grid.Col md={5}>
                <Center>
                  <Image 
                    src='/subscribe.svg'
                    height={300}
                    width={300}
                    alt="subscibe"
                  />
                </Center>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
        <FooterLinks data={footerData}/>
      </MainLayout>
    </>
  )
}

export default Home;