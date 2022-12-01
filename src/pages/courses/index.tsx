import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Box, Button, Card, Center, Container, createStyles, Grid, Stack, Text, Textarea, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import advanced from '../../assets/js.png';

const useStyles = createStyles((theme) => ({
    cardShadow: {
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        maxWidth: 315
    },

    moreButton: {
        width: 200,
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
}));

const Courses: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
        <Head>
            <title>Coding4U | Courses</title>
            <meta name="description" content="Coding4U Courses" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container>
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Our Courses</Text>
                <Grid mt={30} gutter={30}>
                    <Grid.Col md={4}>
                        <Stack align="center">
                            <Card className={classes.cardShadow} radius={40}>
                                <Card.Section>
                                    <Center>
                                        <Image 
                                            src="/scratch.svg"
                                            height={300}
                                            width={300}
                                            alt="scratch"
                                        />
                                    </Center>
                                </Card.Section>
                                <Text align="center" size={24} weight={600} color={`${colors.primaryColor}`}>Beginner Package</Text>
                                <Text mt={20}>
                                    Students in this course will learn <Text component='span' weight={600}>Scratch Programming</Text>
                                </Text>
                                <Text my="sm">Scratch is a visual, block-based programming language developed by MIT. Scratch encourages creative thinking, fosters problem solving, helps develop logical thinking skills and on top of it all, it is fun and interactive to learn</Text>
                                <Text>No prior programming knowledge is required to join this course</Text>

                                <Center>
                                    <Button 
                                        className={classes.moreButton} 
                                        size="md" 
                                        component='a'
                                        href='/courses/beginner'
                                    >
                                        See More
                                    </Button>
                                </Center>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Stack align="center">
                            <Card className={classes.cardShadow} radius={40}>
                                <Card.Section>
                                    <Center>
                                        <Image 
                                            src="/intermediate.svg"
                                            height={300}
                                            width={300}
                                            alt="Intermediate"
                                        />
                                    </Center>
                                </Card.Section>
                                <Text align="center" size={24} weight={600} color={`${colors.primaryColor}`}>Intermediate Package</Text>
                                <Text mt={20}>
                                    Students in this course will learn <Text component='span' weight={600}>Static Web Development with HTML and CSS</Text> 
                                </Text>
                                <Text my="sm">
                                    Web development is the process of designing, building and maintaining a website. At the end of this course, Students should be able to build static websites. Our curriculum follows international standards.
                                </Text>
                                <Text>
                                    No prior programming knowledge is required to join this course
                                </Text>
                                <Center>
                                    <Button 
                                        className={classes.moreButton} 
                                        size="md" 
                                        component='a'
                                        href='/courses/intermediate'
                                    >
                                        See More
                                    </Button>
                                </Center>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Stack align="center">
                            <Card className={classes.cardShadow} radius={40}>
                                <Card.Section>
                                    <Center>
                                        <Image 
                                            src={advanced}
                                            height={300}
                                            width={300}
                                            alt="advanced"
                                        />
                                    </Center>
                                </Card.Section>
                                <Text align="center" size={24} weight={600} color={`${colors.primaryColor}`}>Advanced Package</Text>
                                <Text mt={20}>
                                    Students in this course will learn <Text component='span' weight={600}>Dynamic Web Development with Pure JavaScript</Text>
                                    <Text my="sm">JavaScript(JS) is the widely used Programming Language in Web development. Learning JavaScript will open doors to many opportunities</Text>
                                    <Text>Unlike in the previous courses, students in this course should have a solid understanding of HTML and CSS.</Text>
                                </Text>

                                <Center>
                                    <Button 
                                        className={classes.moreButton} 
                                        size="md" 
                                        component='a'
                                        href='/courses/advanced'
                                    >
                                        See More
                                    </Button>
                                </Center>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    
                </Grid>
            </Container>
            <Box className={classes.subscribeGradient} my={70}>
                <Container>
                    <Grid>
                    <Grid.Col md={7} mt={30}>
                        <Text size={32} weight={550} color="white">Don't be left out, <br />Subscribe to our News Letter</Text>
                        <form className={classes.subscribeWidth}>
                            <TextInput 
                                mt="xl"
                                placeholder={`     Enter Your Email`}
                                rightSection={<Button radius={"lg"} size="md" style={{background: `${colors.primaryColor}`}}>Subscribe</Button>}
                                radius="lg"
                                size="md"
                            />
                        </form>
                    </Grid.Col>
                    <Grid.Col md={5}>
                        <Center>
                        <Image 
                            src='/subscribe.svg'
                            height={300}
                            width={300}
                            alt="subscibe"
                        />
                        </Center>
                    </Grid.Col>
                    </Grid>
                </Container>
            </Box>
            <FooterLinks data={footerData}/>
        </MainLayout>
        </>
    );
}

export default Courses;