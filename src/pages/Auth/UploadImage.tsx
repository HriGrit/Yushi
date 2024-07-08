// import React, { useEffect } from 'react';
// import { toast, Toaster } from 'react-hot-toast';
// import { ref, uploadBytesResumable, UploadTask, uploadString } from 'firebase/storage';
// import { storage } from '../../utils/firebase';
// import { redirect, redirectDocument } from 'react-router-dom';
// import { database } from '../../utils/firebase';
// import { ref as dbref, onValue, set } from 'firebase/database';

// import { useNavigate } from 'react-router-dom';

// interface UploadImageProps {
//     user: any;
// }

// const UploadImage: React.FC<UploadImageProps> = ({ user }) => {
//     const [image, setImage] = React.useState<any>(null);
//     const [imageUrl, setImageUrl] = React.useState<string | null>(null);
//     const removeSpaces = (str: string): string => {
//         return str.replace(/\s+/g, '');
//     };
//     const [name, setName] = React.useState<string>(removeSpaces(user.displayName));
//     const [error, setError] = React.useState<any>(null);

//     const navigate = useNavigate();

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files![0];
//         if (!(file && file.type.startsWith('image/'))) {
//             toast.error('Please upload an image');
//             return;
//         } else {
//             if (file.size > 5000000) {
//                 toast.error('File size should be less than 5MB');
//                 return;
//             }
//         }
//         setImage(file);
//         setImageUrl(URL.createObjectURL(file));
//     }

//     const handleCancel = () => {
//         setImage(null);
//         setImageUrl(null);
//     }

//     const writeUserData = (userId: string, name: string, email: string, imageUrl: string) => {
//         const usernameRef = dbref(database, `users/${name}`);
//         onValue(usernameRef, (snapshot) => {
//             if (snapshot.exists())
//                 console.log(snapshot.val());
                
//         })
        
//         set(dbref(database, `users/${userId}`), {
//             username: name,
//             email: email,
//             profile_picture: imageUrl
//         }).then(() => {
//             // navigate('/dashboard');
//         }).catch((error) => {
//             console.error('Error writing user data: ', error);
//         });
//     }

//     const handleUpload = async (e: any) => {
//         e.preventDefault(); 
        
//         if (!image){
//             writeUserData(user.id, name, user.email, user.photoURL);
//             return;
//         }

//         const storageRef = ref(storage, `images/${user?.uid}`);
//         const uploadTask: UploadTask = uploadBytesResumable(storageRef, image);

//         await new Promise<void>((resolve, reject) => {
//             uploadTask.on('state_changed',
//                 (snapshot: any) => {
//                     const amount = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     toast(() => {
//                         return <span>Uploading {Math.round(amount)}% done</span>;
//                     }, { position: 'bottom-center' });
//                 },
//                 (error: any) => {
//                     toast.error('Upload failed: ' + error.message);
//                     reject(error);
//                 },
//                 () => {
//                     toast.success('Upload successful!');
//                     writeUserData(user.uid, name, user.email, imageUrl);
//                     redirect('/dashboard');
//                     resolve();
//                 }
//             );
//         });
//     }

//     const handleUploadClick = () => {
//         const fileUpload = document.getElementById('file-upload');
//         if (fileUpload) {
//             fileUpload.click();
//         }
//     };

//     const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newName = e.target.value;
//         const regex = /^[a-zA-Z0-9_]+$/; // Alphanumeric characters and underscores

//         if (!regex.test(newName)) {
//             setError('Username must not contain spaces or special characters.');
//         } else {
//             setError("");
//             setName(newName);
//         }
//     }

//     useEffect(() => {
//         return () => {
//             // Cleanup if necessary
//         }
//     }, [])

