export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div className="text-gray-800">
      <h1>Welcome to docs</h1>
      {slug?.join("/")}
    </div>
  );
}
