import { useEffect } from "react";
import { usePostStore } from "../store/postsStore";

function Posts() {
  const { posts, loading, error, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="w-full max-w-xl bg-white border border-gray-200 rounded-md p-5">
      {/* Title */}
      <h2 className=" text-xl text-center font-semibold mb-3 text-gray-800">
        Posts
      </h2>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading posts…</p>}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Posts List */}
      {!loading && !error && (
        <ul className="divide-y divide-gray-100">
          {posts.map((post) => (
            <li key={post.id} className="py-2 text-sm text-gray-700">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
