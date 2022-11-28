import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Box, Button, Card, Center, Container, createStyles, Grid, Paper, Stack, Text, Textarea, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';

const useStyles = createStyles((theme) => ({
    contactGradient: {
        background: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)',
        borderRadius: '40px 0px 0px 40px',
        position: 'relative',
        height: '100%',
        [theme.fn.smallerThan("md")]: {
            borderRadius: '40px 40px 0px 0px',
        },
    },

    subscribeGradient: {
        maxWidth:1080,
        background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
        borderRadius: 40,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    subscribeWidth: {
        maxWidth: 400,
        width: "85%"
    },

    submitButton: {
        backgroundColor: `${colors.primaryColor}`,
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "10px 20px",
        textAlign: "center",
        color:  theme.colors.gray[0],
        fontWeight: 600,
        margin: '30px 0',
        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
        '&:hover': {
           opacity: 0.7,
           backgroundColor: `${colors.primaryColor}`,
           textDecoration: 'none'
            
        }
      },
}));

const Contact: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
        <Head>
            <title>Coding4U | Contact Us</title>
            <meta name="description" content="Coding4U Contact Us Page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container mb={50}>
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Get In Touch</Text>
                <Paper withBorder radius={40} mt={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" className={classes.contactGradient}>  
                                <Image 
                                    src="/contact.svg"
                                    height={300}
                                    width={300}
                                    alt="contact"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6} p={40}>
                            <form>
                                <Stack>
                                    <TextInput
                                        label='Full Name'
                                        placeholder={`     Enter Full Name`}
                                        radius={15}
                                        withAsterisk
                                    />
                                    <TextInput
                                        label='Email'
                                        placeholder={`     Enter your email`}
                                        radius={15}
                                        withAsterisk
                                    />
                                    <TextInput
                                        label='Subject'
                                        placeholder={`     Enter Subject`}
                                        radius={15}
                                        withAsterisk
                                    />
                                    <Textarea 
                                        label='Message'
                                        placeholder={`     Enter Message`}
                                        radius={15}
                                        withAsterisk
                                    />
                                    <Button className={classes.submitButton} size="md">
                                        Send
                                    </Button>
                                </Stack>
                            </form>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>

            {/* <Box className={classes.subscribeGradient} my={70}>
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
            </Box> */}
            <FooterLinks data={footerData}/>
        </MainLayout>
        </>
    );
}

export default Contact;