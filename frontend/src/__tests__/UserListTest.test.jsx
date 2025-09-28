import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import UserList from '../pages/UserList';

// Mock the child components
vi.mock('../components/UserCard', () => ({
  default: ({ user, onClick }) => (
    <div data-testid={`user-card-${user.id}`} onClick={() => onClick(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}));

vi.mock('../components/UserModal', () => ({
  default: ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="user-modal">
        <h2>{user?.name}</h2>
        <button onClick={onClose} data-testid="close-modal">Close</button>
      </div>
    );
  }
}));

vi.mock('../components/SearchInput', () => ({
  default: ({ searchTerm, onSearchChange, placeholder }) => (
    <input
      data-testid="search-input"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}));

vi.mock('../components/SortDropdown', () => ({
  default: ({ sortOrder, onSortChange, options }) => (
    <select
      data-testid="sort-dropdown"
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}));

// Sample test data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    address: { city: 'New York' },
    company: { name: 'Acme Corp' }
  },
  {
    id: 2,
    name: 'Jane Smith',  
    email: 'jane@example.com',
    username: 'janesmith',
    address: { city: 'Los Angeles' },
    company: { name: 'Tech Solutions' }
  }
];

describe('UserList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe('Loading State', () => {
    test('displays loading message when fetching users', async () => {
      // Mock fetch to never resolve (loading state)
      global.fetch.mockImplementation(() => new Promise(() => {}));

      render(<UserList />);
      
      expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('displays error message when fetch fails', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByText('Error Loading Users')).toBeInTheDocument();
        expect(screen.getByText('Network error')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('displays HTTP error when response is not ok', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByText('HTTP error! status: 404')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Successful Data Loading', () => {
    test('renders user cards after successful fetch', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByText('User Directory')).toBeInTheDocument();
      }, { timeout: 3000 });

      await waitFor(() => {
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('displays correct user count', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByText('Showing 2 of 2 users')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Search Functionality', () => {
    test('renders search input', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('filters users by search term', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Search for "john"
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
        expect(screen.queryByTestId('user-card-2')).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Sort Functionality', () => {
    test('renders sort dropdown', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByTestId('sort-dropdown')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('sorts users correctly when dropdown value changes', async () => {
      // Mock data with names in specific order for testing
      const sortTestUsers = [
        {
          id: 1,
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          username: 'charlie',
          address: { city: 'New York' },
          company: { name: 'Acme Corp' }
        },
        {
          id: 2,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          username: 'alice',
          address: { city: 'Los Angeles' },
          company: { name: 'Tech Solutions' }
        },
        {
          id: 3,
          name: 'Bob Smith',
          email: 'bob@example.com',
          username: 'bob',
          address: { city: 'Chicago' },
          company: { name: 'Design Co' }
        }
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(sortTestUsers),
      });

      render(<UserList />);

      // Wait for initial load (should be sorted A-Z by default)
      await waitFor(() => {
        expect(screen.getByTestId('user-card-2')).toBeInTheDocument(); // Alice (id 2)
        expect(screen.getByTestId('user-card-3')).toBeInTheDocument(); // Bob (id 3)  
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument(); // Charlie (id 1)
      }, { timeout: 3000 });

      // Verify default ascending order by checking the order of names in DOM
      const userCards = screen.getAllByTestId(/user-card-/);
      expect(userCards[0]).toHaveAttribute('data-testid', 'user-card-2'); // Alice first
      expect(userCards[1]).toHaveAttribute('data-testid', 'user-card-3'); // Bob second
      expect(userCards[2]).toHaveAttribute('data-testid', 'user-card-1'); // Charlie third

      // Change to descending order
      const sortDropdown = screen.getByTestId('sort-dropdown');
      fireEvent.change(sortDropdown, { target: { value: 'desc' } });

      await waitFor(() => {
        const sortedUserCards = screen.getAllByTestId(/user-card-/);
        expect(sortedUserCards[0]).toHaveAttribute('data-testid', 'user-card-1'); // Charlie first
        expect(sortedUserCards[1]).toHaveAttribute('data-testid', 'user-card-3'); // Bob second
        expect(sortedUserCards[2]).toHaveAttribute('data-testid', 'user-card-2'); // Alice third
      }, { timeout: 2000 });
    });

    test('displays correct sort options in dropdown', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        const sortDropdown = screen.getByTestId('sort-dropdown');
        expect(sortDropdown).toBeInTheDocument();
        
        // Check that dropdown has correct options
        expect(screen.getByText('Name (A-Z)')).toBeInTheDocument();
        expect(screen.getByText('Name (Z-A)')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Modal Functionality', () => {
    test('opens modal when user card is clicked', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
      }, { timeout: 3000 });

      fireEvent.click(screen.getByTestId('user-card-1'));

      await waitFor(() => {
        expect(screen.getByTestId('user-modal')).toBeInTheDocument();
      }, { timeout: 2000 });

      // Check that the modal contains the user name (don't use getByText for duplicate text)
      const modal = screen.getByTestId('user-modal');
      expect(modal).toHaveTextContent('John Doe');
    });
  });

  describe('Empty State', () => {
    test('shows empty state when no users are returned', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      render(<UserList />);

      await waitFor(() => {
        expect(screen.getByText('No users found')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('API Integration', () => {
    test('calls correct API endpoint', () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      render(<UserList />);

      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
  });
});