import { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import Card from "../components/Card";

export default function ApiData() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts();
        setPosts(data.slice(0, 20)); // first 20 posts
        setFilteredPosts(data.slice(0, 20));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(results);
    setCurrentPage(1); // reset pagination on search
  }, [search, posts]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded text-white"
        />
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleItems.map((post) => (
          <Card key={post.id} title={post.title}>
            <p>{post.body}</p>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
