import { memo, useEffect, useState } from "react";
import { PostProvider, usePosts } from "./PostContext";
import Test from "./Test";

//1)Create A Context

function App() {
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  console.log("hello");
  const [isFakeDark, setIsFakeDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  //3)Consume Context Value
  const { onClearPosts } = usePosts();
  const hell = usePosts();
  console.log("hell:", hell);

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
}

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function Posts() {
  return (
    <section>
      <List />
      <Test />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { posts, onDeletePost } = usePosts();
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onDeletePost(post.title)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  const { onAddPost } = usePosts();
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  // const [posts] = useState(() =>
  //   // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
  //   Array.from({ length: 10000 }, () => createRandomPost())
  // );

  const [posts] = useState([
    {
      title: "Unleashing Stateful Magic: The Power of useState in React",
      body: "React's useState Hook empowers functional components with dynamic state management. This essential tool allows developers to create interactive and responsive user interfaces, effortlessly handling and updating component state for a seamless and delightful user experience in just 50 words",
    },
    {
      title: `"Mastering React's useEffect"`,
      body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
    },
  ]);

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export { Header, Main, Archive, Footer };

export default App;
