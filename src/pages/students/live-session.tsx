import { Button,  Center, Container, Grid, Paper, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useViewportSize } from '@mantine/hooks';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';


const LiveSession: NextPage = () => {
    const { userMe } = useAuthContext();
    const { width } = useViewportSize();

    const getGreetings = () => {
        const date = new Date();
        const hourString = date.getHours();
        let greetings = '';

        if (hourString <  12) greetings = "Good Morning";
        if (hourString >=  12 && hourString < 17) greetings = "Good Afternoon";
        if (hourString >=  17 && hourString <= 24) greetings = "Good Evening";

        return greetings;
    }

    return (
        <>
        <Head>
            <title>Coding4U Student Live-Session</title>
            <meta name="description" content="Coding4U Student Live-Session" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <StudentLayout>
            <Container>
                <Center>
                    <Text mt="xl" weight={600} size={28} color={`${colors.primaryColor}`}>{`${getGreetings()} ${userMe.firstName} ${userMe.lastName}`}</Text>
                </Center>
                <Paper radius={40} withBorder p="xl" my={50}>
                    <Grid gutter={40}>
                        <Grid.Col md={7}>
                            <Center>
                                <Image 
                                    src="/zoom.svg"
                                    height={width >= 768 ? 400 : 315}
                                    width={width >= 768 ? 400 : 315}
                                    alt="zoom"
                                />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={5}>
                            <Stack justify="center" p="xl" style={{height: '100%'}}>    
                                <Text>Click the button to join a live session</Text>
                                <Button
                                    component='a'
                                    href='/meeting/live-session'
                                    variant='outline'
                                    color='dark'
                                    mt="xl"
                                    radius="xl"
                                    fullWidth
                                >
                                    Join Now
                                </Button>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </StudentLayout>
        </>
    )
}

export default LiveSession;