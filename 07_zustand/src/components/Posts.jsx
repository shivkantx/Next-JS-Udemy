import { useEffect } from "react";
import { usePostStore } from "../store/postsStore";

function Posts() {
  const { posts, loading, error, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
        📄 Latest Posts
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          Loading posts…
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-sm text-red-500 bg-red-50 p-3 rounded-md">
          {error}
        </p>
      )}

      {/* Posts List */}
      {!loading && !error && (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg 
                         hover:bg-gray-100 hover:shadow transition-all duration-200"
            >
              <p className="text-gray-800 font-medium leading-relaxed">
                {post.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
