
export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {user.name}
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Phone:</strong> {user.phone}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">City:</strong> {user.address?.city}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Company:</strong> {user.company?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
