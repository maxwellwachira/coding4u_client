import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Anchor, Button, Checkbox, Container, createStyles, Grid, Group, Paper, PasswordInput, Stack, Text, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';


const useStyles = createStyles((theme) => ({
    registerGradient: {
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

const Register: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
        <Head>
            <title>Coding4U | Register</title>
            <meta name="description" content="Coding4U Register Page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container mb={50}>
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Sign Up</Text>
                <Paper withBorder radius={40} mt={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" className={classes.registerGradient}>  
                                <Image 
                                    src="/register.svg"
                                    height={300}
                                    width={300}
                                    alt="contact"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6} p={40}>
                            <form>
                                <Stack mt={20}>
                                    <Grid>
                                        <Grid.Col md = {6}>
                                        <TextInput
                                            required
                                            label="First Name"
                                            placeholder="Your first name"
                                            radius={15}
                                        />
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                        <TextInput
                                            required
                                            label="Last Name"
                                            placeholder="Your last name"
                                            radius={15}
                                        />
                                        </Grid.Col>
                                    </Grid>

                                    <TextInput
                                        required
                                        label="Email"
                                        placeholder="hello@gmail.com"
                                        radius={15}
                                    />

                                    <TextInput
                                        required
                                        label="Phone Number"
                                        placeholder="254703519593"
                                        radius={15}
                                    />

                                    <PasswordInput
                                        required
                                        label="Password"
                                        placeholder="Your password"
                                        radius={15}
                                    />


                                    <Checkbox
                                        label="I accept terms and conditions"
                                        mt={15}
                                    />
                                </Stack>

                                <Group position="apart" mt="xl">
                                    <Anchor
                                        href='/auth/sign-in'
                                        color="dimmed"
                                        size="xs"
                                    >        
                                        Already have an account? Login
                                    </Anchor>
                                    <Button type="submit" className={classes.submitButton} size="md">Register</Button>
                                </Group>
                            </form>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </MainLayout>
        </>
    );
}

export default Register;