import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append(
        "address",
        JSON.stringify(userData.address || { line1: "", line2: "" })
      );
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      await loadUserProfileData();
      setIsEdit(false);
      setImage(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!userData) {
    return (
      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-6 md:grid-cols-[180px_1fr]">
        <div>
          {isEdit ? (
            <label htmlFor="profile-image" className="block cursor-pointer">
              <img
                className="h-44 w-44 rounded-2xl object-cover"
                src={image ? URL.createObjectURL(image) : userData.image || assets.profile_pic}
                alt="Profile"
              />
              <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Upload new image
              </span>
              <input
                id="profile-image"
                type="file"
                hidden
                onChange={(event) => setImage(event.target.files[0])}
              />
            </label>
          ) : (
            <img
              className="h-44 w-44 rounded-2xl object-cover"
              src={userData.image || assets.profile_pic}
              alt="Profile"
            />
          )}
        </div>

        <div>
          {isEdit ? (
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-2xl font-extrabold text-slate-900"
              value={userData.name || ""}
              onChange={(event) =>
                setUserData((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          ) : (
            <h1 className="text-3xl font-extrabold text-slate-900">{userData.name}</h1>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Email
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500"
                value={userData.email || ""}
                readOnly
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Phone
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={userData.phone || ""}
                onChange={(event) =>
                  setUserData((prev) => ({ ...prev, phone: event.target.value }))
                }
                readOnly={!isEdit}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Address line 1
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={userData.address?.line1 || ""}
                onChange={(event) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: event.target.value },
                  }))
                }
                readOnly={!isEdit}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Address line 2
              <input
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={userData.address?.line2 || ""}
                onChange={(event) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: event.target.value },
                  }))
                }
                readOnly={!isEdit}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Gender
              {isEdit ? (
                <select
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  value={userData.gender || "Male"}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, gender: event.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500"
                  value={userData.gender || "-"}
                  readOnly
                />
              )}
            </label>

            <label className="text-sm font-medium text-slate-700">
              Date of birth
              <input
                type={isEdit ? "date" : "text"}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={userData.dob || ""}
                onChange={(event) =>
                  setUserData((prev) => ({ ...prev, dob: event.target.value }))
                }
                readOnly={!isEdit}
              />
            </label>
          </div>

          <div className="mt-6">
            {isEdit ? (
              <button
                type="button"
                className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white"
                onClick={updateUserProfileData}
              >
                Save profile
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full border border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-700"
                onClick={() => setIsEdit(true)}
              >
                Edit profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
