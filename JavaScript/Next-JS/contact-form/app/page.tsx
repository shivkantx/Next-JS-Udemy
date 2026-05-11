import Contact from "@/components/Contact.jsx";
export default function Home() {
  return (
    <main className=" mt-2 overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold pb-2">Server Actions Demo</h1>
          <p className="text-xl text-gray-600 mb-6">
            Contact form with mongoDB and revalidation
          </p>
          <Contact />
        </div>
      </div>
    </main>
  );
}
