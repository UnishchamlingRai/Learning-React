import {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { faker } from "@faker-js/faker";
// import { faker } from "faker
// function createRandomPost() {
//   return {
//     // title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//     // body: faker.hacker.phrase(),
//     title: `"Mastering React's useEffect"`,
//     body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
//   };
// }

const initiaBblogPosts = [
  {
    title: `"Mastering React's useEffect"`,
    body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
  },
];

function App() {
  // const [posts, setPosts] = useState(() =>
  //   Array.from({ length: 1 }, () => createRandomPost())
  // );
  const [posts, setPosts] = useState(function () {
    const getPosts = JSON.parse(localStorage.getItem("posts"));
    return getPosts ? getPosts : initiaBblogPosts;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }, []);

  function handleClearPosts() {
    setPosts([]);
  }

  function handelDeletePost(title) {
    setPosts((posts) => posts.filter((post) => post.title !== title));
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  useEffect(
    function () {
      localStorage.setItem("posts", JSON.stringify(posts));
    },
    [posts]
  );

  const archiveOption = useMemo(
    function () {
      return {
        show: false,
        title: `The length of post is ${posts.length}`,
      };
    },
    [posts.length]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main
        posts={searchedPosts}
        onAddPost={handleAddPost}
        onDeletePost={handelDeletePost}
      />
      {/* <Archive onAddPost={handleAddPost} /> */}
      <Archive archiveOption={archiveOption} onAddPost={handleAddPost} />
      <Footer />
    </section>
  );
}

function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main({ posts, onAddPost, onDeletePost }) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} onDeletePost={onDeletePost} />
    </main>
  );
}

function Posts({ posts, onDeletePost }) {
  return (
    <section>
      <List posts={posts} onDeletePost={onDeletePost} />
    </section>
  );
}

function FormAddPost({ onAddPost }) {
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

function List({ posts, onDeletePost }) {
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

function createPost() {
  return {
    title: "Unleashing Stateful Magic: The Power of useState in React",
    body: "React's useState Hook empowers functional components with dynamic state management. This essential tool allows developers to create interactive and responsive user interfaces, effortlessly handling and updating component state for a seamless and delightful user experience in just 50 words",
  };
}

const Archive = memo(function Archive({ archiveOption, onAddPost }) {
  console.log("hello");
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createPost())
  );

  // const [posts] = useState([
  //   {
  //     title: "Unleashing Stateful Magic: The Power of useState in React",
  //     body: "React's useState Hook empowers functional components with dynamic state management. This essential tool allows developers to create interactive and responsive user interfaces, effortlessly handling and updating component state for a seamless and delightful user experience in just 50 words",
  //   },
  //   {
  //     title: `"Mastering React's useEffect"`,
  //     body: "useEffect is a crucial React Hook that adds lifecycle functions to functional components. It manages side effects in components, like data fetching or subscriptions. Executed after rendering, it ensures asynchronous tasks do not disrupt the user interface. Its cleanup function enhances resource efficiency, offering precise control over component behavior.",
  //   },
  // ]);

  const [showArchive, setShowArchive] = useState(archiveOption.show);

  return (
    <aside>
      <h2>{archiveOption.title}</h2>
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
});

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
