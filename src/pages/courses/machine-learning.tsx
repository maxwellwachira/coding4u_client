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
import aiImage from '../../assets/ai.jpg';

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

const Intermediate: NextPage = () => {
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
            const { data } = await axios.get(`${urls.baseUrl}/enrolment/course/6/user/${userMe.id}`);
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
        if (!auth) router.push('/auth/login').then(() => router.reload());
        //Check if role is admin or tutor or course pricing is free
        setLoading(true);
        if (userMe.role === "admin" || userMe.role === "tutor") {
            const enrolment = await enroll(userMe.id, '2');
            if (enrolment?.message === "success") {
                router.push("/students/courses");
            }
        } else {
            try {
                const pesapalData = {
                    amount: 649,
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
                <title>Coding4U | AI and Machine Learning Course - Master the Fundamentals</title>
                <meta name="description" content="Master the fundamentals of AI and Machine Learning with our comprehensive course. Learn the latest techniques in deep learning, reinforcement learning, and ethical considerations, and apply your knowledge with hands-on projects in image classification, sentiment analysis, object detection, and more. Our expert instructors will guide you through the entire process, from data preprocessing to model evaluation, to help you build a solid foundation in this exciting field. Enroll now and take the first step towards becoming an AI and machine learning expert!" />
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
                    <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>AI & Machine Learning</Text>
                    <Grid mb="xl">
                        <Grid.Col md={8}>
                            <Center>
                                <Image
                                    src={aiImage}
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
                                    <Text mt={20}>Our AI and Machine Learning Course offers a comprehensive curriculum that covers the latest techniques and tools in this exciting field. With hands-on projects and expert guidance, you'll build a solid foundation in deep learning, reinforcement learning, and ethical considerations, and be well-equipped to tackle real-world challenges. Join us and master the fundamentals of AI and machine learning today.</Text>
                                    <Text size={24} weight={600} color={`${colors.primaryColor}`} mt={15}>Who is this course for?</Text>
                                    <Text mt={15}>This course is designed for anyone interested in gaining a comprehensive understanding of AI and machine learning. Whether you're a beginner with no prior experience or an experienced data professional looking to expand your skill set, this course will provide you with the knowledge and hands-on experience you need to succeed in this exciting field. Our curriculum is also ideal for professionals in fields such as data science, computer science, and engineering who want to apply AI and machine learning techniques to their work.</Text>
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
                                                <Text weight={600}>Introduction to Artificial Intelligence</Text>
                                                <List withPadding>
                                                    <List.Item>What is AI?</List.Item>
                                                    <List.Item>History and evolution of AI</List.Item>
                                                    <List.Item>Different AI approaches and their applications</List.Item>
                                                    <List.Item>Ethics and concerns surrounding AI</List.Item>
                                                </List>
                                                <Text weight={600}>Mathematics for Machine Learning</Text>
                                                <List withPadding>
                                                    <List.Item>Linear algebra</List.Item>
                                                    <List.Item>Calculus</List.Item>
                                                    <List.Item>Probability and statistics</List.Item>
                                                    <List.Item>Optimization</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week2">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 2</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Machine Learning | Supervised Learning</Text>
                                                <List withPadding>
                                                    <List.Item>Classification</List.Item>
                                                    <List.Item>Regression</List.Item>
                                                    <List.Item>Decision trees and random forests</List.Item>
                                                    <List.Item>Support Vector Machines (SVMs)</List.Item>
                                                    <List.Item>k-Nearest Neighbors (k-NN)</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week3">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 3</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Machine Learning | Unsupervised Learning</Text>
                                                <List withPadding>
                                                    <List.Item>Clustering (k-means, hierarchical clustering, DBSCAN, etc.)</List.Item>
                                                    <List.Item>Dimensionality reduction (Principal Component Analysis (PCA), t-SNE, etc.)</List.Item>
                                                    <List.Item>Anomaly detection</List.Item>
                                                </List>
                                                <Text weight={600}>Machine Learning | Ensemble Learning</Text>
                                                <List withPadding>
                                                    <List.Item>Bagging</List.Item>
                                                    <List.Item>Boosting (AdaBoost, Gradient Boosting, XGBoost, etc.)</List.Item>
                                                    <List.Item>Stacking</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>

                                        <Accordion.Item value="week4">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 4</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Machine Learning | Model Evaluation and Selection</Text>
                                                <List withPadding>
                                                    <List.Item>Overfitting and underfitting</List.Item>
                                                    <List.Item>Cross-validation</List.Item>
                                                    <List.Item>Model selection criteria (AIC, BIC, etc.)</List.Item>
                                                </List>
                                                <Text weight={600}>Machine Learning | Feature Engineering</Text>
                                                <List withPadding>
                                                    <List.Item>Feature selection</List.Item>
                                                    <List.Item>Feature scaling</List.Item>
                                                    <List.Item>Feature extraction (PCA, LDA, etc.)</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week5">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 5</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Deep Learning | Neural Networks</Text>
                                                <List withPadding>
                                                    <List.Item>Basic structure of artificial neurons</List.Item>
                                                    <List.Item>Activation functions</List.Item>
                                                    <List.Item>Backpropagation algorithm</List.Item>
                                                    <List.Item>Optimization methods (Gradient Descent, Adam, etc.)</List.Item>
                                                    <List.Item>Regularization (Dropout, L1/L2 regularization, etc.)</List.Item>
                                                    <List.Item>Hyperparameter tuning</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week6">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 6</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Deep Learning | Convolutional Neural Networks (CNNs)</Text>
                                                <List withPadding>
                                                    <List.Item>Convolution operation</List.Item>
                                                    <List.Item>Pooling layers</List.Item>
                                                    <List.Item>Architecture of CNNs (LeNet, AlexNet, VGG, ResNet, etc.)</List.Item>
                                                    <List.Item>Transfer learning with pre-trained models</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week7">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 7</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Recurrent Neural Networks (RNNs)</Text>
                                                <List withPadding>
                                                    <List.Item>Basic structure of RNNs</List.Item>
                                                    <List.Item>Long Short-Term Memory (LSTM) networks</List.Item>
                                                    <List.Item>Gated Recurrent Units (GRUs)</List.Item>
                                                    <List.Item>Applications of RNNs (sequence prediction, natural language processing, speech recognition, etc.)</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week8">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 8</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Generative Models</Text>
                                                <List withPadding>
                                                    <List.Item>Variational Autoencoders (VAEs)</List.Item>
                                                    <List.Item>Generative Adversarial Networks (GANs)</List.Item>
                                                    <List.Item>Conditional GANs</List.Item>
                                                    <List.Item>Applications of generative models (image synthesis, text generation, etc.)</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week9">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 9</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Natural Language Processing (NLP)</Text>
                                                <List withPadding>
                                                    <List.Item>Text processing and preprocessing</List.Item>
                                                    <List.Item>Bag of words model</List.Item>
                                                    <List.Item>Word embeddings</List.Item>
                                                    <List.Item>Sentiment analysis</List.Item>
                                                    <List.Item>Named Entity Recognition (NER)</List.Item>
                                                    <List.Item>Machine Translation</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week10">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 10</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Computer Vision</Text>
                                                <List withPadding>
                                                    <List.Item>Image processing and preprocessing</List.Item>
                                                    <List.Item>Feature detection and extraction</List.Item>
                                                    <List.Item>Object detection</List.Item>
                                                    <List.Item>Image segmentation</List.Item>
                                                    <List.Item>Image classification</List.Item>
                                                    <List.Item>Image synthesis</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week11">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 11</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>Reinforcement Learning</Text>
                                                <List withPadding>
                                                    <List.Item>Markov Decision Processes (MDP)</List.Item>
                                                    <List.Item>Q-learning</List.Item>
                                                    <List.Item>Policy gradients</List.Item>
                                                    <List.Item>Actor-Critic methods</List.Item>
                                                    <List.Item>Monte Carlo Tree Search</List.Item>
                                                </List>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="week12">
                                            <Accordion.Control>
                                                <Text weight={600} color={`${colors.primaryColor}`}>Week 12</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text weight={600}>AI Deployment</Text>
                                                <List withPadding>
                                                    <List.Item>Model serving</List.Item>
                                                    <List.Item>Docker containers</List.Item>
                                                    <List.Item>Kubernetes</List.Item>
                                                    <List.Item>Cloud-based platforms</List.Item>
                                                </List>
                                                <Text weight={600}>Ethics in AI</Text>
                                                <List withPadding>
                                                    <List.Item>Fairness and bias in AI</List.Item>
                                                    <List.Item>Explainability and interpretability</List.Item>
                                                    <List.Item>Privacy and security concerns</List.Item>
                                                    <List.Item>Legal and regulatory issues</List.Item>
                                                </List>
                                                <Text weight={600}>Student Project Options</Text>
                                                <List withPadding>
                                                    <List.Item>Train a deep neural network to classify images from a dataset (e.g. CIFAR-10 or ImageNet)</List.Item>
                                                    <List.Item>Build a natural language processing (NLP) model to classify sentiment in text (e.g. positive, negative, neutral)</List.Item>
                                                    <List.Item>Train a deep neural network to detect objects in images or video (e.g. cars, pedestrians, traffic lights)</List.Item>
                                                    <List.Item>Build a collaborative filtering or content-based recommender system to make recommendations to users (e.g. movies, music, products)</List.Item>
                                                    <List.Item>Perform data analysis on a large dataset (e.g. Kaggle competition data)</List.Item>
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
                                        <Badge color="dark" size="lg">649 USD</Badge>
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

export default Intermediate;
