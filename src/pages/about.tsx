import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Card, Center, Container, createStyles, Grid, List, Stack, Text, TextInput, ThemeIcon, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconCircleCheck } from '@tabler/icons';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';
import mission from '../assets/mission.jpg';
import maxwell from '../assets/profile.png';
import aerlene from '../assets/aerlene.png';

const useStyles = createStyles((theme) => ({
    cardShadow: {
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        maxWidth: 350
    },

    subscribeGradient: {
        maxWidth: 1080,
        background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
        borderRadius: 40,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    subscribeWidth: {
        maxWidth: 400,
        width: "85%"
    },
}));

const About: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
            <Head>
                <title>Coding4U | About</title>
                <meta name="description" content="Coding4U About Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container>
                    <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>About Coding4U</Text>
                    <Text>At Coding4U, we are reimagining STEM education and training to ensure every student is equipped with the technical skills necessary for the future of work.</Text>
                    <Text>we offer learning pathways and programs for individuals at every stage of their STEM journey, including: young students and educators, community college and university students and faculty, and members of the workforce.</Text>
                    <Text size={20} weight={5500} color={`${colors.primaryColor}`}>Explore Learn Innovate</Text>

                    <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Vision</Text>
                    <Grid>
                        <Grid.Col md={6}>
                            <Center>
                                <Image
                                    src="/vision.svg"
                                    height={280}
                                    width={300}
                                    alt="vision"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={6} mt={20}>
                            <Text>
                                Our vision is one that strives to connect our African people to the future they envision for themselves.  This is the goal in-front of us and it keeps us striving for more. Simply put…we will know we are succeeding when people working in tech in Africa have the same earning potential as their global counterparts possessing the same aptitude and mindset.
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Mission</Text>
                    <Grid>
                        <Grid.Col md={6}>
                            <Center>
                                <Image
                                    src={mission}
                                    height={250}
                                    width={250}
                                    alt="mission"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={6} mt={20}>
                            <Text mt={20}>
                                Coding4U Academy is a multi-disciplinary learning-accelerator committed to closing the skills-gap in Africa's Computer Programming while delivering transformative tech-based learning to high-potential Tech-preneurs and jobseekers
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={50} align="center">Our Team</Text>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center">
                                <Card className={classes.cardShadow} radius={40} p={20} withBorder mt={40}>
                                    <Card.Section>
                                        <Center mt={20}>
                                            <Image
                                                src={aerlene}
                                                width={180}
                                                height={180}
                                                alt="Aerlene Mugambi"
                                            />
                                        </Center>
                                    </Card.Section>
                                    <Text weight={600} align="center" mt="xl" size={24} mb="lg" fs="italic">Aerlene Mugambi</Text>
                                    <List 
                                        withPadding
                                        spacing="xs"
                                        icon={
                                            <ThemeIcon color="red" size={24} radius="xl">
                                              <IconCircleCheck size={16} />
                                            </ThemeIcon>
                                          }
                                          mb="sm"
                                    >
                                        <List.Item>Sales & Marketing</List.Item>
                                        <List.Item>Enterprise Sales Manager - Airtel Kenya for 7 years</List.Item>
                                        <List.Item>Entreprenuer - Real Estate, crypto & forex</List.Item>
                                        <List.Item>Cryptocurrency Educator</List.Item>
                                        <List.Item>Founder, Beyondfiat Academy</List.Item>
                                    </List>
                                </Card>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Stack align="center">
                                <Card className={classes.cardShadow} radius={40} p={20} withBorder mt={40}>
                                    <Card.Section>
                                        <Center mt={20}>
                                            <Image
                                                src={maxwell}
                                                width={180}
                                                height={180}
                                                alt="Maxwell Wachira"
                                            />
                                        </Center>
                                    </Card.Section>
                                    <Text weight={600} align="center" mt="xl" size={24} mb="lg" fs="italic">Maxwell Wachira</Text>
                                    <List 
                                        withPadding
                                        spacing="xs"
                                        icon={
                                            <ThemeIcon color="red" size={24} radius="xl">
                                              <IconCircleCheck size={16} />
                                            </ThemeIcon>
                                          }
                                    >
                                        <List.Item>Software Engineer</List.Item>
                                        <List.Item>Tech Entreprenuer</List.Item>
                                        <List.Item>Founder, Atego</List.Item>
                                        <List.Item>Web3 & Blockchain expert</List.Item>
                                        <List.Item>Bsc. Mechatronics Eng.</List.Item>
                                        <List.Item>Business Management - King's College London</List.Item>
                                    </List>
                                </Card>
                            </Stack>
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
                                        placeholder={`     Enter Your Email`}
                                        rightSection={<Button radius={"lg"} size="md" style={{ background: `${colors.primaryColor}` }}>Subscribe</Button>}
                                        radius="lg"
                                        size="md"
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
                <FooterLinks data={footerData} />
            </MainLayout>
        </>
    );
}

export default About;