export const fetchPosts = async () => {
    const response = await fetch('https://www.reddit.com/r/popular.json');
    const data = await response.json();
    return data.data.children.map((post) => post.data);
}