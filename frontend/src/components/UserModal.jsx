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
        <div className="p-6 space-y-6">
          {/* User avatar and name */}
          <div className="flex space-x-4">
            <div className="w-16 h-16 my-auto bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
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
            {/* Close button */}
            <div className="flex flex-1 justify-end items-start  bg-re">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl font- leading-5"
              >
                ×
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact information */}
            <div className=" flex gap-4 justify-between">
              <div className="space-y-2 text-sm">
                <div className="flex gap-2 items-center">
                  <MailIcon className="w-6 h-6 bg-blue-400 p-[.18rem] rounded-full text-white" />
                  {user.email}
                </div>

                <div className="flex gap-2 items-center">
                  <PhoneIcon className="w-6 h-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                  {user.phone}
                </div>

                <div className="flex gap-2">
                  <WebsiteIcon className="w-6 h-6 bg-blue-400 p-[.2rem] rounded-full text-white" />
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>

              {/* Address */}
              {/* <div className="flex-col items-center -mt-6">
              <PinpointIcon className="w-7 h-7 mx-auto text-gray-500" />
              <div className="text-sm text-gray-600">
                <p>
                  {user.address?.street}, {user.address?.suite}
                </p>
                <p>
                  {user.address?.city}, {user.address?.zipcode}
                </p>
              </div>
            </div> */}
            </div>

            {/* Company information */}
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
