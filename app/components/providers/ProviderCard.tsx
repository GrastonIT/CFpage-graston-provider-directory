
import { FaMapMarkerAlt, FaStethoscope, FaPhone, FaGlobe, FaAward } from "react-icons/fa";
import type { Provider } from "../../data/providers";

export function ProviderCard({ provider }: { provider: Provider }) {
  const fullAddress = `${provider.address}, ${provider.city}, ${provider.state} ${provider.zipCode}`;
  
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl text-gray-900">{provider.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          provider.grastonLevel === 'Instructor' ? 'bg-purple-100 text-purple-800' :
          provider.grastonLevel === 'Specialist' ? 'bg-blue-100 text-blue-800' :
          provider.grastonLevel === 'Advanced' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {provider.grastonLevel}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-2">{provider.credentials}</p>
      
      <div className="flex items-center text-gray-600 mb-2">
        <FaStethoscope className="mr-2 text-blue-500" />
        <span className="font-medium">{provider.specialty}</span>
      </div>
      
      <div className="flex items-start text-gray-600 mb-3">
        <FaMapMarkerAlt className="mr-2 mt-1 text-red-500 flex-shrink-0" />
        <span className="text-sm">{fullAddress}</span>
      </div>
      
      <div className="text-sm text-gray-700 mb-3">
        <p className="font-medium mb-1">{provider.practice}</p>
        {provider.description.length > 120 ? 
          `${provider.description.substring(0, 120)}...` : 
          provider.description
        }
      </div>
      
      {provider.specializations.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {provider.specializations.slice(0, 3).map((spec, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {spec}
              </span>
            ))}
            {provider.specializations.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                +{provider.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <FaAward className="mr-1" />
          <span>{provider.yearsExperience} years exp.</span>
        </div>
        <div className="flex gap-2">
          {provider.phone && (
            <FaPhone className="text-gray-400 hover:text-blue-500 cursor-pointer" />
          )}
          {provider.website && (
            <FaGlobe className="text-gray-400 hover:text-blue-500 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}
