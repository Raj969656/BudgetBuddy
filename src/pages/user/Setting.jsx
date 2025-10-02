import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

// A simple Modal component to handle profile editing
const EditProfileModal = ({ profile, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  // Sync state with props when the modal opens
  useEffect(() => {
    if (isOpen) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full m-4 shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

// New Modal for changing password
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    // Simulate API call to change password
    console.log("Password change requested.");
    toast.success("Password changed successfully!");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full m-4 shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

// New Modal for deleting account
const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full m-4 shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Are you sure you want to delete your account? This action is permanent and cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SettingsPage = () => {
  const { user, setUser, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    language: 'en',
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch user data from context on component load
  useEffect(() => {
    if (user) {
      setLoading(true);
      try {
        const fetchedProfile = user.profile || { name: user.name || "User", email: user.email || "user@example.com" };
        const fetchedSettings = user.settings || { notificationsEnabled: true, language: 'en' };
        
        setProfile(fetchedProfile);
        setSettings(fetchedSettings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user data:", error);
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle saving settings (simulated)
  const handleSaveSettings = (newSettings) => {
    if (!user) return;
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    const updatedUser = { ...user, settings: updatedSettings };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success("Settings saved successfully!");
  };

  // Handle updating profile (simulated)
  const handleUpdateProfile = (newProfile) => {
    if (!user) return;
    setProfile(newProfile);
    const updatedUser = { ...user, profile: newProfile };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    toast.info("You have been logged out.");
  };

  const handleDeleteAccount = () => {
    // This is where you would call your backend API to delete the user
    console.log("Account deletion requested.");
    toast.info("Your account has been deleted.");
    setIsDeleteModalOpen(false);
    logoutUser();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <section id="profile" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</span>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.name}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email Address</span>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.email}</p>
              </div>
            </div>
          </section>
        );
      case 'preferences':
        return (
          <section id="preferences" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor="notifications-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="notifications-toggle"
                    className="sr-only peer"
                    checked={settings.notificationsEnabled}
                    onChange={() => handleSaveSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div>
                <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  id="language-select"
                  value={settings.language}
                  onChange={(e) => handleSaveSettings({ language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </section>
        );
      case 'account':
        return (
          <section id="account" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Account</h2>
            <div className="space-y-4">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40"
              >
                Change Password
              </button>
            </div>
          </section>
        );
      case 'dangerZone':
        return (
          <section id="dangerZone" className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-lg dark:bg-red-900/10 dark:border-red-800">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-sm text-red-500 mb-4">Proceed with caution. These actions are irreversible.</p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </section>
        );
        case 'subscription':
            return (
              <section id="subscription" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Subscription</h2>
                <div className="space-y-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-4">
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Current Plan: Free</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your free plan includes up to 50 transactions per month.</p>
                  </div>
                  <button className="w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                    Upgrade to Pro
                  </button>
                </div>
              </section>
            );
        case 'notifications':
            return (
              <section id="notifications" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="weekly-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Weekly Report Emails
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="weekly-toggle"
                        className="sr-only peer"
                        checked={settings.notificationsEnabled}
                        onChange={() => handleSaveSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="transaction-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Real-time Transaction Alerts
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="transaction-toggle"
                        className="sr-only peer"
                        checked={settings.notificationsEnabled}
                        onChange={() => handleSaveSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </section>
            );
        case 'privacy':
            return (
                <section id="privacy" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Privacy & Security</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Recent Login Activity</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>Last login: Today, 10:30 AM from New Delhi, India</p>
                    <p>IP Address: 203.0.113.195</p>
                  </div>
                  <button className="w-full px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40">
                    View All Activity
                  </button>
                </div>
              </section>
            );
        case 'export':
            return (
              <section id="export" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Export Data</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Download a copy of your full expense history.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                      <select className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                        <option>All Time</option>
                      </select>
                      <button className="w-full sm:w-1/2 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                        Export as CSV
                      </button>
                  </div>
                </div>
              </section>
            );
        case 'help':
            return (
              <section id="help" className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Help & Support</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Need help? Find answers to common questions or contact our support team.
                </p>
                <div className="space-y-4">
                  <Link to="#" className="w-full px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40">
                    Visit Support Center
                  </Link>
                  <details className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      How do I add a new transaction?
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      You can add a new transaction from the dashboard by clicking the "Add Transaction" button.
                    </p>
                  </details>
                  <details className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      How can I categorize my expenses?
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Our smart expense manager automatically categorizes your transactions based on the details you provide. You can also manually adjust the category of any transaction from the "Transactions" page.
                    </p>
                  </details>
                  <details className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      What is the "Trend" on my dashboard?
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      The trend shows how your total spending this week compares to your spending in the previous week. An "Up" trend means you've spent more, while a "Down" trend means you've spent less.
                    </p>
                  </details>
                  <details className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      Is my financial data secure?
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Yes, we use industry-standard encryption and security protocols to protect your data. Your financial information is stored securely and is only accessible to you.
                    </p>
                  </details>
                  <details className="p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      How do I change my currency?
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      You can change your default currency in the "Preferences" section of your settings. This will automatically update the currency symbols throughout your dashboard and reports.
                    </p>
                  </details>
                </div>
              </section>
            );
      default:
        return null;
    }
  };

  return (
    <div className='bg-gray-50 text-gray-800 min-h-screen transition-colors duration-300'>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8">Settings ⚙️</h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Navigation Sidebar */}
            <aside className="col-span-1 p-6 bg-white rounded-xl shadow-lg h-fit space-y-2 dark:bg-gray-800">
              <a
                href="#profile"
                onClick={(e) => { e.preventDefault(); setActiveSection('profile'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'profile' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Profile
              </a>
              <a
                href="#preferences"
                onClick={(e) => { e.preventDefault(); setActiveSection('preferences'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'preferences' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Preferences
              </a>
              <a
                href="#account"
                onClick={(e) => { e.preventDefault(); setActiveSection('account'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'account' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Account
              </a>
              <a
                href="#subscription"
                onClick={(e) => { e.preventDefault(); setActiveSection('subscription'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'subscription' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Subscription
              </a>
              <a
                href="#notifications"
                onClick={(e) => { e.preventDefault(); setActiveSection('notifications'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'notifications' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Notifications
              </a>
              <a
                href="#privacy"
                onClick={(e) => { e.preventDefault(); setActiveSection('privacy'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'privacy' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Privacy & Security
              </a>
              <a
                href="#export"
                onClick={(e) => { e.preventDefault(); setActiveSection('export'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'export' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Export Data
              </a>
              <a
                href="#help"
                onClick={(e) => { e.preventDefault(); setActiveSection('help'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'help' ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/10'} transition-colors duration-200`}
              >
                Help & Support
              </a>
              <a
                href="#dangerZone"
                onClick={(e) => { e.preventDefault(); setActiveSection('dangerZone'); }}
                className={`block px-4 py-3 rounded-lg ${activeSection === 'dangerZone' ? 'text-red-600 font-semibold bg-red-50 dark:bg-red-900/30' : 'text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/10'} transition-colors duration-200`}
              >
                Danger Zone
              </a>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  to="#"
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
                >
                  <span className="mr-2">Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </Link>
              </div>
            </aside>

            {/* Dynamic Settings Content */}
            <div className="col-span-1 md:col-span-2 space-y-8">
              {renderSection()}
            </div>
          </div>
        )}
      </main>
      <EditProfileModal
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProfile}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
};

export default SettingsPage;
