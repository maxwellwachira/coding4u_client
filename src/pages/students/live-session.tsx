import { useEffect, useState } from 'react';
import { Button, Center, Container, Grid, Paper, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useViewportSize } from '@mantine/hooks';
import { useRouter } from 'next/router';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import axios from 'axios';
import { urls } from '../../constants/urls';
import { getCookie } from 'cookies-next';

interface EnrolmentData {
    totalEnrolments: number;
    totalPages: number;
    currentPage: number;
    enrolments: {
        id: string;
        CourseId: string;
        progress: string;
    }[]
};

const LiveSession: NextPage = () => {
    const { auth, userMe } = useAuthContext();
    const [enrolmentData, setEnrolmentData] = useState<EnrolmentData | null>(null);
    const { width } = useViewportSize();
    const router = useRouter();
    let token = getCookie('accessToken');

    const getGreetings = () => {
        const date = new Date();
        const hourString = date.getHours();
        let greetings = '';

        if (hourString < 12) greetings = "Good Morning";
        if (hourString >= 12 && hourString < 17) greetings = "Good Afternoon";
        if (hourString >= 17 && hourString <= 24) greetings = "Good Evening";

        return greetings;
    }

    const getEnrolments = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/me`, { headers: { Authorization: `Bear ${token}` } });
            setEnrolmentData(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (!auth) router.push('/auth/logout');
        getEnrolments();
    }, [])

    if (!auth) return <></>;

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
                        {/* {enrolmentData?.totalEnrolments !== 0 ?
                            <Text weight={600} size={28} color="red">Not Authorized, Enrol to a course first</Text>
                            : */}

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
                                    <Stack justify="center" p="xl" style={{ height: '100%' }}>
                                        <Text>Click the button to join a live session</Text>
                                        <Button
                                            component='a'
                                            href='https://meet.google.com/cqb-myyf-ebm'
                                            variant='outline'
                                            color='dark'
                                            mt="xl"
                                            radius="xl"
                                            target='_blank'
                                            fullWidth
                                        >
                                            Join Now
                                        </Button>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        {/* } */}
                    </Paper>
                </Container>
            </StudentLayout>
        </>
    )
}

export default LiveSession;