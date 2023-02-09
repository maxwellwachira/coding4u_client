import { Button, Card, Center, Container, createStyles, Divider, Grid, Modal, Stack, Text, TextInput } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useForm } from "@mantine/form";

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import { IconCheck, IconTrophy } from '@tabler/icons';
import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import certificateMaker from '../../services/certificates/certificateMaker';
import { urls } from '../../constants/urls';
import js from '../../assets/js.png';


interface EnrolmentData {
    totalEnrolments: number;
    totalPages: number;
    currentPage: number;
    enrolments: {
        id: string;
        CourseId: string;
        progress: string;
        updatedAt: string;
    }[]
};

const useStyles = createStyles((theme) => ({
    cardShadow: {
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },

    moreButton: {
        width: 200,
        backgroundColor: `${colors.primaryColor}`,
        border: `2px solid ${colors.primaryColor}`,
        borderRadius: "10px",
        padding: "10px 10px",
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
}));

const Certificates: NextPage = () => {
    const [enrolmentData, setEnrolmentData] = useState<EnrolmentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);
    const [finishDate, setFinishDate] = useState('');
    const [courseId, setCourseId] = useState<number | null>(null);
    const { auth, userMe } = useAuthContext();

    const router = useRouter();

    let token = getCookie('accessToken');

    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            fullName: ''
        },
        validate: {
            fullName: (value) => (!value ? 'Name cannot be empty' : null)
        }
    });


    const getEnrolments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/me`, { headers: { Authorization: `Bear ${token}` } });
            setEnrolmentData(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const completedCourses = () => {
        return enrolmentData?.enrolments.filter((el) => Number(el.progress) === 100);
    }

    const onClick = (courseId: number, date: string) => {
        setCourseId(courseId);
        setFinishDate(date);
        setOpened(true);
    }

    const capitalizeFirsLetter = (sentence: string) => {
        const words = sentence.split(" ");
        return words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(" ");
    }

    const certCards = () => {
        const completedCourses = enrolmentData?.enrolments.filter((el) => Number(el.progress) === 100);
        return completedCourses?.map((el) => (
            <Grid.Col md={12}>
                <Card className={classes.cardShadow} radius={30}>
                    <Grid>
                        <Grid.Col md={6}>
                            <Card.Section>
                                <Center>
                                    <Image
                                        src={Number(el.CourseId) === 1 ? "/scratch.svg" : Number(el.CourseId) === 2 ? "/intermediate.svg" : js}
                                        height={300}
                                        width={300}
                                        alt="Course Thumbnail"
                                    />
                                </Center>
                            </Card.Section>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Stack align="center" justify="center" style={{height: "100%"}}>
                                <Text align="center" fz={25} weight={600}> Congratulations!</Text>
                                <Text align="center">Click the button below to download your {Number(el.CourseId) === 1 ? "Beginner" : "Intermediate"} certificate</Text>
                                <Center>
                                    <Button
                                        className={classes.moreButton}
                                        size="md"
                                        onClick={() => onClick(Number(el.CourseId), el.updatedAt)}
                                    >
                                        Download Certificate
                                    </Button>
                                </Center>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Grid.Col>
        ))
    }

    const handleSubmit = async () => {
        if (JSON.stringify(form.errors) === "{}") {
            setLoading(true);
            const certData = {
                fullName: capitalizeFirsLetter(form.values.fullName),
                CourseId: courseId,
                UserId: userMe.id
            }
            try {
                const { data } = await axios.post(`${urls.baseUrl}/cert`, certData);
                if (data.message === 'success') {
                    setLoading(false);
                    certificateMaker(data.record.id, courseId, certData.fullName, finishDate);
                }
            } catch (error: any) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {

        if (!auth) router.push('/auth/logout');
        //certificateMaker();
        getEnrolments();
        if (userMe) {
            form.setFieldValue('fullName', `${userMe.firstName} ${userMe.lastName}`);
        }
    }, [userMe])

    if (!auth) return <></>;

    if (completedCourses()?.length === 0) {
        return (
            <>
                <Head>
                    <title>Coding4U Student Certificates</title>
                    <meta name="description" content="Coding4U Student Certificates" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <StudentLayout>
                    <Container>
                        <Card withBorder px={30} radius="md" mt="xl">
                            <Stack align="center">
                                <IconTrophy color={`${colors.primaryColor}`} size={45} />
                                <Text mt="lg">You have no Certificate</Text>
                                <Text >Complete a course to get one</Text>
                            </Stack>
                        </Card>
                    </Container>
                </StudentLayout>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Coding4U Student Certificates</title>
                <meta name="description" content="Coding4U Student Certificates" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container mt={40}>
                    <Grid>
                        {certCards()}
                    </Grid>
                </Container>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Confirm your name to download Certificate"
                >
                    <Divider mb="lg" />
                    <Container>
                        <form onSubmit={form.onSubmit(() => handleSubmit())}>
                            <Stack>
                                <TextInput
                                    withAsterisk
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    value={form.values.fullName}
                                    onChange={(event) => form.setFieldValue('fullName', event.currentTarget.value)}
                                    mt="lg"
                                    radius={15}
                                    error={form.errors.categoryName}
                                />
                                <Button
                                    rightIcon={<IconCheck />}
                                    color="red"
                                    my="lg"
                                    type='submit'
                                    loading={loading}
                                    loaderPosition="left"
                                    radius={15}
                                >
                                    Download Certificate
                                </Button>
                            </Stack>
                        </form>
                    </Container>

                </Modal>
            </StudentLayout>
        </>
    )
}

export default Certificates;