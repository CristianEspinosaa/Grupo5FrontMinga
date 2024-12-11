import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAuthor } from '../store/actions/authorActions';
import { Toaster, toast } from 'react-hot-toast';
import profile from '../assets/default-profile.png';

const CreateAuthor = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { loading, error } = useSelector((state) => state.author);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const token = useSelector(state => state.auth.token); // Añade esto
    
    if (!token) {
      toast.error("You need to be logged in to create an author");
      return;
    }
  
    const name = formRef.current.get('name');
    const lastName = formRef.current.get('last_name');
    const cityCountry = formRef.current.get('city-country');
    const date = formRef.current.get('date');
    const photo = formRef.current.get('photo');
    const array = cityCountry.split(',');
  
    if (array.length === 2) {
      const data = {
        name,
        last_name: lastName,
        city: array[0].trim(),
        country: array[1].trim(),
        date,
        photo,
      };
  
      console.log('Data being sent:', data); // Añade esto para depurar
  
      try {
        await dispatch(createAuthor(data));
        toast.success('Author created successfully');
        event.target.reset();
        window.location.href = '/';
      } catch (error) {
        console.log('Error creating author:', error);
        
        toast.error(error.message || "Error creating author");
      }
    } else {
      toast.error("Please enter city and country separated by a comma (e.g., 'New York, USA')");
    }
  };

  return (
    <div className="flex justify-center w-full h-screen bg-gray-200">
      <form
        className="form-author mt-32 w-96 h-[75vh] flex flex-col items-center justify-evenly bg-white p-6 shadow-xl rounded-2xl"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h1 className="font-montserrat font-normal text-3xl leading-tight">New Author</h1>
        <img src={profile} alt="profile" className="w-14" />
        <input
          className="input-author w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
          type="text"
          name="name"
          placeholder="First Name"
          required
        />
        <input
          className="input-author w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <input
          className="input-author w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
          type="text"
          name="city-country"
          placeholder="City, Country"
          required
        />
        <input
          className="input-author w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
          type="date"
          name="date"
        />
        <input
          className="input-author w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-6 px-2"
          type="text"
          name="photo"
          placeholder="URL Profile Image"
          required
        />
        <button type="submit" className="w-3/5 h-12 bg-[#4338CA] text-white rounded-full text-xl cursor-pointer">
          {loading ? 'Creating...' : 'Send'}
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CreateAuthor;