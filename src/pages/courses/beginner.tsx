import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Accordion, Badge, Button, Card, Center, Container, createStyles, Grid, Group, List, Paper, Stack, Tabs, Text, Textarea, TextInput, } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import { colors } from '../../constants/colors';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { IconArrowLeft, IconBook, IconClipboard, IconPlus } from '@tabler/icons';

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
    enrolCardPosition: {
        // position: 'fixed',

        [theme.fn.smallerThan("md")]: {
            position: 'relative',
        },
    }

}));

const Beginner: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
        <Head>
            <title>Coding4U | Beginner Courses</title>
            <meta name="description" content="Coding4U Beginner Courses" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container>
                <Button
                    component='a'
                    href='/courses'
                    size='md'
                    mb="lg"
                    color="dark"
                    variant='outline'
                    leftIcon={<IconArrowLeft />}
                    radius="xl"
                >
                    Go Back
                </Button>
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Beginner course</Text>
                <Grid mb="xl">
                    <Grid.Col md={8}>
                        <Center>
                            <Image 
                                src="/scratch.svg"
                                height={width >= 768 ? 400 : 300}
                                width={width >= 768 ? 500 : 300}
                                alt="Starter package"
                            />
                        </Center>
                        <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="xl">
                            <Tabs.List>
                                <Tabs.Tab value="courseInfo" icon={<IconBook size={14} />}>Course Info</Tabs.Tab>
                                <Tabs.Tab value="curriculum" icon={<IconClipboard size={14} />}>Curriculum</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="courseInfo" pt="xs" mt="xl">
                                <Text size={28} weight={600} color={`${colors.primaryColor}`}>About Course</Text>
                                <Text mt={20}>Students in this category will be introduced to scratch programming language. Scratch is a beginner friendly programming language that will teach basic programming concepts to the students</Text>
                                <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                <Text mt={15}>From class 5 / grade 5 students who have not done programming before.</Text>
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
                                            <Text weight={600}>Introduction to Coding</Text>
                                            <List withPadding>
                                                <List.Item>What is Coding?</List.Item>
                                                <List.Item>Which are the different Programming languages</List.Item>
                                            </List>
                                            <Text weight={600}>Introduction to Scratch Programming</Text>
                                            <List withPadding>
                                                <List.Item>Scratch software installation</List.Item>
                                                <List.Item>Familiarizing with Scratch software</List.Item>
                                                <List.Item>Sprites and Backdrops</List.Item>
                                                <List.Item>Code, Costumes and Sounds</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item> 

                                     <Accordion.Item value="week2">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Scratch Projects</Text>
                                            <List withPadding>
                                                <List.Item>Jumping Game</List.Item>
                                                <List.Item>Animate your name</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>   

                                     <Accordion.Item value="week3">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Scratch Projects</Text>
                                            <List withPadding>
                                                <List.Item>Imagine a world</List.Item>
                                                <List.Item>Animate a Character</List.Item>
                                                <List.Item>Make Music</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>

                                     <Accordion.Item value="week4">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Scratch Projects</Text>
                                            <List withPadding>
                                                <List.Item>Create a story</List.Item>
                                                <List.Item>Make a chase game</List.Item>
                                                <List.Item>Make it fly</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                    
                                     <Accordion.Item value="week5">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Scratch Projects</Text>
                                            <List withPadding>
                                                <List.Item>Pong game</List.Item>
                                                <List.Item>Video sensing</List.Item>
                                                <List.Item>Snake game</List.Item>
                                                <List.Item>Student’s Final projects</List.Item>
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
                                    <Badge color="dark" size="lg">10,000 KES</Badge>
                                </Group>
                                <Text mt={20}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis eros nisl, Explore Learn Innovate</Text>
                                <Center>
                                    <Button className={classes.enrolButton} size="md" >
                                       Enrol
                                    </Button>
                                </Center>
                            </Card>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
            <FooterLinks data={footerData}/>
        </MainLayout>
        </>
    );
}

export default Beginner;
