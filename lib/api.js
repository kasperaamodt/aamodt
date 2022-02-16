const API_URL = "https://aamodt-xyz.graphcdn.app";

async function fetchAPI(query, { variables } = {}) {
    const headers = { "Content-Type": "application/json" };

    const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    });

    const json = await res.json();
    return json.data;
}

export async function getAllPostSlugs() {
    const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
    return data?.posts;
}

export async function getPostsForHome() {
    const data = await fetchAPI(`
    {
        posts(first: 3) {
            edges {
                node {
                    title
                    slug
                    date
                }
            }
        }
    }
    `);
    return data?.posts;
}

export async function getAllPosts() {
    const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    title
                    excerpt
                    slug
                    date
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                }
            }
        }
    }
    `);
    return data?.posts;
}

export async function getPostAndMorePosts(slug) {
    const data = await fetchAPI(
        `
    fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
            }
        }
        seo {
            twitterImage {
                mediaItemUrl
            }
        }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            ...PostFields
            content
        }
        posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
                node {
                    ...PostFields
                }
            }
        }
    }
    `,
        {
            variables: {
                id: slug,
                idType: "SLUG"
            }
        }
    );
    data.posts.edges = data.posts.edges.filter(
        ({ node }) => node.slug !== slug
    );
    if (data.posts.edges.length > 3) data.posts.edges.pop();

    return data;
}
