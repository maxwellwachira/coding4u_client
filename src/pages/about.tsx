import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Box, Button, Card, Center, Container, createStyles, Grid, Stack, Text, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';
import mission from '../assets/mission.jpg';

const useStyles = createStyles((theme) => ({
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
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis eros nisl, in pellentesque dolor facilisis vel. Etiam euismod, ligula eget sollicitudin elementum, sapien ipsum sodales urna, at imperdiet nunc neque et quam. Duis blandit dolor et rutrum congue. Nullam sodales nisl eget aliquet faucibus. In sagittis enim vitae lectus dignissim sodales. Curabitur sed urna non dolor bibendum elementum. Proin eget maximus dolor. Suspendisse molestie</Text>
                <Text size={20} weight={5500} color={`${colors.primaryColor}`}>Explore Learn Innovate</Text>

                <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Mission</Text>
                <Grid>
                    <Grid.Col md={6}>
                        <Center>
                            <Image 
                                src={mission}
                                height={280}
                                width={280}
                                alt="mission"
                            />
                        </Center>
                    </Grid.Col>
                    <Grid.Col md={6} mt={20}>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis eros nisl, in pellentesque dolor facilisis vel. Etiam euismod, ligula eget sollicitudin elementum, sapien ipsum sodales urna, at imperdiet nunc neque et quam. Duis blandit dolor et rutrum congue. Nullam sodales nisl eget aliquet faucibus. In sagittis enim vitae lectus dignissim sodales. Curabitur sed urna non dolor bibendum elementum. Proin eget maximus dolor. Suspendisse molestie</Text>
                    </Grid.Col>
                </Grid>
                <Text size={28} weight={600} color={`${colors.primaryColor}`} mt={40}>Our Vision</Text>
                <Grid>
                    <Grid.Col md={6}>
                        <Center>
                            <Image 
                                src="/vision.svg"
                                height={300}
                                width={300}
                                alt="vision"
                            />
                        </Center>
                    </Grid.Col>
                    <Grid.Col md={6} mt={20}>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis eros nisl, in pellentesque dolor facilisis vel. Etiam euismod, ligula eget sollicitudin elementum, sapien ipsum sodales urna, at imperdiet nunc neque et quam. Duis blandit dolor et rutrum congue. Nullam sodales nisl eget aliquet faucibus. In sagittis enim vitae lectus dignissim sodales. Curabitur sed urna non dolor bibendum elementum. Proin eget maximus dolor. Suspendisse molestie</Text>
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
    );
}

export default About;