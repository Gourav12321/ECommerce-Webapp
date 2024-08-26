import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

const AddressDisplay = ({ address, onEdit, onDelete, onCancel, isEditing, onSave }) => {
  const [editedAddress, setEditedAddress] = useState(address);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(editedAddress.countryCode);
  const cities = City.getCitiesOfState(editedAddress.countryCode, editedAddress.stateCode);

  const handleChange = (e) => {
    setEditedAddress({
      ...editedAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      country: selectedOption.label,
      countryCode: selectedOption.value,
      state: '',
      stateCode: '',
      city: '',
    });
  };

  const handleStateChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      state: selectedOption.label,
      stateCode: selectedOption.value,
      city: '',
    });
  };

  const handleCityChange = (selectedOption) => {
    setEditedAddress({
      ...editedAddress,
      city: selectedOption.label,
    });
  };

  const handleSave = () => {
    onEdit(editedAddress);
    onSave(editedAddress);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Address</h2>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedAddress.phoneNumber}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">House No</label>
            <input
              type="text"
              name="houseNo"
              value={editedAddress.houseNo}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Street</label>
            <input
              type="text"
              name="street"
              value={editedAddress.street}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={editedAddress.landmark}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">District</label>
            <input
              type="text"
              name="district"
              value={editedAddress.district}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Country</label>
            <Select
              options={countries.map((country) => ({
                label: country.name,
                value: country.isoCode,
              }))}
              onChange={handleCountryChange}
              value={{
                label: editedAddress.country,
                value: editedAddress.countryCode,
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">State</label>
            <Select
              options={states.map((state) => ({
                label: state.name,
                value: state.isoCode,
              }))}
              onChange={handleStateChange}
              value={{
                label: editedAddress.state,
                value: editedAddress.stateCode,
              }}
              isDisabled={!editedAddress.countryCode}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <Select
              options={cities.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
              onChange={handleCityChange}
              value={{ label: editedAddress.city, value: editedAddress.city }}
              isDisabled={!editedAddress.stateCode}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={editedAddress.pincode}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Address Details</h2>
          <p><strong>Phone Number:</strong> {address.phoneNumber}</p>
          <p><strong>House No:</strong> {address.houseNo}</p>
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>Landmark:</strong> {address.landmark}</p>
          <p><strong>District:</strong> {address.district}</p>
          <p><strong>Country:</strong> {address.country}</p>
          <p><strong>State:</strong> {address.state}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>Pincode:</strong> {address.pincode}</p>
          <button
            onClick={() => onEdit(address)}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Edit Address
          </button>
          <button
            onClick={() => onDelete(address._id)}
            className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressDisplay;
