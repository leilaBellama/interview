import { PinpointIcon, MailIcon } from "../assets/icons.jsx";

export default function UserCard({ user, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer transform sm:hover:scale-105"
      onClick={() => onClick(user)}
    >
      {/* Top row: name/email left, location right */}
      <div className="flex items-start gap-4">
        {/* User info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1 break-words whitespace-normal">
            {user.name}
          </h3>

          {/* Email row */}
          <div className="flex items-start gap-1 text-sm text-gray-600 min-w-0">
            <MailIcon className="w-4 h-4 flex-shrink-0 mt-[2px]" />
            <div className="min-w-0 break-words whitespace-normal">
              {user.email}
            </div>
          </div>
        </div>

        {/* Location (always on the right) */}
        <div className="flex flex-col shrink-0 text-right max-w-[32%]">
          <PinpointIcon className="text-gray-500 w-6 h-6 mb-1 mx-auto" />
          <div className="text-gray-600 text-sm break-words whitespace-normal">
            {user.address?.city}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <span className="inline-block text-blue-800 text-xs rounded">
          Click for details
        </span>
      </div>
    </div>
  );
}
