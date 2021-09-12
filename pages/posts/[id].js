import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../libs/posts"

import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false
    }

};

export const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

const Post = ({postData}) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    )
}

export default Post;
