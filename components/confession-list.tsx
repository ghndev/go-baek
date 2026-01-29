export default function ConfessionList() {
    // Mock data for design
    const confessions = [
        { id: 1, content: "I secretly ate my sister's pudding...", from: "Anonymous", date: "2026.01.29" },
        { id: 2, content: "Sometimes I just want to quit everything and open a bakery.", from: "Baker", date: "2026.01.28" },
        { id: 3, content: "I love coding but debugging makes me cry.", from: "Dev", date: "2026.01.29" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {confessions.map((item, index) => (
                <div key={item.id} className={`p-6 bg-[#fffdf0] shadow-md transform transition-transform hover:scale-105 ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                    {/* Tape effect */}
                    <div className="w-24 h-6 bg-white/40 absolute -top-3 left-1/2 -translate-x-1/2 rotate-1 shadow-xs"></div>

                    <p className="text-sm text-gray-400 mb-2 font-sans tracking-widest">{item.date}</p>
                    <p className="text-2xl mb-4 leading-normal">{item.content}</p>
                    <div className="text-right text-gray-500">- {item.from}</div>
                </div>
            ))}
        </div>
    );
}
