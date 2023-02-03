import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Card, Center, Container, createStyles, Grid, Stack, Text } from '@mantine/core';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import advanced from '../../assets/js.png';
import Subscribe from '../../components/subscribe/subscribe';

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
}));

const Courses: NextPage = () => {
    const { classes } = useStyles();

    return (
        <>
        <Head>
            <title>Coding4U | All Courses</title>
            <meta name="description" content="Discover a wide range of programming courses and learn from the best. Browse our complete list of online coding courses and start learning today." />
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
                                <Text align="center" size={24} weight={600} color={`${colors.primaryColor}`}>Advance Package 1 - JavaScript</Text>
                                <Text mt={20}>
                                    Students in this course will learn <Text component='span' weight={600}>Dynamic Web Development with Pure JavaScript</Text>
                                    <Text my="sm">JavaScript(JS) is the widely used Programming Language in Web development. Learning JavaScript will open doors to many opportunities</Text>
                                    <Text mb="sm">Prior knowledge in HTML and CSS is required.</Text>
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
                    <Grid.Col md={4}>
                        <Stack align="center">
                            <Card className={classes.cardShadow} radius={40}>
                                <Card.Section>
                                    <Center>
                                        <Image 
                                            src="/advanced2.svg"
                                            height={300}
                                            width={300}
                                            alt="Node JS"
                                        />
                                    </Center>
                                </Card.Section>
                                <Text align="center" size={24} weight={600} color={`${colors.primaryColor}`}>Advance Package 2 - Node.js</Text>
                                <Text mt={20}>
                                    Students in this course will learn <Text component='span' weight={600}>Backend Development using Node.js</Text> 
                                </Text>
                                <Text my="sm">
                                     Back-end development refers to the development of server-side logic that powers websites and apps from behind the scenes.
                                    In this course we will be using Node.js which is server-side JavaScript for backend development
                                </Text>
                                <Text>
                                    Prior knowledge in JavaScript is required
                                </Text>
                                <Center>
                                    <Button 
                                        className={classes.moreButton} 
                                        size="md" 
                                        component='a'
                                        href='/courses/advanced2'
                                    >
                                        See More
                                    </Button>
                                </Center>
                            </Card>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
            <Subscribe />
            <FooterLinks data={footerData}/>
        </MainLayout>
        </>
    );
}

export default Courses;