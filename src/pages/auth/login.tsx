import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Anchor, Button, Checkbox, Container, createStyles, Divider, Grid, Group, Paper, PasswordInput, Stack, Text, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';


const useStyles = createStyles((theme) => ({
    loginGradient: {
        background: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)',
        borderRadius: '40px 0px 0px 40px',
        position: 'relative',
        height: '100%',
        [theme.fn.smallerThan("md")]: {
            borderRadius: '40px 40px 0px 0px',
        },
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
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Sign In</Text>
                <Paper withBorder radius={40} mt={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" className={classes.loginGradient}>  
                                <Image 
                                    src="/login.svg"
                                    height={300}
                                    width={300}
                                    alt="login"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6} p={40}>
                            <Divider label="Welcome back" labelPosition="center" my="lg" />
                            <form>
                                <Stack mt={30}>  
                                    <TextInput
                                        required
                                        label="Email"
                                        placeholder="hello@gmail.com"
                                        radius={15}
                                        mt={15}
                                    />

                                    <PasswordInput
                                        required
                                        label="Password"
                                        placeholder="Your password"
                                        radius={15}
                                        mt={15}
                                    />

                                </Stack>

                                <Group position="apart" mt="xl">
                                <Anchor
                                    href='sign-up'
                                    color="dimmed"
                                    size="xs"
                                >
                                    Don't have an account? Register
                                </Anchor>
                                <Button type="submit" className={classes.submitButton} size="md">Login</Button>
                                </Group>
                                <Anchor
                                    href='forgot-password'
                                    color="dimmed"
                                    size="xs"
                                >
                                    Forgot Password?
                                </Anchor>    
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