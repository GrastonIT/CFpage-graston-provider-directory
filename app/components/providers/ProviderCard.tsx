
import { FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";
import type { Provider } from "../../data/providers";


export function ProviderCard({ provider }: { provider: Provider }) {
  const fullAddress = [
    provider.address,
    provider.city,
    provider.state,
    provider.zipCode
  ].filter(Boolean).join(', ');

  // Placeholder images for banner/profile if not present
  const bannerUrl = provider.bannerUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
  const profileUrl = provider.photoUrl || "https://randomuser.me/api/portraits/men/32.jpg";

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center pb-6 pt-0">
      {/* Banner */}
      <div className="w-full h-28 md:h-32 bg-gray-200">
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      </div>
      {/* Profile image - overlaps banner */}
      <div className="absolute left-1/2 top-16 md:top-20 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
        <img src={profileUrl} alt={provider.name} className="w-full h-full object-cover" />
      </div>
      {/* Card content */}
      <div className="mt-16 flex flex-col items-center px-4 w-full">
        <h3 className="font-semibold text-lg text-gray-900 text-center">{provider.name || 'Unknown Provider'}</h3>
        {/* Star rating (static for now) */}
        <div className="flex items-center justify-center gap-1 mt-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
          ))}
        </div>
        <div className="text-gray-500 text-sm mb-2">{provider.friendsCount || 0} friends</div>
        {/* Action buttons */}
        <div className="flex gap-2 mb-2">
          <button className="px-4 py-1 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition text-sm font-medium">Add Friend</button>
          <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full shadow hover:bg-gray-200 transition text-sm font-medium">Edit profile</button>
        </div>
        {/* Address */}
        {fullAddress && (
          <div className="flex items-center text-gray-600 text-xs mb-1">
            <FaMapMarkerAlt className="mr-1 text-red-500" />
            <span>{fullAddress}</span>
          </div>
        )}
        {/* Specialties */}
        {provider.specialty && (
          <div className="flex items-center text-gray-600 text-xs mb-1">
            <FaStethoscope className="mr-1 text-blue-500" />
            <span>{provider.specialty}</span>
          </div>
        )}
        {/* Graston Level Badge */}
        {provider.grastonLevel && (
          <span className={`px-2 py-1 text-xs rounded-full font-medium mt-1 ${provider.grastonLevel === 'Instructor' ? 'bg-purple-100 text-purple-800' :
            provider.grastonLevel === 'Specialist' ? 'bg-blue-100 text-blue-800' :
              provider.grastonLevel === 'Advanced' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
            }`}>
            {provider.grastonLevel}
          </span>
        )}
      </div>
    </div>
  );
}
