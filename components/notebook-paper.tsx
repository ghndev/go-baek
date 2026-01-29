export default function NotebookPaper({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-3xl mx-auto my-10 bg-white shadow-2xl p-8 md:p-12 min-h-[80vh] relative rotate-1 transform transition-transform hover:rotate-0">
            {/* Paper texture overlay (optional, if layout texture isn't enough) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

            {/* Content Container */}
            <div className="relative z-10 space-y-8">
                {children}
            </div>
        </div>
    );
}
