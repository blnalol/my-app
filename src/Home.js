// pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase-config';

function Home() {
  const navigate = useNavigate();
  const goToAbout = () => navigate('/about');
  const goToContact = () => navigate('/contact');

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const usersCollectionRef = collection(db, "users");

  const uploadImage = async (file) => {
    try {
      // Create a storage reference
      const storageRef = ref(storage, `fyptestupload/${file.name}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('Uploaded a file successfully! File URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Event handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Function to handle the file upload button click
  const handleUploadClick = async () => {
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        // Add a new user document with the image URL
        await addDoc(usersCollectionRef, {
          email: newEmail,
          password: newPassword,
          role: newRole,
          imageUrl: imageUrl // Store the image URL in Firestore
        });
        console.log('User created with image URL:', imageUrl);
      }
    } else {
      console.log('No file selected for upload');
    }
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      email: newEmail,
      password: newPassword,
      role: newRole
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Test</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload Image</button>
      <button onClick={goToAbout}>Go to About</button>
      <button onClick={goToContact}>Go to Contact</button>
      <input
        placeholder="Email..."
        onChange={(event) => setNewEmail(event.target.value)}
      />
      <input
        placeholder="Password..."
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <input
        placeholder="Role..."
        onChange={(event) => setNewRole(event.target.value)}
      />
      <button onClick={createUser}>Create User</button>

      {users.map((user) => (
        <div key={user.id}>
          <h1>Email: {user.email}</h1>
          <h1>Password: {user.password}</h1>
          <h1>Role: {user.role}</h1>
          <h1>ImageUrl:{user.imageUrl}</h1>
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="User"
              style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
            />
          )}
          <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default Home;

 {/* if using navbar

    import React from 'react';

function Home() {
  return <h1>Home Page</h1>;
}

export default Home;

    */}