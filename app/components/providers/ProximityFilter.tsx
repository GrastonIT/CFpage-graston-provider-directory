
export function ProximityFilter({ map }: { map: any }) {
  return (
    <div>
      <h3 className="font-bold mb-3 text-lg">Proximity</h3>
      <label htmlFor="proximity-range" className="sr-only">Proximity</label>
      <input id="proximity-range" type="range" min="1" max="100" defaultValue="25" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      <p className="text-center mt-1 text-gray-600">25 miles</p>
    </div>
  );
}
