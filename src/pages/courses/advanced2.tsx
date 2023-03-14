import { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Accordion, Badge, Button, Card, Center, Container, createStyles, Grid, Group, List, Stack, Tabs, Text, } from '@mantine/core';
import { useRouter } from 'next/router';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { IconArrowLeft, IconBook, IconClipboard, IconPlus } from '@tabler/icons';
import { urls } from '../../constants/urls';
import { useAuthContext } from '../../features/authentication';
import { setCookie } from 'cookies-next';

const useStyles = createStyles((theme) => ({
    cardShadow: {
        maxWidth: 315
    },
    enrolButton: {
        width: 200,
        backgroundColor: `${colors.primaryColor}`,
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "10px 20px",
        textAlign: "center",
        color: theme.colors.gray[0],
        fontWeight: 600,
        margin: '30px 0',
        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
        '&:hover': {
            opacity: 0.7,
            backgroundColor: `${colors.primaryColor}`,
            textDecoration: 'none'

        }
    },
    enrolCardPosition: {
        // position: 'fixed',

        [theme.fn.smallerThan("md")]: {
            position: 'relative',
        },
    }

}));

const Advanced2: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();
    const { auth, userMe } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [enrolled, setEnrolled] = useState(false);
    const router = useRouter();

    const enroll = async (UserId: string, CourseId: string) => {
        try {
            const { status } = await axios.post(`${urls.baseUrl}/enrolment`, { UserId, CourseId });
            if (status === 201) {
                setResponse("success");
                return {
                    message: "success"
                };
            }
        } catch (error) {
            console.log(error);
            setResponse("error");
            return {
                message: "error"
            };
        }
    }

    const isEnrolled = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/course/4/user/${userMe.id}`);
            if (data.exists) {
                setEnrolled(true);
            } else {
                setEnrolled(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClick = async () => {
        //check if auth otherwise direct to login page
        if(!auth) router.push('/auth/login').then(() => router.reload());
        //Check if role is admin or tutor or course pricing is free
        setLoading(true);
        if (userMe.role === "admin" || userMe.role === "tutor") {
            const enrolment = await enroll(userMe.id, '4');
            if (enrolment?.message === "success") {
                router.push("/students/courses");
            }
        } else {
            try {
                const pesapalData = {
                    amount: 249,
                    email: userMe.email,
                    firstName: userMe.firstName,
                    lastName: userMe.lastName
                };
                const { data } = await axios.post(`${urls.baseUrl}/pesapal/iframe`, pesapalData);
                if (Number(data.status) === 200) {
                    setCookie('order_tracking_id', data.order_tracking_id);
                    router.push(data.redirect_url);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        isEnrolled();
    }, []);

    return (
        <>
            <Head>
                <title>Coding4U | Node.js Course</title>
                <meta name="description" content="Master the fundamentals of Node.js, Express.js and Backend development with our comprehensive online course. Start your journey today!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container>
                    <Button
                        component='a'
                        href='/courses'
                        size='xs'
                        mb="lg"
                        color="dark"
                        variant='outline'
                        leftIcon={<IconArrowLeft />}
                        radius="xl"
                    >
                        Go Back
                    </Button>
                    <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Advanced course 2 - Node.js</Text>
                    <Grid mb="xl">
                        <Grid.Col md={8}>
                            <Center>
                                <Image
                                    src="/advanced2.svg"
                                    height={width >= 768 ? 450 : 300}
                                    width={width >= 768 ? 500 : 300}
                                    alt="advanced package"
                                />
                            </Center>
                            <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="xl">
                                <Tabs.List>
                                    <Tabs.Tab value="courseInfo" icon={<IconBook size={14} />}>Course Info</Tabs.Tab>
                                    <Tabs.Tab value="curriculum" icon={<IconClipboard size={14} />}>Curriculum</Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="courseInfo" pt="xs" mt="xl">
                                    <Text size={28} weight={600} color={`${colors.primaryColor}`}>About Course</Text>
                                    <Text mt={20}>Students in this category will learn Node.js. Node.js is server side JavaScript used in writing backend code. </Text>
                                    <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                    <Text mt={15}>Anyone with prior experience in JavaScript</Text>
                                    <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Requirements</Text>
                                    <Text mt={15} mb={50}>Laptop/PC & stable internet connection</Text>
                                </Tabs.Panel>
                                <Tabs.Panel value="curriculum" pt="xs" mt="xl">
                                    <Text size={28} weight={600} color={`${colors.primaryColor}`}>Curriculum</Text>
                                    <Accordion
                                        chevron={<IconPlus size={16} />}
                                        styles={{
                                            chevron: {
                                                '&[data-rotate]': {
                                                    transform: 'rotate(45deg)',
                                                },
                                            },
                                        }}
                                    >
                                        <Accordion.Item value="week1">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 1</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Getting Started</Text>
                                                <List withPadding>
                                                    <List.Item>Introduction to Node.js</List.Item>
                                                    <List.Item>Installing Node</List.Item>
                                                    <List.Item>How Node works</List.Item>
                                                </List>
                                                <Text weight={600}>Node JS Modules</Text>
                                                <List withPadding>
                                                    <List.Item>Functions</List.Item>
                                                    <List.Item>Buffer</List.Item>
                                                    <List.Item>Modules</List.Item>
                                                    <List.Item>Modules Types</List.Item>
                                                    <List.Item>Core Modules</List.Item>
                                                    <List.Item>Local Modules</List.Item>
                                                    <List.Item>Modules Exports</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week2">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Node Package Manager (NPM)</Text>
                                                <List withPadding>
                                                    <List.Item>What is NPM?</List.Item>
                                                    <List.Item>Installing Packages Locally</List.Item>
                                                    <List.Item>Installing Packages Globally</List.Item>
                                                    <List.Item>Adding dependency in package json</List.Item>
                                                    <List.Item>Updating packages</List.Item>
                                                </List>
                                                <Text weight={600}>Creating Web Server</Text>
                                                <List withPadding>
                                                    <List.Item>Creating Web Server</List.Item>
                                                    <List.Item>Sending Requests</List.Item>
                                                    <List.Item>Handling HTTP requests</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week3">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>File System</Text>
                                                <List withPadding>
                                                    <List.Item>Read File</List.Item>
                                                    <List.Item>Writing a File</List.Item>
                                                    <List.Item>Opening a file</List.Item>
                                                    <List.Item>Deleting a FIle</List.Item>
                                                    <List.Item>Writing a file asynchronously</List.Item>
                                                    <List.Item>Other I/O Operations</List.Item>
                                                </List>
                                                <Text weight={600}>Debugging Node JS Application</Text>
                                                <List withPadding>
                                                    <List.Item>Core Node JS Debugger</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week4">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Events</Text>
                                                <List withPadding>
                                                    <List.Item>Event Emitter class</List.Item>
                                                    <List.Item>Inheriting Events</List.Item>
                                                    <List.Item>Returning event emitter</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week5">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Express JS</Text>
                                                <List withPadding>
                                                    <List.Item>Introduction to Express.js</List.Item>
                                                    <List.Item>Configuring Routes</List.Item>
                                                    <List.Item>Working with Express</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week6">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 6</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Serving Static Resources</Text>
                                                <List withPadding>
                                                    <List.Item>Serving Static Files</List.Item>
                                                    <List.Item>Working with Middleware</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week7">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 7</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Database Connectivity</Text>
                                                <List withPadding>
                                                    <List.Item>Connecting Strings</List.Item>
                                                    <List.Item>Configuring</List.Item>
                                                    <List.Item>Creating Records</List.Item>
                                                    <List.Item>Updating Records</List.Item>
                                                    <List.Item>Deleting Records</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week8">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 8</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Project Development</Text>
                                                <List withPadding>
                                                    <List.Item>Project Development using Node JS</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    </Accordion>
                                </Tabs.Panel>
                            </Tabs>
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Stack align="center" className={classes.enrolCardPosition} mt={20}>
                                <Card className={classes.cardShadow} radius={40} p="xl" withBorder>
                                    <Group position="apart">
                                        <Text size={24} weight={600} color={`${colors.primaryColor}`}>Price: </Text>
                                        <Badge color="dark" size="lg">249 USD</Badge>
                                    </Group>
                                    <Text mt={20}>Explore Learn Innovate</Text>
                                    <Text mt={20}>Don't be left out, Enroll today</Text>
                                    <Center>
                                        {
                                            enrolled ?
                                                <Button className={classes.enrolButton} size="md" component='a' href='/students'>
                                                    Continue Learning
                                                </Button> :

                                                <Button className={classes.enrolButton} size="md" onClick={onClick} loading={loading}>
                                                    Enroll
                                                </Button>
                                        }
                                    </Center>
                                </Card>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
                <FooterLinks data={footerData} />
            </MainLayout>
        </>
    );
}

export default Advanced2;
