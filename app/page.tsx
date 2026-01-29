import ConfessionForm from "@/components/confession-form";
import ConfessionList from "@/components/confession-list";
import NotebookPaper from "@/components/notebook-paper";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="text-center mb-8 mt-12 relative w-full max-w-3xl">
        <h1 className="text-7xl font-bold mb-2 tracking-tighter transform -rotate-2">Go-Baek</h1>
        <p className="text-2xl text-gray-500">A Digital Notebook for Your Secrets</p>

        <div className="absolute top-0 right-0 font-gaegu flex flex-col items-end">
          {session?.user ? (
            <>
              <p className="text-xl text-gray-700 mb-2">Hello, {session.user.name}</p>
              <form action={async () => {
                "use server";
                await signOut();
              }}>
                <button type="submit" className="text-gray-500 hover:text-red-500 underline decoration-dashed">
                  Close Book (Logout)
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="text-xl text-gray-500 hover:text-gray-800 underline decoration-dashed transition-colors">
              Open Book (Login)
            </Link>
          )}
        </div>
      </div>

      <NotebookPaper>
        <ConfessionForm user={session?.user} />
        <div className="border-t-2 border-dashed border-gray-200 my-8"></div>
        <h2 className="text-3xl font-bold text-center text-gray-400 mb-4">Recent Whispers</h2>
        <ConfessionList />
      </NotebookPaper>

      <footer className="py-8 text-center text-gray-400">
        &copy; 2026 Go-Baek. All rights reserved.
      </footer>
    </main>
  );
}
