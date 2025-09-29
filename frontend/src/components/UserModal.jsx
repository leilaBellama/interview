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
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header: Avatar + Name + Username + Close Button */}
          <div className="flex flex-wrap items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-3xl">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            {/* Name and Username */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-semibold text-gray-900 break-words">
                {user.name}
              </h3>
              <p className="text-gray-600 break-words">@{user.username}</p>
            </div>

            {/* Close Button */}
            <div className="flex-shrink-0 self-start">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                ×
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 min-w-0">
                <MailIcon className="w-6 h-6 bg-blue-400 p-[.18rem] rounded-full text-white flex-shrink-0" />
                <div className="min-w-0 break-words whitespace-normal">
                  {user.email}
                </div>
              </div>

              <div className="flex items-start gap-2 min-w-0">
                <PhoneIcon className="w-6 h-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                <div className="min-w-0 break-words whitespace-normal">
                  {user.phone}
                </div>
              </div>

              <div className="flex items-start gap-2 min-w-0">
                <WebsiteIcon className="w-6 h-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline min-w-0 break-words"
                >
                  {user.website}
                </a>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-semibold mb-2">Company Information</h4>
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

        {/* Footer Close Button */}
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
