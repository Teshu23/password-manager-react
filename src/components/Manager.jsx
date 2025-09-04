import React, { useEffect, useState } from 'react';
import eyeIcon from '../assets/eye.png';
import hiddenIcon from '../assets/hidden.png';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill out all fields before saving!");
      return;
    }

    const updatedPasswords = [...passwordArray, form];
    setPasswordArray(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" });
    toast.success("Password saved successfully!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.info(`${label} copied to clipboard!`);
  };

  const deletePassword = (index) => {
    const updated = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updated);
    localStorage.setItem('passwords', JSON.stringify(updated));
    toast.warn("Password deleted!");
  };

  return (
    <div className='bg-slate-50 mycontainer mx-auto p-4 md:p-8 lg:p-12'>
      <ToastContainer />
      <h1 className='text-3xl md:text-4xl font-bold text-center'>
        <span className='text-green-400'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-400'>OP/&gt;</span>
      </h1>
      <p className='text-green-900 text-base md:text-lg flex justify-center items-center mt-2'>
        Your Password Manager
      </p>

      {/* Form Section */}
      <div className='text-black flex flex-col items-center p-4 md:p-8 gap-6 md:gap-8'>
        <input
          value={form.site}
          onChange={handleChange}
          className='rounded-full border border-green-500 w-full p-2 md:p-4 py-1 text-sm md:text-base'
          type="text"
          placeholder="Enter Website URL"
          name="site"
        />
        <div className='flex flex-col md:flex-row w-full justify-between gap-6 md:gap-8'>
          <input
            value={form.username}
            onChange={handleChange}
            className='rounded-full border border-green-500 w-full p-2 md:p-4 py-1 text-sm md:text-base'
            placeholder='Enter Username'
            type="text"
            name='username'
          />
          <div className='relative w-full'>
            <input
              value={form.password}
              onChange={handleChange}
              className='rounded-full border border-green-500 w-full p-2 md:p-4 py-1 text-sm md:text-base'
              placeholder='Enter Password'
              type={showPassword ? "text" : "password"}
              name='password'
            />
            <span
              className='absolute right-2 top-2 md:right-4 md:top-4 cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              <img
                className='w-6 md:w-8'
                src={showPassword ? hiddenIcon : eyeIcon}
                alt="Toggle Password Visibility"
              />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className='text-black flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-6 md:px-8 py-2 w-full md:w-fit text-sm md:text-base'
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          <span className="ml-2">Add Password</span>
        </button>
      </div>

      {/* Passwords Table */}
      <div className='passwords mt-8'>
        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
        {passwordArray.length === 0 && (
          <div className="text-gray-600">No passwords to show</div>
        )}

        {passwordArray.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100 border border-green-400'>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className='py-2 border border-green-400 text-center w-32'>
                      <div className="flex justify-center items-center gap-2">
                        <span>{item.site}</span>
                        <FiCopy
                          className='cursor-pointer'
                          onClick={() => copyToClipboard(item.site, 'Site')}
                        />
                      </div>
                    </td>
                    <td className='py-2 border border-green-400 text-center w-32'>
                      <div className="flex justify-center items-center gap-2">
                        <span>{item.username}</span>
                        <FiCopy
                          className='cursor-pointer'
                          onClick={() => copyToClipboard(item.username, 'Username')}
                        />
                      </div>
                    </td>
                    <td className='py-2 border border-green-400 text-center w-32'>
                      <div className="flex justify-center items-center gap-2">
                        <span>{showPassword ? item.password : "••••••••"}</span>
                        <FiCopy
                          className='cursor-pointer'
                          onClick={() => copyToClipboard(item.password, 'Password')}
                        />
                      </div>
                    </td>
                    <td className='py-2 border border-green-400 text-center w-24'>
                       <div className="flex justify-center items-center">
                       <button
                       onClick={() => deletePassword(index)}
                       className='flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400'
                       >
                        <FiTrash2 /> Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
