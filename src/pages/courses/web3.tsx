import { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {  Accordion, Badge, Button, Card, Center, Container, createStyles, Grid, Group, List, Stack, Tabs, Text, } from '@mantine/core';
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
import blockchainImage from '../../assets/blockchain.jpg';

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
    const { auth, userMe } = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const [response, setResponse] = useState('');
    const [enrolled, setEnrolled] = useState(false);
    const router = useRouter();

    const enroll = async(UserId: string, CourseId: string) => {
        try {
            const { status } = await axios.post(`${urls.baseUrl}/enrolment`, {UserId, CourseId});
            if (status === 201){
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

    const isEnrolled = async() => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/course/5/user/${userMe.id}`);
            if ( data.exists ) {
                setEnrolled(true);
            }else {
                setEnrolled(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClick = async() => {
        if(!auth) router.push('/auth/login').then(() => router.reload());
        //Check if role is admin or tutor or course pricing is free
        setLoading(true);
        if (userMe.role === "admin" || userMe.role === "tutor"){
            const enrolment = await enroll(userMe.id, '2');
            if (enrolment?.message === "success"){
                router.push("/students/courses");
            }
        }else {
            try {
                const pesapalData = {
                    amount : 600,
                    email: userMe.email,
                    firstName: userMe.firstName,
                    lastName: userMe.lastName                   
                };
                const { data } = await axios.post(`${urls.baseUrl}/pesapal/iframe`, pesapalData);
                if(Number(data.status) === 200){
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
            <title>Coding4U | Web3 Course with Solidity Programming and NFT Development | Learn Ethereum Development</title>
            <meta name="description" content="This Web3 course covers blockchain concepts, Solidity programming, and NFT development, providing students with a comprehensive understanding of Ethereum's ecosystem. The course covers smart contract creation, DeFi development, and advanced Solidity concepts, including blockchain security best practices. Students will also learn how to create, deploy, and interact with NFTs using Web3.js. Suitable for beginners and those with some programming experience, this course equips students with the skills necessary to contribute to the Ethereum ecosystem." />
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
                <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Web3  & Blockchain Course</Text>
                <Grid mb="xl">
                    <Grid.Col md={8}>
                        <Center>
                            <Image 
                                src={blockchainImage}
                                height={width >= 768 ? 360 : 220}
                                width={width >= 768 ? 620 : 320}
                                alt="Web3 Course"
                            />
                        </Center>
                        <Tabs color="dark" defaultValue="courseInfo" mt="xl" mb="xl">
                            <Tabs.List>
                                <Tabs.Tab value="courseInfo" icon={<IconBook size={14} />}>Course Info</Tabs.Tab>
                                <Tabs.Tab value="curriculum" icon={<IconClipboard size={14} />}>Curriculum</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="courseInfo" pt="xs" mt="xl">
                                <Text size={28} weight={600} color={`${colors.primaryColor}`}>About Course</Text>
                                <Text mt={20}>This Web3 course is designed to provide students with a comprehensive understanding of the Ethereum ecosystem, including the development of decentralized applications, smart contracts, and NFTs. The course will cover the basics of Solidity programming language, advanced Solidity concepts, security best practices, and the creation of decentralized applications and DeFi protocols. In addition, students will gain an understanding of the ERC-721 and ERC-1155 token standards and learn how to create, deploy and interact with NFTs using Web3.js. </Text>
                                <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                <Text mt={15}>The course is suitable for beginners and those with some programming experience who want to learn about Ethereum, Solidity programming, and NFTs. By the end of the course, students will have the knowledge and skills necessary to develop decentralized applications, create and deploy smart contracts and NFTs, and contribute to the Ethereum ecosystem.</Text>
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
                                            <Text weight={600}>Introduction to Web3</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of what Web3 is and how it differs from Web 2.0</List.Item>
                                                <List.Item>Overview of the technologies that make up Web3 (blockchain, decentralized storage, decentralized identity, smart contracts, etc.)</List.Item>
                                                <List.Item>Discussion of the benefits and potential applications of Web3</List.Item>
                                            </List>
                                            <Text weight={600}>Blockchain Basics</Text>
                                            <List withPadding>
                                                <List.Item>Overview of blockchain technology</List.Item>
                                                <List.Item>Types of blockchains (public, private, permissioned)</List.Item>
                                                <List.Item>Explanation of how transactions are processed and recorded on a blockchain</List.Item>
                                                <List.Item>Consensus algorithms (proof-of-work, proof-of-stake, etc.)</List.Item>
                                                <List.Item>Cryptography and digital signatures</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item> 

                                     <Accordion.Item value="week2">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Solidity Basics</Text>
                                            <List withPadding>
                                                <List.Item>Introduction to smart contracts and Solidity programming language</List.Item>
                                                <List.Item>Syntax and data types</List.Item>
                                                <List.Item>Variables, arrays, and structs</List.Item>
                                                <List.Item>Functions, modifiers, and events</List.Item>
                                                <List.Item>Debugging Solidity code</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>   

                                     <Accordion.Item value="week3">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Smart Contract Development</Text>
                                            <List withPadding>
                                                <List.Item>How to create and deploy smart contracts on Ethereum</List.Item>
                                                <List.Item>Truffle framework and Ganache</List.Item>
                                                <List.Item>Creating a simple smart contract</List.Item>
                                                <List.Item>Testing smart contracts</List.Item>
                                                <List.Item>Best practices for smart contract development</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>

                                     <Accordion.Item value="week4">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Advanced Solidity Concepts</Text>
                                            <List withPadding>
                                                <List.Item>Inheritance and polymorphism</List.Item>
                                                <List.Item>Libraries</List.Item>
                                                <List.Item>Abstract contracts and interfaces</List.Item>
                                                <List.Item>Error handling</List.Item>
                                                <List.Item>Gas optimization</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                     <Accordion.Item value="week5">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Solidity Security</Text>
                                            <List withPadding>
                                                <List.Item>Common security vulnerabilities in smart contracts</List.Item>
                                                <List.Item>Security best practices</List.Item>
                                                <List.Item>Techniques for minimizing the attack surface</List.Item>
                                                <List.Item>Auditing smart contracts</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                     <Accordion.Item value="week6">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 6</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Ethereum dApp Development</Text>
                                            <List withPadding>
                                                <List.Item>Overview of decentralized applications (dApps)</List.Item>
                                                <List.Item>Development of dApps on Ethereum</List.Item>
                                                <List.Item>Web3.js and interacting with smart contracts</List.Item>
                                                <List.Item>User interface development</List.Item>
                                                <List.Item>Testing and deploying a dApp</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                     <Accordion.Item value="week7">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 7</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Decentralized Storage</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of decentralized storage</List.Item>
                                                <List.Item>Comparison of centralized and decentralized storage</List.Item>
                                                <List.Item>Overview of popular decentralized storage solutions (IPFS, Swarm, etc.)</List.Item>
                                                <List.Item>How to use decentralized storage in DApps</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>  
                                     <Accordion.Item value="week8">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 8</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Decentralized Identity</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of decentralized identity</List.Item>
                                                <List.Item>Comparison of centralized and decentralized identity</List.Item>
                                                <List.Item>Overview of popular decentralized identity solutions (DID, uPort, etc.)</List.Item>
                                                <List.Item>How to use decentralized identity in DApps</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>  
                                     <Accordion.Item value="week9">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 9</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Interoperability and Standards</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of interoperability and its importance in Web3</List.Item>
                                                <List.Item>Overview of popular interoperability solutions (Polkadot, Cosmos, etc.)</List.Item>
                                                <List.Item>Discussion of Web3 standards (ERC-20, ERC-721, etc.)</List.Item>
                                                <List.Item>How interoperability and standards are used in Web3 applications</List.Item>
                                            </List>
                                            <Text weight={600}>Governance and Community</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of governance and community in Web3</List.Item>
                                                <List.Item>How decentralized autonomous organizations (DAOs) work</List.Item>
                                                <List.Item>Overview of popular DAOs and their use cases</List.Item>
                                                <List.Item>How to participate in Web3 communities and contribute to Web3 projects</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>      
                                     <Accordion.Item value="week10">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 10</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Decentralized Finance (DeFi) Development</Text>
                                            <List withPadding>
                                                <List.Item>Introduction to DeFi</List.Item>
                                                <List.Item>DeFi applications on Ethereum</List.Item>
                                                <List.Item>Creating a DeFi smart contract</List.Item>
                                                <List.Item>Interacting with DeFi protocols</List.Item>
                                                <List.Item>DeFi user interface development</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>  
                                     <Accordion.Item value="week11">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 11</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Non-Fungible Tokens (NFTs)</Text>
                                            <List withPadding>
                                                <List.Item>Explanation of NFTs and their use cases</List.Item>
                                                <List.Item>ERC-721 and ERC-1155 token standards</List.Item>
                                                <List.Item>Creating and deploying NFTs on Ethereum</List.Item>
                                                <List.Item>Interacting with NFTs using Web3.js</List.Item>
                                                <List.Item>NFT user interface development</List.Item>
                                            </List>
                                        </Accordion.Panel>
                                     </Accordion.Item>
                                     <Accordion.Item value="week12">
                                        <Accordion.Control>
                                            <Text weight={600} color={`${colors.primaryColor}`}>Week 12</Text>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text weight={600}>Future of Web3 & Ethereum</Text>
                                            <List withPadding>
                                                <List.Item>Discussion of the potential future of Web3</List.Item>
                                                <List.Item>Ethereum 2.0 and the transition to proof-of-stake</List.Item>
                                                <List.Item>Ethical considerations and the role of Web3 in society</List.Item>
                                            </List>
                                            <Text weight={600}>Student Project</Text>
                                            <List withPadding>
                                                <List.Item>Make a Dapp</List.Item>
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
                                    <Badge color="dark" size="lg">600 USD</Badge>
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
            <FooterLinks data={footerData}/>
        </MainLayout>
        </>
    );
}

export default Intermediate;
