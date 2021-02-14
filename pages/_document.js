import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="ya-page_js_yes">
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
                    <link rel="stylesheet" href="/css/admin.css" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="https://site.yandex.net/v2.0/js/all.js" async={true} type="text/javascript" charSet="utf-8" />
            </Html>
        );
    }
}