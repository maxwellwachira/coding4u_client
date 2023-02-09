import axios from 'axios';
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
import { urls } from '../../constants/urls';


interface CertData {
    id: string;
    fullName: string;
    createdAt: string;
}

const IntermediateCert: NextPage = () => {
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
                                <Text fz={32} weight={600} my="xl">Maxwell Mwangi</Text>
                                <Text fz={18}>has completed the following course:</Text>
                                <Text my="md" weight={600}>Coding4U Intermediate Course</Text>
                                <Text fz={18} align='center'>The course covered the fundamental elements of web development, specifically <b>HTML and CSS.</b></Text>
                                <Text fz={18} align='center'>The course provided a comprehensive overview of the basic building blocks of web development, specifically HTML and CSS. Participants learned how to use these technologies to create and structure web pages, as well as how to apply styles and designs to their pages. The course covered a range of topics, from the basics of HTML and CSS syntax to more advanced topics such as responsive design and CSS frameworks. With a focus on hands-on learning and practical applications, the course provided participants with the knowledge and skills they need to start building their own websites from scratch. By the end of the course, participants had a solid understanding of HTML and CSS and were able to use these technologies to create functional and attractive web pages.</Text>
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
                                    <List.Item>Understanding of HTML syntax and structure, including how to create headings, paragraphs, lists, links, images, and tables.</List.Item>
                                    <List.Item>Knowledge of CSS syntax, including how to apply styles to HTML elements, use selectors, and create classes and IDs.</List.Item>
                                    <List.Item>Familiarity with responsive design and the ability to create websites that adjust to different screen sizes and devices.</List.Item>
                                    <List.Item>Understanding of CSS frameworks, such as Bootstrap, and how to use them to create well-designed and functional websites</List.Item>
                                    <List.Item>Ability to create and structure web pages using HTML and CSS.</List.Item>
                                    <List.Item>Exposure to best practices and industry standards for web development.</List.Item>
                                    <List.Item>Improved problem-solving skills and creativity as participants learn to translate their ideas into working web pages.</List.Item>
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
                                    <List.Item>Introduction to Web Development
                                        <List withPadding listStyleType="disc">
                                            <List.Item>What is web development?</List.Item>
                                            <List.Item>Front-end, back-end and full-stack web development</List.Item>
                                            <List.Item>Languages used in front-end web development</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Introduction to HTML
                                        <List withPadding listStyleType="disc">
                                            <List.Item>What is HTML?</List.Item>
                                            <List.Item>Basic structure of a HTML Document</List.Item>
                                            <List.Item>HTML versions</List.Item>
                                            <List.Item>HTML Elements</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>HTML Elements
                                        <List withPadding listStyleType="disc">
                                            <List.Item>HTML Paragraphs</List.Item>
                                            <List.Item>HTML Headings</List.Item>
                                            <List.Item>HTML Lists</List.Item>
                                            <List.Item>HTML Buttons</List.Item>
                                            <List.Item>HTML Tables</List.Item>
                                            <List.Item>HTML images</List.Item>
                                            <List.Item>HTML Videos</List.Item>
                                            <List.Item>HTML Anchor tags</List.Item>
                                            <List.Item>HTML Forms</List.Item>
                                            <List.Item>HTML Iframes</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>HTML Attributes
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Src attribute</List.Item>
                                            <List.Item>Href attribute</List.Item>
                                            <List.Item>Class attribute</List.Item>
                                            <List.Item>Id attribute</List.Item>
                                            <List.Item>Style attribute</List.Item>
                                            <List.Item>HTML div</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Introduction to CSS
                                        <List withPadding listStyleType="disc">
                                            <List.Item>What is CSS?</List.Item>
                                            <List.Item>CSS Syntax</List.Item>
                                            <List.Item>CSS Categories i.e. inline, internal and external</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>CSS selectors
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Tags</List.Item>
                                            <List.Item>Id</List.Item>
                                            <List.Item>Class</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>CSS Attributes
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Margin</List.Item>
                                            <List.Item>Padding</List.Item>
                                            <List.Item>Background</List.Item>
                                            <List.Item>Color</List.Item>
                                            <List.Item>Border</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>CSS Flex
                                        <List withPadding listStyleType="disc">
                                            <List.Item>Introduction to Flex CSS</List.Item>
                                            <List.Item>Flex Direction</List.Item>
                                            <List.Item>Justify Content</List.Item>
                                            <List.Item>Align Items</List.Item>
                                        </List>
                                    </List.Item>
                                    <List.Item>Student Final Project</List.Item>
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

export default IntermediateCert;