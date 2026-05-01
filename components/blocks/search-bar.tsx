"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { destinations } from "@/lib/destinations";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const router = useRouter();

  const handleSearch = () => {
    if (destination) {
      router.push(`/destinations/${destination}`);
    } else {
      router.push("/destinations");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-1 md:gap-0 w-full">
      {/* Destination */}
      <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
        <MapPin size={18} className="text-[#2571BC] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-dm text-xs text-gray-400 font-medium">Destination</p>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full font-dm text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
          >
            <option value="">Where to go?</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} — {d.type === "international" ? "International" : "Domestic"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Departure */}
      <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
        <Calendar size={18} className="text-[#2571BC] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-dm text-xs text-gray-400 font-medium">Departure</p>
          <input
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full font-dm text-sm text-gray-700 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Return */}
      <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
        <Calendar size={18} className="text-[#2571BC] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-dm text-xs text-gray-400 font-medium">Return</p>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full font-dm text-sm text-gray-700 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Travelers */}
      <div className="flex items-center gap-3 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
        <Users size={18} className="text-[#2571BC] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-dm text-xs text-gray-400 font-medium">Travelers</p>
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full font-dm text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Person" : "People"}
              </option>
            ))}
            <option value="10+">10+ People</option>
          </select>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="bg-[#003060] hover:bg-[#002050] text-white px-6 py-3 rounded-xl font-dm font-medium flex items-center gap-2 transition-colors duration-200 whitespace-nowrap md:ml-1"
      >
        <Search size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}

