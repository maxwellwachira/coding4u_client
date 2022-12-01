import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Container, createStyles, Grid, Notification, Paper, Stack, Text, Textarea, TextInput, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { colors } from '../constants/colors';
import FooterLinks from '../components/footer/footer';
import { footerData } from '../constants/footer';
import { urls } from '../constants/urls';
import { IconCheck, IconX } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    contactGradient: {
        background: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)',
        borderRadius: '40px 0px 0px 40px',
        position: 'relative',
        height: '100%',
        [theme.fn.smallerThan("md")]: {
            borderRadius: '40px 40px 0px 0px',
        },
    },

    subscribeGradient: {
        maxWidth: 1080,
        background: 'linear-gradient(135deg, #FEB692 0%, #E43B3C 100%)',
        borderRadius: 40,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    subscribeWidth: {
        maxWidth: 400,
        width: "85%"
    },

    submitButton: {
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
}));

const Contact: NextPage = () => {
    const { classes } = useStyles();
    const { width } = useViewportSize();
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    const form = useForm({
        initialValues,
        validate: {
            email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async () => {
        setLoading(true);
        if (JSON.stringify(form.errors) === "{}") {
            try {
                const { data } = await axios.post(`${urls.baseUrl}/email/send-contact`, form.values);
                if (data.message === 'success') {
                    setResponse(data.message);
                    setLoading(false);
                    form.setValues(initialValues);
                }
            } catch (error: any) {
                console.log(error);
                setResponse('error')
            }
        }
    }

    return (
        <>
            <Head>
                <title>Coding4U | Contact Us</title>
                <meta name="description" content="Coding4U Contact Us Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <Container mb={50}>
                    <Text align="center" size={32} weight={600} color={`${colors.primaryColor}`}>Get In Touch</Text>
                    <Paper withBorder radius={40} mt={30}>
                        <Grid>
                            <Grid.Col md={6}>
                                <Stack align="center" justify="center" className={classes.contactGradient}>
                                    <Image
                                        src="/contact.svg"
                                        height={300}
                                        width={300}
                                        alt="contact"
                                    />
                                </Stack>
                            </Grid.Col>
                            <Grid.Col md={6} p={40}>
                                {response === 'success' ? (
                                    <Notification icon={<IconCheck size={18} />} color="teal" title="Success" onClose={() => setResponse('')} mb="xl">
                                        We have received your Message, we will get back to you shortly
                                    </Notification>
                                ) : response ? (
                                    <Notification icon={<IconX size={18} />} color="red" title="Error" onClose={() => setResponse('')} mb="xl">
                                        There was an error in sending the message, Try again later
                                    </Notification>
                                ) : ''}
                                <form onSubmit={form.onSubmit(() => { handleSubmit() })}>
                                    <Stack>
                                        <TextInput
                                            label='Full Name'
                                            placeholder={`     Enter Full Name`}
                                            radius={15}
                                            withAsterisk
                                            value={form.values.name}
                                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                        />
                                        <TextInput
                                            label='Email'
                                            placeholder={`     Enter your email`}
                                            radius={15}
                                            withAsterisk
                                            value={form.values.email}
                                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                            error={form.errors.email && 'Invalid email'}
                                        />
                                        <TextInput
                                            label='Subject'
                                            placeholder={`     Enter Subject`}
                                            radius={15}
                                            withAsterisk
                                            value={form.values.subject}
                                            onChange={(event) => form.setFieldValue('subject', event.currentTarget.value)}
                                        />
                                        <Textarea
                                            label='Message'
                                            placeholder={`     Enter Message`}
                                            radius={15}
                                            withAsterisk
                                            value={form.values.message}
                                            onChange={(event) => form.setFieldValue('message', event.currentTarget.value)}
                                        />
                                        <Button className={classes.submitButton} size="md" loading={loading} type="submit">
                                            Send
                                        </Button>
                                    </Stack>
                                </form>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Container>
                <FooterLinks data={footerData} />
            </MainLayout>
        </>
    );
}

export default Contact;