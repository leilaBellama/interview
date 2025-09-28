import {
  PinpointIcon,
  MailIcon,
  PhoneIcon,
  WebsiteIcon,
} from "../assets/icons.jsx";

export default function UserModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <div className="flex flex-1 justify-end pt-6 pr-6 -mb-8">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 pt-0">
          {/* User avatar and name */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-3xl">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Contact information */}
            <div className="space-y-2 text-sm">
              <div className="flex gap-1 items-center">
                <MailIcon className="w-6 w-6 bg-blue-400 p-[.18rem] rounded-full text-white" />
                {user.email}
              </div>

              <div className="flex gap-1">
                <PhoneIcon className="w-6 w-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                {user.phone}
              </div>

              <div className="flex">
                <WebsiteIcon className="w-6 h-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  {user.website}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center">
              <PinpointIcon className="w-7 h-7 -ml-1 mr-1 text-gray-500" />
              <div className="text-sm text-gray-600">
                <p>
                  {user.address?.street}, {user.address?.suite}
                </p>
                <p>
                  {user.address?.city}, {user.address?.zipcode}
                </p>
              </div>
            </div>

            {/* Company information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Company Information
              </h4>
              <div className="text-sm">
                <p className="font-bold text-base mb-2">{user.company?.name}</p>
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

        {/* Close button footer */}
        <div className="p-6 pt-0">
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