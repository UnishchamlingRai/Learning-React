import { createContext, useContext, useEffect, useState } from "react";

const initiaBblogPosts = [
  {
    title: `"Mastering React's useEffect"`,
    body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
  },
];

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(function () {
    const getPosts = JSON.parse(localStorage.getItem("posts"));
    return getPosts ? getPosts : initiaBblogPosts;
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  function handelDeletePost(title) {
    setPosts((posts) => posts.filter((post) => post.title !== title));
  }

  useEffect(
    function () {
      localStorage.setItem("posts", JSON.stringify(posts));
    },
    [posts]
  );
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        onDeletePost: handelDeletePost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext is used Outside the Provider");
  return context;
}

export { PostProvider, usePosts };
