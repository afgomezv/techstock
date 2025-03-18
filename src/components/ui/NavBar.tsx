import { PackageOpen } from "lucide-react";

export default function NavBar() {
  return (
    <>
      <nav className="bg-white shadow-lg">
        <section className="flex p-8 max-w-6xl mx-auto">
          <div>
            <PackageOpen size={50} color="#2a8bea" strokeWidth={1.5} />
          </div>
          <div className="text-4xl font-bold text-gray-500 hover:text-gray-700">
            <h1>TechStock</h1>
          </div>
        </section>
      </nav>
    </>
  );
}
