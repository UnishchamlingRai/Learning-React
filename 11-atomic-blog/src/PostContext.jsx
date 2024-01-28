/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { Archive, Footer, Header, Main } from "./App";

const initiaBblogPosts = [
  {
    title: `"Mastering React's useEffect"`,
    body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
  },
];
//1)Creae A Context
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

  const value = useMemo(
    function () {
      return {
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        onDeletePost: handelDeletePost,
        searchQuery,
        setSearchQuery,
      };
    },
    [searchQuery, searchedPosts]
  );
  return (
    //2) Provide Value to Child Component
    <PostContext.Provider value={value}>
      <h1>Hello</h1>
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
