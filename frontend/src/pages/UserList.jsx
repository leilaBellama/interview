import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import SortDropdown from "../components/SortDropdown";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";

// FilterBar Layout Component
function FilterBar({ children, className = "" }) {
  return (
    <div
      className={`mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
}

// Main App Component
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort options configuration
  const sortOptions = [
    { value: "asc", label: "Name (A-Z)" },
    { value: "desc", label: "Name (Z-A)" },
  ];

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase(); // "le" → "le"
    const nameParts = user.name.toLowerCase().split(" "); // "Leanne Graham" → ["leanne", "graham"]

    // Check if any part of the name starts with search term
    return nameParts.some((namePart) => namePart.startsWith(searchLower));
  });

  // Handle user card click
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-4">
          <div className="flex items-center mb-4">
            <svg
              className="h-8 w-8 text-red-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">
              Error Loading Users
            </h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            User Directory
          </h1>
          <p className="text-gray-600 text-lg">
            Browse and search through our user database
          </p>
        </div>

        {/* Search and Sort */}
        <FilterBar>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search users by name..."
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-gray-400 hover:text-gray-600 px-2 transition-colors duration-200"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <SortDropdown
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            options={sortOptions}
            label="Sort by:"
          />
        </FilterBar>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedUsers.length} of {users.length} users
            {searchTerm && <span> matching "{searchTerm}"</span>}
          </p>
        </div>

        {/* Users Grid */}
        <div className="max-h-[60vh] overflow-auto">

        {filteredAndSortedUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedUsers.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? `No users match "${searchTerm}". Try a different search term.`
                : "No users available at the moment."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
        </div>


        {/* User Details Modal */}
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
