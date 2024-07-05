import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast'
import { storage } from '../../utils/firebase';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { Navigate } from 'react-router-dom';

interface UploadImageProps {
        user: any;
}

const UploadImage: React.FC<UploadImageProps> = ({user}) => {
    const [image, setImage] = React.useState<any>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [progress, setProgress] = React.useState<number | null>(0);
    console.log(progress);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (!(file && file.type.startsWith('image/'))) {
            toast.error('Please upload an image');
            return;
        } else{
            if (file.size > 5000000) {
                toast.error('File size should be less than 5MB');
                return;
            }
        }
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const handleCancel = () => {
        setImage(null);
        setImageUrl(null);
    }

    const handleUpload = async(e: any) => {
        e.preventDefault();
        if (!image) {
            handleUploadClick();
            return;
        }

        const storageRef = ref(storage, `images/${user?.uid}`);

        const uploadTask: UploadTask = uploadBytesResumable(storageRef, image);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot: any) => {
                    const amount = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(amount);
                toast((t) => {
                    console.log(t);
                    
                    position: 'top-right'; 
                    return <span>
                        Uploading {Math.round(amount)}% done
                    </span>;
                })
            },
            (error: any) => {
              toast.error('Upload failed: ' + error.message);
              setProgress(0);
              reject(error);
            },
            () => {
              toast.success('Upload successful!');
              setProgress(100);
              console.log("success");
              <Navigate to='/dashboard' />
              resolve();
            }
          );
        });
    }
    

    const handleUploadClick = () => {
        const fileUpload = document.getElementById('file-upload');
        if (fileUpload) {
            fileUpload.click();
        }
    };


    useEffect(() => {        
        return () => {
            // console.log('Unmounted');
        }
    }, [])
    
    return (
        <div className="text-center">
            <Toaster />
            <p className="text-2xl font-semibold">Welcome, {user ? user.displayName  : "null"}</p>
            {/* <img src={user?.user.photoURL} alt="Profile" className="rounded-full w-24 h-24 mx-auto mt-4" /> */}
            <div className='cursor-pointer' onClick={handleUploadClick}>
                    {imageUrl ? (
                        <img src={imageUrl} alt="Uploaded Image" className='w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full' />
                    ) : (
                        <img src={user ? user.photoURL  : "../../assets/Logo.webp"} alt="Google DP" className='w-[150px] h-[150px] mx-auto my-6 object-cover rounded-full' />
                    )}
            </div>
            <p className='text-xl'>Would You like to keep this image or would you like to change it?</p>
            <div className='flex justify-center gap-8'>
                <label className='bg-theme text-neutral-500 font-bold my-2 bg-primary-400 hover:bg-primary-600 w-full rounded-lg px-4 py-2 text-center cursor-pointer'>
                    <button onClick={handleUpload}>{!imageUrl ? "Select Photo" : "Upload Photo"}</button>
                    <input id='file-upload' type='file' onChange={handleFileChange} className='hidden' />
                </label>
                {imageUrl && (
                    <button onClick={handleCancel} className='bg-theme text-neutral-500 font-bold my-2 bg-primary-400 hover:bg-primary-600 w-full rounded-lg px-4 py-2 text-center cursor-pointer'>
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default UploadImage