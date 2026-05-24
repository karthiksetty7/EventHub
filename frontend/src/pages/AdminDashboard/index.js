import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaTicketAlt,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import * as adminApi from "../../api/adminApi";
import EmptyState from "../../components/EmptyState";
import "./index.css";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    events: [],
    bookings: [],
    statistics: {},
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Get current user from localStorage (assuming you store it there upon login)
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const isUserActive = (lastLogin) => {
    if (!lastLogin) return false;
    const lastDate = new Date(lastLogin);
    const now = new Date();
    const diffTime = now.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const getDashboardData = async () => {
    try {
      setErrorMessage("");
      const response = await adminApi.getDashboardStats();
      if (response.success) {
        setDashboardData({
          users: response.users || [],
          events: response.events || [],
          bookings: response.bookings || [],
          statistics: response.statistics || {},
        });
      }
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load dashboard");
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await adminApi.deleteAdminEvent(eventId);
      getDashboardData();
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminApi.deleteAdminUser(userId);
      getDashboardData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    getDashboardData();
    const interval = setInterval(getDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  const { users, events, bookings, statistics } = dashboardData;

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <FaUsers />
          <h2>{statistics.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="analytics-card">
          <FaCalendarAlt />
          <h2>{statistics.totalEvents}</h2>
          <p>Total Events</p>
        </div>
        <div className="analytics-card">
          <FaTicketAlt />
          <h2>{statistics.totalBookings}</h2>
          <p>Total Bookings</p>
        </div>
      </div>

      {/* USERS SECTION */}
      <div className="dashboard-section">
        <h2>Users</h2>
        {users.length === 0 ? (
          <EmptyState title="No Users Found" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {isUserActive(user.last_login) ? (
                      <span>
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span>
                        <FaTimesCircle /> Inactive
                      </span>
                    )}
                  </td>
                  <td>
                    {String(user.id) !== String(currentUser?.id) &&
                      user.role !== "admin" && (
                        <button onClick={() => deleteUser(user.id)}>
                          <FaTrash />
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EVENTS SECTION */}
      <div className="dashboard-section">
        <h2>Events</h2>
        {events.length === 0 ? (
          <EmptyState title="No Events Found" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.category}</td>
                  <td>{event.location}</td>
                  <td>
                    <button onClick={() => deleteEvent(event.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BOOKINGS SECTION */}
      <div className="dashboard-section">
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <EmptyState title="No Bookings Found" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Seat</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.user_name}</td>
                  <td>{b.event_title}</td>
                  <td>{Number(b.seat_number)}</td>
                  <td>₹{b.ticket_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
    </div>
  );
};

export default AdminDashboard;
