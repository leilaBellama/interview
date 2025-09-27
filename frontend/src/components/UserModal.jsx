export default function UserModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
                <p>
                  <span className="font-medium">Website:</span>
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {user.website}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
              <div className="text-sm text-gray-600">
                <p>
                  {user.address?.street}, {user.address?.suite}
                </p>
                <p>
                  {user.address?.city}, {user.address?.zipcode}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
              <div className="text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {user.company?.name}
                </p>
                <p>
                  <span className="font-medium">Business:</span>{" "}
                  {user.company?.bs}
                </p>
                <p className="text-gray-600 italic">
                  "{user.company?.catchPhrase}"
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}