import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto mt-4 grid grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <Sidebar />
        </div>
        {/* <div className="md:col-span-2 lg:col-span-2">
          // Put create post and feed here 
          <Feed />
        </div> */}
        {/* <div className="hidden lg:col-span-1 lg:block">
          <WhoToFollow />
        </div> */}
      </main>
    </div>
    </>
  );
}
