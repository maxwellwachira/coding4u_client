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
import advanced from '../../assets/js.png';
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

const Advanced: NextPage = () => {
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
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/course/3/user/${userMe.id}`);
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
            const enrolment = await enroll(userMe.id, '3');
            if (enrolment?.message === "success") {
                router.push("/students/courses");
            }
        } else {
            try {
                const pesapalData = {
                    amount: 20000,
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
                <title>Coding4U | Advanced Course</title>
                <meta name="description" content="Coding4U Advanced Course" />
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
                    <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Advanced 1 - JavaScript</Text>
                    <Grid mb="xl">
                        <Grid.Col md={8}>
                            <Center>
                                <Image
                                    src={advanced}
                                    height={width >= 768 ? 400 : 300}
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
                                    <Text mt={20}>Students in this category will learn JavaScript which makes website content dynamic. Most modern web framework utilizes JavaScript </Text>
                                    <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                    <Text mt={15}>Anyone who has gone through the intermediate stage or has knowledge in HTML and CSS </Text>
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
                                                <Text weight={600}>Introduction to JavaScript</Text>
                                                <List withPadding>
                                                    <List.Item>What is JavaScript?</List.Item>
                                                    <List.Item>Where does JavaScript code run?</List.Item>
                                                    <List.Item>Basic JavaScript syntax</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week2">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>JavaScript Variable Types</Text>
                                                <List withPadding>
                                                    <List.Item>Integers</List.Item>
                                                    <List.Item>Floats</List.Item>
                                                    <List.Item>HTML Lists</List.Item>
                                                    <List.Item>Character</List.Item>
                                                    <List.Item>Strings</List.Item>
                                                    <List.Item>Boolean</List.Item>
                                                    <List.Item>JavaScript Object</List.Item>
                                                    <List.Item>JSON</List.Item>
                                                </List>
                                                <Text weight={600}>JavaScript Operators</Text>
                                                <List withPadding>
                                                    <List.Item>Assignment operators</List.Item>
                                                    <List.Item>Arithmetic operators</List.Item>
                                                    <List.Item>Comparison operators</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week3">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>JavaScript Statements</Text>
                                                <List withPadding>
                                                    <List.Item>If - else statements</List.Item>
                                                    <List.Item>Switch case statements</List.Item>
                                                </List>
                                                <Text weight={600}>JavaScript Loops</Text>
                                                <List withPadding>
                                                    <List.Item>For loop</List.Item>
                                                    <List.Item>While loop</List.Item>
                                                    <List.Item>Do while loop</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week4">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>JavaScript Functions</Text>
                                                <List withPadding>
                                                    <List.Item>Introduction to Functions</List.Item>
                                                    <List.Item>Parameter and arguements</List.Item>
                                                    <List.Item>Return type</List.Item>
                                                </List>
                                                <Text weight={600}>ES6</Text>
                                                <List withPadding>
                                                    <List.Item>Const and Let</List.Item>
                                                    <List.Item>Template Literals</List.Item>
                                                    <List.Item>Arrow Functions</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week5">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>JavaScript Events</Text>
                                                <List withPadding>
                                                    <List.Item>Onclick Event</List.Item>
                                                    <List.Item>OnSubmit Event</List.Item>
                                                    <List.Item>OnHover Event</List.Item>
                                                </List>
                                                <Text weight={600}>JavaScript DOM manipulation</Text>
                                                <List withPadding>
                                                    <List.Item>Introduction to DOM</List.Item>
                                                    <List.Item>DOM Elements</List.Item>
                                                    <List.Item>DOM Methods</List.Item>
                                                </List>
                                                <Text weight={600}>Projects</Text>
                                                <List withPadding>
                                                    <List.Item>Student should make a dynamic website</List.Item>
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
                                        <Badge color="dark" size="lg">20,000 KES</Badge>
                                    </Group>
                                    <Text mt={20}>Explore Learn Innovate</Text>
                                    <Text mt={20}>Don't be left out, Enrol today</Text>
                                    <Center>
                                        {
                                            enrolled ?
                                                <Button className={classes.enrolButton} size="md" component='a' href='/students'>
                                                    Continue Learning
                                                </Button> :

                                                <Button className={classes.enrolButton} size="md" onClick={onClick} loading={loading}>
                                                    Enrol
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

export default Advanced;
