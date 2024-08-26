import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddressDisplay from "./AddressDisplay";

const AddressForm = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState({
    phoneNumber: "",
    houseNo: "",
    street: "",
    landmark: "",
    district: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const userEmail = user?.email;

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    } else if (userEmail) {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get("/api/user/getAllAddresses", {
            params: { email: userEmail },
          });
          if (response.data.success) {
            setAddresses(response.data.addresses || []);
          } else {
            console.error("Error fetching addresses:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };

      fetchAddresses();
    }

    setCountries(Country.getAllCountries());
  }, [navigate, user, userEmail]);

  useEffect(() => {
    if (address.country) {
      const country = countries.find(
        (country) => country.name === address.country
      );
      if (country) {
        setStates(State.getStatesOfCountry(country.isoCode));
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [address.country, countries]);

  useEffect(() => {
    if (address.state) {
      const state = states.find((state) => state.name === address.state);
      if (state) {
        setCities(City.getCitiesOfState(state.countryCode, state.isoCode));
      }
    } else {
      setCities([]);
    }
  }, [address.state, states]);

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = countries.find(
      (country) => country.isoCode === selectedOption.value
    );
    setAddress({
      ...address,
      country: selectedCountry.name,
      state: "",
      city: "",
    });
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = states.find((state) => state.isoCode === selectedOption.value);
    setAddress({
      ...address,
      state: selectedState.name,
      city: "",
    });
  };

  const handleCityChange = (selectedOption) => {
    setAddress({
      ...address,
      city: selectedOption.label,
    });
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        const response = await axios.put("/api/user/updateAddress", {
          email: userEmail,
          address: { ...address, _id: selectedAddress._id },
        });
        if (response.data.success) {
          setAddresses(
            addresses.map((addr) =>
              addr._id === selectedAddress._id ? response.data.address : addr
            )
          );
          setSelectedAddress(null);
          setIsEditing(false);
        }
      } else {
        const response = await axios.post("/api/user/userAddress", {
          email: userEmail,
          address,
        });
        if (response.data.success) {
          setAddresses([...addresses, response.data.address]);
        }
      }
      setAddress({
        phoneNumber: "",
        houseNo: "",
        street: "",
        landmark: "",
        district: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
      });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  const handleEdit = (address) => {
    setAddress(address);
    setSelectedAddress(address);
    setIsEditing(true);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/user/deleteAddress/${selectedAddress._id}`, {
        params: { email: userEmail },
      });
      if (response.data.success) {
        setAddresses(addresses.filter((addr) => addr._id !== selectedAddress._id));
        setSelectedAddress(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedAddress(null);
    setIsEditing(false);
    setAddress({
      phoneNumber: "",
      houseNo: "",
      street: "",
      landmark: "",
      district: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    });
    setShowForm(false); // Hide the form when editing is canceled
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setShowForm(true); // Show form for adding a new address
  };

  return (
    <div className="flex">
      <div className="w-1/4 border-r">
        <h2 className="text-xl font-bold p-4">Addresses</h2>
        <button
          onClick={handleAddNewAddress}
          className="bg-green-500 text-white py-2 px-4 m-2 rounded-md hover:bg-green-600 w-3/4 "
        >
          Add New Address
        </button>
        <ul>
          {addresses.map((addr) => (
            <li
              key={addr._id}
              className="cursor-pointer p-2 border-b hover:bg-gray-200"
              onClick={() => {
                setSelectedAddress(addr);
                setShowForm(false); // Hide form when selecting an existing address
              }}
            >
              {addr.street}, {addr.city}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">
          {selectedAddress
            ? isEditing
              ? "Edit Address"
              : "Address Details"
            : showForm
            ? "Add New Address"
            : "Select an Address"}
        </h2>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={address.phoneNumber}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">House No</label>
              <input
                type="text"
                name="houseNo"
                value={address.houseNo}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Street</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">District</label>
              <input
                type="text"
                name="district"
                value={address.district}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Country</label>
              <Select
                options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                onChange={handleCountryChange}
                value={
                  address.country
                    ? {
                        value: countries.find(
                          (country) => country.name === address.country
                        )?.isoCode,
                        label: address.country,
                      }
                    : null
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">State</label>
              <Select
                options={states.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
                onChange={handleStateChange}
                value={
                  address.state
                    ? {
                        value: states.find(
                          (state) => state.name === address.state
                        )?.isoCode,
                        label: address.state,
                      }
                    : null
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <Select
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                onChange={handleCityChange}
                value={
                  address.city
                    ? {
                        value: address.city,
                        label: address.city,
                      }
                    : null
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2"
              >
                Delete Address
              </button>
            )}
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          </form>
        ) : (
          selectedAddress && (
            <AddressDisplay address={selectedAddress} />
          )
        )}
      </div>
    </div>
  );
};

export default AddressForm;
