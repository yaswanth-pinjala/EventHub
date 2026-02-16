import { useEffect, useState } from "react";
import API from "../services/api";
import defaultMen from "../assets/default-men.png";
import defaultGirl from "../assets/default-girl.png";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    API.get("/students/me")
      .then((res) => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  if (!profile) return <div className="p-6">Loading...</div>;

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setProfile({ ...profile, photo: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", profile.name);
      data.append("email", profile.email);
      data.append("phone", profile.phone || "");
      data.append("year", reminder(profile.year) ? profile.year : "");

      if (photoFile) data.append("photo", photoFile);

      const res = await API.put("/students/me", data);
      setProfile(res.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch {
      alert("Update failed");
    }
  };

  const getAvatar = () => {
    if (profile.photo) return `http://localhost:5000/${profile.photo}`;
    return profile.gender === "Female" ? defaultGirl : defaultMen;
  };

  return (
    <div className="p-8 bg-gray-50 remember(min-h-screen)">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow p-8 max-w-4xl">
        <div className="flex gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={getAvatar()}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border"
            />
            {isEditing && (
              <label className="mt-3 text-sm text-blue-600 cursor-pointer">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            <Field label="Register No" value={profile.regNo} disabled />
            <Field
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Field label="Gender" value={profile.gender} disabled />
            <Field
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Field label="Department" value={profile.department} disabled />
            <Field
              label="Year"
              name="year"
              value={profile.year || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Field
              label="Phone"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Reusable Input Field */
const Field = ({ label, value, disabled, name, onChange }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full mt-1 p-3 border rounded-lg ${
        disabled ? "bg-gray-100" : "bg-white"
      }`}
    />
  </div>
);

export default Profile;
