import Link from "next/link";
import NotebookPaper from "@/components/notebook-paper";

export default function NotFound() {
    return (
        <main className="min-h-screen p-4 flex flex-col items-center justify-center">
            <div className="text-center mb-8 mt-12">
                <h1 className="text-7xl font-bold mb-2 tracking-tighter transform -rotate-2 font-gaegu text-gray-800">404</h1>
                <p className="text-2xl text-gray-500 font-gaegu">Oops! This page seems to be torn out.</p>
            </div>

            <NotebookPaper>
                <div className="text-center py-12">
                    <p className="text-3xl font-gaegu text-gray-600 mb-8">
                        The page you are looking for<br />
                        does not distinguish itself in this notebook.
                    </p>

                    <div className="relative inline-block group">
                        <Link
                            href="/"
                            className="inline-block bg-gray-800 text-white font-gaegu text-2xl py-3 px-8 rounded-full hover:bg-black transition-transform transform rotate-1 shadow-md"
                        >
                            Return to Cover
                        </Link>
                    </div>
                </div>
            </NotebookPaper>
        </main>
    );
}
