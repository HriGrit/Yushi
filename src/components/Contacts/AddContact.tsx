import React from 'react'

const AddContact = () => {
    const [email, setEmail] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleAddContact = () => {
        // send data
        console.log(email);
    }
    
    const handleReset = () => {
        setEmail('');
    }

  return (
    <div>
        <h1>AddContacts</h1>
        <p>Add a contact by email</p>
        <div className="flex gap-4">
            <input type="text" placeholder="Email" value={email} onChange={handleChange} />
            <button onClick={handleAddContact}>Add</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}

export default AddContact