import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/fonts/icons/css/animation.css" />
                    <link rel="stylesheet" href="/fonts/icons/css/fontello.css" />
                    <link rel="stylesheet" href="/fonts/icons/css/fontello-codes.css" />
                    <link rel="stylesheet" href="/fonts/icons/css/fontello-embedded.css" />
                    <link rel="stylesheet" href="/fonts/icons/css/fontello-ie7.css" />
                    <link rel="stylesheet" href="/fonts/icons/css/fontello-ie7-codes.css" />
                    <link rel="stylesheet" href="/css/stylesheet.css" />
                    <link rel="stylesheet" href="/css/main.css" />
                    <link rel="stylesheet" href="/css/home.css" />
                    <link rel="stylesheet" href="/css/about.css" />
                    <link rel="stylesheet" href="/css/gallery.css" />
                    <link rel="stylesheet" href="/css/services.css" />
                    <link rel="stylesheet" href="/css/events.css" />
                    <link rel="stylesheet" href="/css/news.css" />
                    <link rel="stylesheet" href="/css/contacts.css" />
                    <link rel="stylesheet" href="/css/event-page.css" />
                    <link rel="stylesheet" href="/css/profile.css" />
                    <link rel="stylesheet" href="/css/cookies.css" />
                    <link rel="stylesheet" href="/css/datepicker.css" />
                    <link rel="stylesheet" href="/css/react-big-calendar.css" />
                    <link rel="stylesheet" href="/css/react-images-upload.css" />
                    <link rel="stylesheet" href="/css/admin.css"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}