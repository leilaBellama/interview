export default function UserCard({ user, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer transform hover:scale-105"
      onClick={() => onClick(user)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {user.name}
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">City:</span>{" "}
              {user.address?.city}
            </p>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Click for details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}