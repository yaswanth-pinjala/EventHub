const ChangePassword = () => {
  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-semibold">Change Password</h1>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
