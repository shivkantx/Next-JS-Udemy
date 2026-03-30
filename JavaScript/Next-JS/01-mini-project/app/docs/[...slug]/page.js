export default async function Page({ params }) {
  const { slug } = await params;

  return <div className="text-gray-800">{slug?.join("/")}</div>;
}
