import Document, {Html, Head, Main, NextScript} from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return(
            <Html>
            <Head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                      crossOrigin="anonymous"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
    </Html>
        )
    }
}