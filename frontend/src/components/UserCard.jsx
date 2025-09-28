import { PinpointIcon } from "../assets/icons.jsx";

export default function UserCard({ user, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer transform sm:hover:scale-105"
      onClick={() => onClick(user)}
    >
      <div className="flex-col text-center">
        <div className="flex">
          <div className="flex-1 min-w-0 truncat">
            {/* User name */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
              {user.name}
            </h3>

            {/* User email */}
            <div className="space-y-">
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>

            {/* Location */}
            <div className="flex justify-start items-center flex-shrink-0 my-3 w-fit mx-auto">
              <PinpointIcon className="text-gray-500" />
              <div className="text-sm text-gray-600 text-center">
                {user.address?.city}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