//     return (
//         <div className="text-center">
//             <Toaster />
//             <p className="text-2xl font-semibold">Welcome, {user ? user.displayName : "null"}</p>
//             <div className='my-4 flex flex-col gap-2'>
//                 <p className='text-sm'>This is your public username</p>
//                 <div className='flex flex-col gap-4'>
//                     <div className='flex gap-2'>
//                         <label className="text-lg my-auto">Username</label>
//                         <input type="text" onChange={handleUserName} className="border-2 rounded-lg w-full p-1" placeholder={name ? name : "Enter a Name"} />
//                     </div>
//                     {error && <p className='bg-red-500 text-white font-bold rounded-full p-1'>Can not use Special Characters</p>}
//                 </div>
//             </div>
//             <div className='cursor-pointer' onClick={handleUploadClick}>
//                 {imageUrl ? (
//                     <img src={imageUrl} alt="Uploaded Image" className='w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full' />
//                 ) : (
//                     <img src={user ? user.photoURL : "../../assets/Logo.webp"} alt="Google DP" className='w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full' />
//                 )}
//             </div>
//             <p className='text-xl'>Would You like to keep this image or would you like to change it?</p>
//             <input id='file-upload' type='file' onChange={handleFileChange} className='hidden' />
//             <div className='flex justify-center gap-8'>
//                 <label className='text-neutral-500 font-bold my-2 text-center cursor-pointer flex w-full gap-4'>
//                     <button id="btn1" onClick={handleUploadClick} className='bg-primary-400 hover:bg-primary-600 w-1/2 rounded-lg px-4 py-2'>Select Photo</button>
//                     <button id="btn2" onClick={handleUpload} className='bg-primary-400 hover:bg-primary-600 w-1/2 rounded-lg px-4 py-2'>Upload Photo</button>
//                 </label>
//                 {imageUrl && (
//                     <button onClick={handleCancel} className='bg-theme text-neutral-500 font-bold my-2 bg-primary-400 hover:bg-primary-600 w-full rounded-lg px-4 py-2 text-center cursor-pointer'>
//                         Cancel
//                     </button>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default UploadImage;
import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { database } from '../../utils/firebase';
import { ref as dbref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

interface UploadImageProps {
    user: any;
}

const UploadImage: React.FC<UploadImageProps> = ({ user }) => {
    const [image, setImage] = React.useState<any>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string>(user.displayName.replace(/\s+/g, ''));
    const [error, setError] = React.useState<string | null>(null);

    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (!(file && file.type.startsWith('image/'))) {
            toast.error('Please upload an image');
            return;
        }
        if (file.size > 5000000) {
            toast.error('File size should be less than 5MB');
            return;
        }
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleCancel = () => {
        setImage(null);
        setImageUrl(null);
    };

    const writeUserData = async (userId: string, name: string, email: string, imageUrl: string) => {
        try {
            const usernameRef = dbref(database, `users/${userId}`);
            const snapshot = await get(usernameRef);
            if (snapshot.exists()) {
                toast.error('Username already exists!');
                return;
            }

            await set(dbref(database, `users/${userId}`), {
                username: name,
                email: email,
                profile_picture: imageUrl,
            });
            navigate('/dashboard');
        } catch (error: any) {
            toast.error('Error writing user data: ' + error.message);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            writeUserData(user.uid, name, user.email, user.photoURL);
            return;
        }

        const storageRef = ref(storage, `images/${user?.uid}`);
        const uploadTask: UploadTask = uploadBytesResumable(storageRef, image);

        await new Promise<void>((resolve, reject) => {
                        uploadTask.on('state_changed',
                            (snapshot: any) => {
                                const amount = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                toast(() => {
                                    return <span>Uploading {Math.round(amount)}% done</span>;
                                }, { position: 'bottom-center' });
                            },
                            (error: any) => {
                                toast.error('Upload failed: ' + error.message);
                                reject(error);
                            },
                            () => {
                                toast.success('Upload successful!');
                                writeUserData(user.uid, name, user.email, imageUrl || user.photoURL);
                                navigate('/dashboard');
                                resolve();
                            }
                        );
                    });
    };

    const handleUploadClick = () => {
        const fileUpload = document.getElementById('file-upload');
        if (fileUpload) {
            fileUpload.click();
        }
    };

    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!regex.test(newName)) {
            setError('Username must not contain spaces or special characters.');
        } else {
            setError(null);
            setName(newName);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup if necessary
        };
    }, []);

    return (
        <div className="text-center">
            <Toaster />
            <p className="text-2xl font-semibold">Welcome, {user ? user.displayName : 'null'}</p>
            <div className="my-4 flex flex-col gap-2">
                <p className="text-sm">This is your public username</p>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <label className="text-lg my-auto">Username</label>
                        <input
                            type="text"
                            onChange={handleUserName}
                            value={name}
                            className="border-2 rounded-lg w-full p-1"
                            placeholder="Enter a Name"
                        />
                    </div>
                    {error && <p className="bg-red-500 text-white font-bold rounded-full p-1">{error}</p>}
                </div>
            </div>
            <div className="cursor-pointer" onClick={handleUploadClick}>
                {imageUrl ? (
                    <img src={imageUrl} alt="Uploaded Image" className="w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full" />
                ) : (
                    <img src={user ? user.photoURL : '../../assets/Logo.webp'} alt="Google DP" className="w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full" />
                )}
            </div>
            <p className="text-xl">Would you like to keep this image or would you like to change it?</p>
            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
            <div className="flex justify-center gap-8">
                <label className="text-neutral-500 font-bold my-2 text-center cursor-pointer flex w-full gap-4">
                    <button id="btn1" onClick={handleUploadClick} className="bg-primary-400 hover:bg-primary-600 w-1/2 rounded-lg px-4 py-2">
                        Select Photo
                    </button>
                    <button id="btn2" onClick={handleUpload} className="bg-primary-400 hover:bg-primary-600 w-1/2 rounded-lg px-4 py-2">
                        Upload Photo
                    </button>
                </label>
                {imageUrl && (
                    <button onClick={handleCancel} className="bg-theme text-neutral-500 font-bold my-2 bg-primary-400 hover:bg-primary-600 w-full rounded-lg px-4 py-2 text-center cursor-pointer">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default UploadImage;