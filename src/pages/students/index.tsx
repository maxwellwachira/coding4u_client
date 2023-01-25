import { useEffect, useState } from 'react';
import { ActionIcon, Box, Button, Card, Center, Container, CopyButton, Grid, Group, Stack, Text, TextInput } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import type { NextPage } from 'next';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { colors } from '../../constants/colors';
import { IconBook, IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconBrandPinterest, IconBrandTwitter, IconBrandWhatsapp, IconMail, IconSchool, IconTrophy } from '@tabler/icons';
import { useAuthContext } from '../../features/authentication';
import { urls } from '../../constants/urls';

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

const StudentDashboard: NextPage = () => {
    const [enrolmentData, setEnrolmentData] = useState<EnrolmentData | null>(null);
    const { auth, userMe } = useAuthContext();
    const { width } = useViewportSize();
    const router = useRouter();
    let token = getCookie('accessToken');

    const refLink = `https://coding-4u.com?ref=${userMe.referralCode}`;

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

    const completedCourses = () => {
        return enrolmentData?.enrolments.filter((el) => Number(el.progress) === 100);
    }

    useEffect(() => {
        if (!auth) router.push('/auth/logout');
        getEnrolments();
    }, [])

    if (!auth) return <></>;

    return (
        <>
            <Head>
                <title>Coding4U Student Dashboard</title>
                <meta name="description" content="Coding4U Student Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Center>
                        <Text mt="xl" weight={600} size={25} color={`${colors.primaryColor}`}>{`${getGreetings()} ${userMe.firstName} ${userMe.lastName}`}</Text>
                    </Center>
                    <Grid mt="xl">
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconBook color={`${colors.primaryColor}`} size={45} />
                                    <Text size={20}>Enrolled Courses</Text>
                                    <Text size={23}>{enrolmentData?.totalEnrolments}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconSchool color={`${colors.primaryColor}`} size={45} />
                                    <Text size={20}>Active Courses</Text>
                                    <Text size={23}>{Number(enrolmentData?.totalEnrolments) - (completedCourses() ? completedCourses.length : 0)}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col sm={6} md={4}>
                            <Card withBorder>
                                <Stack justify="center" align="center">
                                    <IconTrophy color={`${colors.primaryColor}`} size={45} />
                                    <Text size={20}>Courses Completed</Text>
                                    <Text size={23}>{completedCourses()?.length}</Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>
                    <Stack align="center">
                        <Text mt={40} weight={600} size={22} align='center'>My Referral Link</Text>
                        <Box style={{ width: width > 768 ? 600 : '90%', margin: 0 }}>
                            <CopyButton value={refLink} timeout={4000} >
                                {({ copied, copy }) => (
                                    <TextInput
                                        mt="sm"
                                        defaultValue={refLink}
                                        radius={10}
                                        rightSection={
                                            <Button
                                                color={copied ? 'dark' : 'red'}
                                                onClick={copy}
                                                radius={10}
                                            >
                                                {copied ? 'Copied link' : 'Copy link'}
                                            </Button>
                                        }
                                    />
                                )}
                            </CopyButton>
                            <Text mt={40} weight={600} size={18}  align='center'>Or Share</Text>
                            <Box style={{ display: 'flex', justifyContent: 'center', gap: 12 }} mt={20}>
                                <TwitterShareButton
                                    url={refLink}
                                    via='coding_4u'
                                    title='Learn to code with ease at Coding4U! Our comprehensive curriculum and experienced instructors will have you coding like a pro in no time. Enroll now!'
                                    hashtags={['coding', 'learncoding', 'coding4u']}
                                >
                                    <TwitterIcon
                                        size={32}
                                        round
                                    />
                                </TwitterShareButton>
                                {/* <PinterestShareButton
                                    url={refLink}
                                    media=''
                                    description='Learn to code with ease at Coding4U! Our comprehensive curriculum and experienced instructors will have you coding like a pro in no time. Enroll now!'
                                >
                                    <PinterestIcon
                                        size={32}
                                        round
                                    />
                                </PinterestShareButton> */}
                                <FacebookShareButton
                                    url={refLink}
                                    quote='Learn to code with ease at Coding4U! Our comprehensive curriculum and experienced instructors will have you coding like a pro in no time. Enroll now!'
                                    hashtag='#coding, #learncoding, #coding4u'
                                >
                                    <FacebookIcon
                                        size={32}
                                        round
                                    />
                                </FacebookShareButton>
                                <WhatsappShareButton
                                    url={refLink}
                                    title='Learn to code with ease at Coding4U! Our comprehensive curriculum and experienced instructors will have you coding like a pro in no time. Enroll now!'
                                >
                                    <WhatsappIcon
                                        size={32}
                                        round
                                    />
                                </WhatsappShareButton>
                                <LinkedinShareButton
                                    url={refLink}
                                    title="Cding4U"
                                    summary='Learn to code with ease at Coding4U! Our comprehensive curriculum and experienced instructors will have you coding like a pro in no time. Enroll now!'
                                >
                                    <LinkedinIcon 
                                        size={32}
                                        round
                                    />
                                </LinkedinShareButton>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </StudentLayout>
        </>
    )
}

export default StudentDashboard;