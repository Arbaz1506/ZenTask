import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

// ✅ Import default profile image
import proDef from "../../assets/images/proDef.jpg"; // adjust path if needed

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 🔍 Validations
    if (!fullName) return setError("Please enter your full name.");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter a password.");
    setError(null);

    try {
      let profileImageUrl = "";

      if (profilePic) {
        // ✅ Upload selected image
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      } else {
        // ✅ Use default image (already in assets/public)
        profileImageUrl = proDef;
      }

      // 🚀 API Call
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // 🔀 Redirect according to role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2 text-center">
          ZenTask
        </h2>
        <p className="text-gray-200 text-center mb-6 text-sm md:text-base">
          Create an account and organize your day efficiently.
        </p>

        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-400 p-2 rounded w-full text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="john@example.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              label="Admin Invite Token"
              placeholder="Optional"
              type="text"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-2xl active:scale-95 transition-transform duration-200"
          >
            SIGN UP
          </button>
        </form>

        {/* Login link */}
        <p className="text-gray-300 text-xs md:text-sm text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 font-medium hover:underline hover:text-pink-400 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
