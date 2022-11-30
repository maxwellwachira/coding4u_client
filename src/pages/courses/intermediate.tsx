import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Accordion, Badge, Button, Card, Center, Container, createStyles, Grid, Group, List, Stack, Tabs, Text, } from '@mantine/core';
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

const Intermediate: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();

    return (
        <>
        <Head>
            <title>Coding4U | Intermediate Course</title>
            <meta name="description" content="Coding4U Intermediate Course" />
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
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Intermediate course</Text>
                <Grid mb="xl">
                    <Grid.Col md={8}>
                        <Center>
                            <Image 
                                src="/intermediate.svg"
                                height={width >= 768 ? 450 : 300}
                                width={width >= 768 ? 500 : 300}
                                alt="intermediate package"
                            />
                        </Center>
                        <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="xl">
                            <Tabs.List>
                                <Tabs.Tab value="courseInfo" icon={<IconBook size={14} />}>Course Info</Tabs.Tab>
                                <Tabs.Tab value="curriculum" icon={<IconClipboard size={14} />}>Curriculum</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="courseInfo" pt="xs" mt="xl">
                                <Text size={28} weight={600} color={`${colors.primaryColor}`}>About Course</Text>
                                <Text mt={20}>Students in this category will be introduced to Web Development. Web development is the process of designing, building and maintaining a website. At the end of this course, Students should be able to build static websites</Text>
                                <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                <Text mt={15}>Anyone who has gone through the beginner stage or anyone with prior programming knowledge.</Text>
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
                                            <Text weight={600}>Introduction to Web Development</Text>
                                            <List withPadding>
                                                <List.Item>What is web development?</List.Item>
                                                <List.Item>Front-end, back-end and full-stack web development</List.Item>
                                                <List.Item>Languages used in front-end web development</List.Item>
                                            </List>
                                            <Text weight={600}>Introduction to HTML</Text>
                                            <List withPadding>
                                                <List.Item>What is HTML?</List.Item>
                                                <List.Item>Basic structure of a HTML Document</List.Item>
                                                <List.Item>HTML versions</List.Item>
                                                <List.Item>HTML Elements</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item> 

                                     <Accordion.Item value="week2">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>HTML Elements</Text>
                                            <List withPadding>
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
                                        </Accordion.Panel>
                                     </Accordion.Item>   

                                     <Accordion.Item value="week3">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>HTML Attributes</Text>
                                            <List withPadding>
                                                <List.Item>Src attribute</List.Item>
                                                <List.Item>Href attribute</List.Item>
                                                <List.Item>Class attribute</List.Item>
                                                <List.Item>Id attribute</List.Item>
                                                <List.Item>Style attribute</List.Item>
                                                <List.Item>HTML div</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>

                                     <Accordion.Item value="week4">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Introduction to CSS</Text>
                                            <List withPadding>
                                                <List.Item>What is CSS?</List.Item>
                                                <List.Item>CSS Syntax</List.Item>
                                                <List.Item>CSS Categories i.e. inline, internal and external</List.Item>
                                            </List>
                                            <Text weight={600}>CSS selectors</Text>
                                            <List withPadding>
                                                <List.Item>Tags</List.Item>
                                                <List.Item>Id</List.Item>
                                                <List.Item>Class</List.Item>
                                            </List>
                                            <Text weight={600}>CSS Attributes</Text>
                                            <List withPadding>
                                                <List.Item>Margin</List.Item>
                                                <List.Item>Padding</List.Item>
                                                <List.Item>Background</List.Item>
                                                <List.Item>Color</List.Item>
                                                <List.Item>Border</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                    
                                     <Accordion.Item value="week5">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>CSS Flex</Text>
                                            <List withPadding>
                                                <List.Item>Introduction to Flex CSS</List.Item>
                                                <List.Item>Flex Direction</List.Item>
                                                <List.Item>Justify Content</List.Item>
                                                <List.Item>Align Items</List.Item>
                                            </List>
                                            <Text weight={600}>Projects</Text>
                                            <List withPadding>
                                                <List.Item>Put HTML and CSS knowledge in use</List.Item>
                                                <List.Item>Restaurant website</List.Item>
                                            </List>
                                            <Text weight={600}>Student Project</Text>
                                            <List withPadding>
                                                <List.Item>Create your portfolio website</List.Item>
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
                                    <Badge color="dark" size="lg">15,000 KES</Badge>
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

export default Intermediate;