
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow p-6">{children}</main>
      <Footer />
    </div>
  );
}
