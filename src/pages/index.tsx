import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Card, Center, Container, createStyles, Grid, MediaQuery, Stack, Text, TextInput, } from '@mantine/core';
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
import Subscribe from '../components/subscribe/subscribe';

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
    color: theme.colors.gray[0],
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
    maxWidth: 1080,
    background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
    borderRadius: '40px 40px 240px 40px',
    marginBottom: 90,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  primaryLightBackground: {
    background: `${colors.primaryLight}`,
  },

  primaryText: {
    color: `${colors.primaryColor}`
  },


  secondaryText: {
    color: `${colors.secondaryColor}`
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
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Grid gutter={30}>
                <Grid.Col md={6}>
                  <Text className={`${classes.heading}`} color="white" mt={5} fz={28} fw={600}>Training the future workforce in emerging technologies by nurturing Africa's Tech Talent</Text>
                  <Center>
                    <Image
                      src={hero}
                      height={width >= 768 ? 500 : 350}
                      width={width >= 768 ? 500 : 310}
                      alt="Hero image"
                    />
                  </Center>
                </Grid.Col>
                <Grid.Col md={6}>
                  <Stack justify="center" align={width >= 768 ? "center" : "flex-start"}>
                    <Text size={20} weight={550} >Coding4U Academy <br />Learn . Explore . Innovate.</Text>
                    <Button
                      component='a'
                      href='/courses'
                      className={classes.exploreButton}
                    >
                      Get started
                    </Button>
                  </Stack>
                </Grid.Col>
              </Grid>
            </MediaQuery>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Grid gutter={70}>
                <Grid.Col md={6}>
                  <Stack>
                    <Text className={`${classes.heading}`} color="white" mt={width > 768 ? 30 : 5}>Training the future workforce in emerging technologies by nurturing Africa's Tech Talent
                    </Text>
                    <Text size={18} weight={550}>Coding4U Academy - Learn . Explore . Innovate.</Text>
                  </Stack>
                  <Button
                    component='a'
                    href='/courses'
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
            </MediaQuery>
          </Container>
        </Box>

        <Container>
          <Grid gutter="xl">
            <Grid.Col md={3}>
              <Text size={35} weight={600} color={`${colors.primaryColor}`}>Why should you Join Us</Text>
              <Text>We are a team of experts committed to skill building and workforce development in technologies that are going to change the world over the next decade </Text>
              <Text weight={600} mt={10}>Don't be left out!!</Text>
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
                  Our Curriculum has been<br />
                  <span className={classes.primaryText}>Developed by Industry Experts</span>
                </Text>
                <Text mt="xl">
                  Who is better to develop a curriculum than industry experts?
                </Text>
                <Text mb="xl">Our curriculum has been developed having our learners in mind making it easy to understand and apply</Text>

                <Text size={25} weight={550}>
                  Our tutors are also<br />
                  <span className={classes.primaryText}>Industry Experts</span>
                </Text>
                <Text my="xl">
                  We don't stop at having experts develop our curriculum, we also bring them on board to teach our students bringing with them industrial experience.
                </Text>
                <Button
                  component='a'
                  href='/courses'
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
          <Text mt="xl">
            Our courses are categorized into three groups. From Beginner courses all the way to advanced courses. We train students from as young as 10 years old all the way up - we have no upper age limit.
          </Text>
          <Text mb="xl">No prior programming experience is required to enrol in some of our programs. You will join as an amateur and leave as an expert </Text>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Beginner Package</Text>
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
                Students in this course will learn <Text component='span' weight={600}>Scratch Programming</Text>
              </Text>
              <Text>Scratch is a visual, block-based programming language developed by MIT</Text>
              <Text>Scratch is the best way to introduce children to programming. It encourages creative thinking, fosters problem solving, helps develop logical thinking skills and on top of it all, it is fun and interactive to learn</Text>
              <Text>No prior programming knowledge is required to join this course</Text>

              <Button
                component='a'
                href='/courses/beginner'
                className={classes.exploreButton}
              >
                Explore Course
              </Button>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Intermediate Package</Text>
          <Grid gutter={50}>
            <Grid.Col md={6}>
              <Text mt="sm">
                Students in this course will learn <Text component='span' weight={600}>Static Web Development with HTML and CSS</Text>
              </Text>
              <Text>
                Web development is the process of designing, building and maintaining a website. At the end of this course, Students should be able to build static websites
              </Text>
              <Text>Web development is high on demand all over the world. Our curriculum follows international standards. The material you learn at Coding4U is the same abroad</Text>
              <Text>
                No prior programming knowledge is required to join this course
              </Text>
              <Button
                component='a'
                href='/courses/intermediate'
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
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Advanced 1 - JavaScript</Text>
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
                Students in this course will learn <Text component='span' weight={600}>Dynamic Web Development with Pure JavaScript</Text>
              </Text>
              <Text>Unlike in the previous courses, students in this course should have a solid understanding of HTML and CSS. Don't worry, you can enrol in our intermediate course to learn HTML and CSS.</Text>
              <Text>JavaScript(JS) is the widely used Programming Language in Web development. There are tones of JS libraries that are very popular for instance ReactJS, VueJS, Angular. JavaScript can also be used for server side development and Web3/smart contracts development</Text>
              <Text>Learning JavaScript will open doors to many opportunities</Text>
              <Button
                component='a'
                href='/courses/advanced'
                className={classes.exploreButton}
              >
                Explore Courses
              </Button>
            </Grid.Col>
          </Grid>
          <Text className={`${classes.primaryText}`} mt="xl" component='h1' size={27}>Advanced 2 - Node.js</Text>
          <Grid gutter={50}>
            <Grid.Col md={6}>
              <Text mt="sm">
                Students in this course will learn <Text component='span' weight={600}>Backend Development using Node.js</Text>
              </Text>
              <Text>
                Back-end development refers to the development of server-side logic that powers websites and apps from behind the scenes.
              </Text>
              <Text>In this course we will be using Node.js which is server-side JavaScript for backend development</Text>
              <Text>
                 Prior programming knowledge in JavaScript is required.  Don't worry, you can enrol in our JavaScript course 
              </Text>
              <Button
                component='a'
                href='/courses/advanced2'
                className={classes.exploreButton}
              >
                Explore Courses
              </Button>
            </Grid.Col>
            <Grid.Col md={6}>
              <Center>
                <Image
                  src="/advanced2.svg"
                  height={width >= 768 ? 350 : 300}
                  width={width >= 768 ? 400 : 300}
                  alt="Node JS"
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
        <Subscribe />
        <FooterLinks data={footerData} />
      </MainLayout>
    </>
  )
}

export default Home;