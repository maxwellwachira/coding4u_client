import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Center, Container, Grid, List, Notification, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import badge from '../../assets/badge.jpg';
import { colors } from '../../constants/colors';
import { IconCircleCheck, IconCircleDashed, IconX } from '@tabler/icons';
import joinus from '../../assets/joinus.jpg';
import axios from 'axios';
import { urls } from '../../constants/urls';


interface CertData {
    id: string;
    fullName: string;
    createdAt: string;
}

const BeginnerCert: NextPage = () => {
    const [certData, setCertData] = useState<CertData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { certid } = router.query;

    const getCertDetails = async () => {
        setLoading(true);
        try {
            const { data, status } = await axios.get(`${urls.baseUrl}/cert/${certid}`);
            if (status === 404) {
                setCertData(null);
            } else {
                setCertData(data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCertDetails();
    }, [])

    if(loading) return <></>

    return (
        <>
            <Head>
                <title>Coding4U Student Certificates Verification</title>
                <meta name="description" content="Coding4U Student Certificates Verification" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                !certid ? (
                    <Container p="xl" mt="100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth:600}}>
                        <Notification icon={<IconX size={18} />} color="red" closeButtonProps={{ display: 'none' }}>
                            Certificate ID should be provided in the request URL
                        </Notification>
                        <Paper withBorder radius={20} style={{ width: '100%' }} p="xl" my="xl">
                            <Grid>
                                <Grid.Col md={6}>
                                    <Text fz={24} weight={600} color={colors.primaryColor}>Get Certified Today!</Text>
                                    <Text>Join us to start your successful career in tech. With <b><i>expert guidance, hands-on experience and access to the latest technologies</i></b>, you'll have everything you need to succeed in the industry. Build your foundation, take the first step towards your dream career and become a part of the growing tech community with us.</Text>
                                </Grid.Col>
                                <Grid.Col md={6}>
                                    <Center>
                                        <Image
                                            src={joinus}
                                            alt="Join Us image"
                                            height={310}
                                            width={250}
                                            style={{ borderRadius: 15 }}
                                        />
                                    </Center>
                                </Grid.Col>
                            </Grid>
                            <Center mt="xl">
                                <Button
                                    component='a'
                                    href='/'
                                    size="md"
                                    style={{
                                        backgroundColor: `${colors.primaryColor}`,
                                        border: `2px solid ${colors.primaryColor}`,
                                        borderRadius: "10px",
                                        display: "inline-block",
                                        padding: "5px 12px",
                                        textAlign: "center",
                                        color: "white",
                                        fontWeight: 600,
                                        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
                                    }}
                                >
                                    Get started
                                </Button>
                            </Center>
                        </Paper>
                    </Container>
                ) : certData ? (
                    <Container my="xl">
                        <Stack align="center" justify="center">
                            <Stack align="center" justify="center" style={{ maxWidth: 600 }}>
                                <Image
                                    src={badge}
                                    alt="badge"
                                    height={300}
                                    width={250}
                                />
                                <Text color={colors.primaryColor} fz={20}>Certificate of Completion</Text>
                                <Text fz={32} weight={600} my="xl">{certData.fullName}</Text>
                                <Text fz={18}>has completed the following course:</Text>
                                <Text my="md" weight={600}>Coding4U Beginners Course</Text>
                                <Text fz={18} align='center'>This course introduced foundational Programming Concepts using <b>Scratch Programming</b></Text>
                                <Text fz={18} align='center'>The course covers the fundamental concepts of programming, including loops, variables, conditionals, and events, and teaches how to use these concepts to create animations, games, and interactive stories. Participants learn how to snap together blocks of code to create their own programs and how to debug and troubleshoot their code.</Text>
                                <Text fz={32} weight={600} mt="xl" mb="md">Learning Outcomes</Text>
                                <List
                                    spacing="lg"
                                    size="lg"
                                    center
                                    icon={
                                        <ThemeIcon color="red" size={18} radius="xl">
                                            <IconCircleCheck size={16} />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item>Understanding the basic concepts of computer programming, such as loops, variables, conditionals, and events</List.Item>
                                    <List.Item>Ability to use Scratch to create animations, games, and interactive stories.</List.Item>
                                    <List.Item>Knowledge of how to snap together blocks of code to create programs in Scratch.</List.Item>
                                    <List.Item>Familiarity with debugging and troubleshooting code.</List.Item>
                                    <List.Item>Introduction to the online Scratch community and ability to share projects with others.</List.Item>
                                    <List.Item>Improved critical thinking and problem-solving skills.</List.Item>
                                    <List.Item>Exposure to the world of computer programming and a solid foundation for further learning.</List.Item>
                                </List>
                                <Text fz={32} weight={600} mt="xl" mb="md">Syllabus</Text>
                                <List
                                    spacing="lg"
                                    size="lg"
                                    icon={
                                        <ThemeIcon color="red" size={18} radius="xl">
                                            <IconCircleDashed size={16} />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item>Introduction to Coding
                                        <List withPadding listStyleType="disc">
                                            <List.Item>What is Coding?</List.Item>
                                            <List.Item>Which are the different Programming languages</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Introduction to Scratch Programming
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Scratch software installation</List.Item>
                                            <List.Item>Familiarizing with Scratch software</List.Item>
                                            <List.Item>Sprites and Backdrops</List.Item>
                                            <List.Item>Code, Costumes and Sounds</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Scratch Projects.
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Jumping Game</List.Item>
                                            <List.Item>Animate your name</List.Item>
                                            <List.Item>Imagine a world</List.Item>
                                            <List.Item>Animate a Character</List.Item>
                                            <List.Item>Make Music</List.Item>
                                            <List.Item>Create a story</List.Item>
                                            <List.Item>Make a chase game</List.Item>
                                            <List.Item>Make it fly</List.Item>
                                            <List.Item>Pong game</List.Item>
                                            <List.Item>Video sensing</List.Item>
                                            <List.Item>Snake game</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Student Final project</List.Item>
                                </List>

                                <Paper withBorder radius={20} style={{ width: '100%' }} p="xl" my="xl">
                                    <Grid>
                                        <Grid.Col md={6}>
                                            <Text fz={24} weight={600} color={colors.primaryColor}>This could be you!</Text>
                                            <Text>Join us to start your successful career in tech. With <b><i>expert guidance, hands-on experience and access to the latest technologies</i></b>, you'll have everything you need to succeed in the industry. Build your foundation, take the first step towards your dream career and become a part of the growing tech community with us.</Text>
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                            <Center>
                                                <Image
                                                    src={joinus}
                                                    alt="Join Us image"
                                                    height={310}
                                                    width={250}
                                                    style={{ borderRadius: 15 }}
                                                />
                                            </Center>
                                        </Grid.Col>
                                    </Grid>
                                    <Center mt="xl">
                                        <Button
                                            component='a'
                                            href='/'
                                            size="md"
                                            style={{
                                                backgroundColor: `${colors.primaryColor}`,
                                                border: `2px solid ${colors.primaryColor}`,
                                                borderRadius: "10px",
                                                display: "inline-block",
                                                padding: "5px 12px",
                                                textAlign: "center",
                                                color: "white",
                                                fontWeight: 600,
                                                boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            Get started
                                        </Button>
                                    </Center>
                                </Paper>
                            </Stack>
                        </Stack>
                    </Container>
                ) : (
                    <Container  p="xl" mt="100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth:600}}>
                        <Notification icon={<IconX size={18} />} color="red" closeButtonProps={{ display: 'none' }}>
                            The Certificate Id provided is invalid
                        </Notification>
                        <Paper withBorder radius={20} style={{ width: '100%' }} p="xl" my="xl">
                            <Grid>
                                <Grid.Col md={6}>
                                    <Text fz={24} weight={600} color={colors.primaryColor}>Get Certified Today!</Text>
                                    <Text>Join us to start your successful career in tech. With <b><i>expert guidance, hands-on experience and access to the latest technologies</i></b>, you'll have everything you need to succeed in the industry. Build your foundation, take the first step towards your dream career and become a part of the growing tech community with us.</Text>
                                </Grid.Col>
                                <Grid.Col md={6}>
                                    <Center>
                                        <Image
                                            src={joinus}
                                            alt="Join Us image"
                                            height={310}
                                            width={250}
                                            style={{ borderRadius: 15 }}
                                        />
                                    </Center>
                                </Grid.Col>
                            </Grid>
                            <Center mt="xl">
                                <Button
                                    component='a'
                                    href='/'
                                    size="md"
                                    style={{
                                        backgroundColor: `${colors.primaryColor}`,
                                        border: `2px solid ${colors.primaryColor}`,
                                        borderRadius: "10px",
                                        display: "inline-block",
                                        padding: "5px 12px",
                                        textAlign: "center",
                                        color: "white",
                                        fontWeight: 600,
                                        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2)',
                                    }}
                                >
                                    Get started
                                </Button>
                            </Center>
                        </Paper>
                    </Container>
                )
            }
        </>
    )
}

export default BeginnerCert;