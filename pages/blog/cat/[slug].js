import Head from "next/head";
import { styled } from "goober";
import Header from "@components/header";
import {
    getCategoryBySlug,
    getAllPostsByCategory,
    getAllCategories
} from "@lib/api";
import Link from "next/link";
import { formatDate } from "@utils/functions";
import { useRouter } from "next/router";

export default function Blog({ posts, categories }) {
    const NavLink = ({ href, name }) => {
        const { asPath } = useRouter();
        const ariaCurrent = href === asPath ? "page" : undefined;

        return (
            <Link href={href} passHref>
                <a aria-current={ariaCurrent}>{name}</a>
            </Link>
        );
    };
    return (
        <>
            <Head>
                <title>Blog - Kasper Aamodt</title>
                <meta content="Read my latest blog posts" name="description" />
            </Head>

            <Header />

            <Main>
                <Categories>
                    <NavLink href="/blog" name="All" />
                    {categories?.map(({ node }) => {
                        return (
                            <NavLink
                                href={`/blog/cat/` + node.slug}
                                key={node.categoryId}
                                name={node.name}
                            />
                        );
                    })}
                </Categories>
                {posts?.map(({ node }) => {
                    return (
                        <div className="post-card" key={node.slug}>
                            <h2> {node.title}</h2>
                            <span>{formatDate(node.date)}</span>
                            <Link href={`/blog/` + node.slug} passHref>
                                <a aria-label={node.title}></a>
                            </Link>
                        </div>
                    );
                })}
            </Main>
        </>
    );
}

export async function getStaticProps({ params = {} } = {}) {
    const cat = await getCategoryBySlug(params?.slug);
    const posts = await getAllPostsByCategory(cat?.categoryId);
    const categories = await getAllCategories();

    return {
        props: {
            posts,
            categories
        }
    };
}

export async function getStaticPaths() {
    const AllCategories = await getAllCategories();

    return {
        paths: AllCategories?.map(({ node }) => `/blog/cat/${node.slug}`) || [],
        fallback: true
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;

    .post-card {
        position: relative;
        padding: 12px 24px;
        margin: 12px -24px;
        border-radius: 10px;
        transition: .5s ease;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        &:last-of-type {
            border-bottom: none;
        }

        h2 {
            font-size: 1rem;
        }

        a {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            opacity: 0;
            height: 100%;
            width: 100%;
            text-decoration: none;
        }

        &:hover {
            background: var(--card);
            border-radius: 10px;
        }
    }
`;

const Categories = styled("div")`
    display: flex;
    gap: 0.5rem;

    a {
        text-decoration: none;
        border: 2px solid;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;

        &[aria-current="page"] {
            background-color: var(--foreground);
            color: var(--background);
            border: 1px solid var(--foreground);
        }
    }
`;
