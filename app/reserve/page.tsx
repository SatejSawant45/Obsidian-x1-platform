
import Reservation from "@/components/Reservation";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Reserve | Obsidian X1",
    description: "Secure your allocation for the Obsidian X1 limited-production hypercar.",
};

export default function ReservePage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <Reservation />
        </main>
    );
}
