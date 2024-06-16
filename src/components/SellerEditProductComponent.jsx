import InputField from "./InputFieldComponents";
import { useNavigate, useParams } from "react-router-dom";
import StateAndLgaData from "../api/data.json";
import { useEffect, useState } from "react";
import WYSIWYG from "./WYSIWYG";
import ProductMediaImg from "../assets/product-media-icon.png"
import CustomButton from "./CustomButton";
import SpecificationForm from "./AddSpecificationButton";
import { appStore, authStore } from "../store";
import { sellerCreateProduct, uploadImages } from "../api";
import { toastSuccess, toastError } from "../utils/constants";
import toast from 'react-hot-toast';
import { currencyFormat } from "../utils/helpers";
import api from "../api/server";
import { getProductById, sellerUpdateProduct } from "../api";




const SellerEditProductComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const categories = [{name: "Select a category", status: true}, ...auth.storeData.categories ]|| [];

    const goBack = () => {
      navigate(-1);
    };

    const [categoryNames, setCategoryNames] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [category] = useState(categories.filter(category => category.status !== false).map((category) => {
        return {
            value: category.id,
            label: category.name
        }
    }));

    const [productData, setProductData] = useState({
        productCategory: "",
        productSubCategory: "",
        name: "",
        shortDescription: "",
        longDescription: "",
        price: "",
        productMedia: [],
        specifications: [],
    });

    const [productMedia, setProductMedia] = useState(
        {
            file1: null,
            file2: null,
            file3: null,
            file4: null
        }
    );

    const [processedImages, setProcessedMedia] = useState([]);

    const formattedPrice = currencyFormat(productData.price).split('.')[0];

    const setProductMediaData = (data) => {
        setProductData({
            ...productData,
            productMedia: data
        });
    }

    useEffect(() => {
        // Fetch product details based on productId and populate productData state
        const fetchProductDetails = async () => {
            try {
                const product = await getProductById(id);
                setProductData(product);
                setSpecifications(product.specifications || []);
                const categoryNames = product.categories.map((item) => item.name);
                setCategoryNames(categoryNames);
                // console.log(product);
            } catch (error) {
                console.error("Error fetching product details:", error);
                // Handle error if needed
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleProfileImageChange = async (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setProductMedia(prevProductMedia => ({
            ...prevProductMedia,
            [name]: file
        }));

        let updatedState = {
            ...productMedia,
            [name]: file
        }

        if (Object.values(updatedState).every(image => image === null)) {
            toast('Please upload at least one image', toastError);
            return;
        }

        const images = Object.values(updatedState).filter(image => image !== null);
        const base64Images = images.map(image => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    reader.onloadend = null;
                    reader.onerror = null;
                    resolve(reader.result);
                };

                reader.onerror = error => {
                    reader.onloadend = null;
                    reader.onerror = null;
                    reject(error);
                };

                reader.readAsDataURL(image);
            });
        });

        let processedImages = await Promise.all(base64Images).then(results => {
            return results;
        }).catch(error => {
            return false;
        });

        if (!processedImages) {
            toast('An error occurred while uploading images', toastError);
            // clear the image input
            setProductMedia({
                file1: null,
                file2: null,
                file3: null,
                file4: null
            });
            return;
        }else{
            setProductMediaData(processedImages);
        }

    }

    const setCurrentCategory = (category) => {
        setProductData({
            ...productData,
            productCategory: category
        });
    }

    const setCurrentSubCategory = (subCategory) => {
        setProductData({
            ...productData,
            productSubCategory: subCategory
        });
    }

    const handleProductData = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }

    const setLongDescription = (data) => {
        setProductData({
            ...productData,
            longDescription: data
        });
    }

    const setSpecificationData = (data) => {
        setProductData({
            ...productData,
            specifications: data
        });
    }

    const [specifications, setSpecifications] = useState([]);

    const addSpecification = () => {
        setSpecifications([...specifications, { id: Date.now(), name: '', value: '' }]);
    };

    const removeSpecification = (idToRemove) => {
        setSpecifications(prevSpecifications => {
            const updatedSpecifications = prevSpecifications.filter(specification => specification.id !== idToRemove);
            setSpecificationData(updatedSpecifications);
            return updatedSpecifications;
        });
    };

   const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setSpecifications(prevSpecifications => {
            const updatedSpecifications = prevSpecifications.map(specification =>
                specification.id === id ? { ...specification, [name]: value } : specification
            );
            setSpecificationData(updatedSpecifications);
            return updatedSpecifications;
        });
    };

    function validateProductData(data, options = {}, replacements = {}) {
        let errorShown = false;

        Object.entries(data).forEach(([key, value]) => {
            if (options.skip && options.skip.includes(key)) {
                return;
            }

            const displayName = replacements[key] || key;

            if (value === "") {
                if (!errorShown) {
                    toast(`${displayName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} is required`, toastError);
                    errorShown = true;
                }
            } else if (Array.isArray(value) && value.length === 0) {
                if (!errorShown) {
                    toast(`At least one ${displayName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} is required`, toastError);
                    errorShown = true;
                }
            }
        });

        return !errorShown;
    }
    

    const uploadImagesCustom = async () => {
        const fileUrls = [];
        for (const key in productMedia) {
            if (productMedia.hasOwnProperty(key) && productMedia[key] !== null) {
                try {
                    const formData = new FormData();
                    formData.append('file', productMedia[key]);
    
                    const response = await api.post('/product/uploadimage', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
    
                    fileUrls.push(response.fileUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    // Handle error if needed
                }
            }
        }
        console.log('Uploaded file URLs:', fileUrls);
        return fileUrls
       
        // Do something with fileUrls, like updating state
    };
    
   
    

    const handleUpdateProductSubmit = async (id) => {

        // let isAllDataChecked = validateProductData(id.productData, {
        //     skip: ['productSubCategory']
        // }, {
        //     name: "product name"
        // });
        
        // if (!isAllDataChecked) return;
        console.log(productData);

        app.startLoader();
        let uris=await uploadImagesCustom()
        console.log(`the uris posted ======
            ====${JSON.stringify(uris)}`)
            
        await sellerUpdateProduct(
            id
            ,{
            userId:auth.user.userId,
            name:productData.name,
            basePrice:parseInt(productData.price),
            description:productData.longDescription,
            shortDescription:productData.shortDescription,
            longDescription:productData.longDescription,
            picture:uris,
            categories:[productData.productCategory],
            specifications:productData.specifications


        }, { Authorization: `Bearer ${auth.user.token}` }).then(response => {
            toast('Product Created', toastSuccess);
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        }).catch(e => {
            throw Error(e.message);
        }).finally(() => {
                app.stopLoader();
            });

    }

    return ( 
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-2 items-center">
                <i class='bx bx-arrow-back text-[2rem]' onClick={goBack}></i>
                <h1 className="font-semibold text-[1.5rem] text-[#000]">Edit Product</h1>
            </div>
            <div className="flex justify-center w-full h-full">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex justify-center items-center py-5 px-7 rounded-[10px] border-[1px] border-[#848484]">
                        <div className="w-full flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-x-20 w-full">
                                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                    <InputField
                    label={<p className="text-[#161616]">Product Category</p>}
                    name="productCategory"
                    type="select"
                    value={categoryNames}
                    options={category}
                    required
                    selected={(selectedData) => {
                        setCurrentCategory(selectedData);
                        categories.map((category) => {
                            if (category.name === selectedData) {
                                if (category.subCategory) {
                                    setSubCategories([
                                        {
                                            value: "",
                                            label: "Select a sub category",
                                        },
                                        {
                                            value: category.subCategory,
                                            label: category.subCategory,
                                        },
                                    ]);
                                } else {
                                    setSubCategories([]);
                                }
                            }
                        });
                    }}
                />
                                </div>
                                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] w-full">
                                    <InputField  label={<p className="text-[#161616]">Sub Category <i className="font-light text-">(Optional)</i></p>} name="productSubCategory" type="select" options={subcategories} required selected={(selectedData) => {
                                        setCurrentSubCategory(selectedData);
                                    }} />
                                </div>
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Product Name"  value={productData.name} name="name" placeholder="Enter product name..." type="text" onChange={(e) => handleProductData(e)} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <label className="text-[.6rem] md:text-[1rem]">Short Description</label>
                                <textarea name="shortDescription"  value={productData.shortDescription} placeholder="Write a short description..." className="rounded-[10px] border-[1px] border-[#848484] p-5" id="" rows="5" onChange={(e) => handleProductData(e)}></textarea>
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <label className="text-[.6rem] md:text-[1rem]">Long Description</label>
                                <WYSIWYG value={productData.longDescription} getContent={(typedData) => setLongDescription(typedData)}/>
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label={`Product Price: ${formattedPrice}`} value={productData.basePrice} name="price" placeholder="Enter product price" type="text" onChange={(e) => {
                                    if (isNaN(e.target.value)) {
                                        toast('Price must be a number', toastError);
                                        return;
                                    }else{
                                        handleProductData(e);
                                    }
                                }} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <label className="text-[.6rem] md:text-[1rem]">Product Media</label>
                                <div className="w-[80%] grid grid-cols-4 gap-x-5">
                                    {
                                        Object.entries(productMedia).map(([key, value]) => {
                                            return (
                                                <div key={key} onClick={(e) => {
                                                    document.querySelector([`input[name=${key}]`]).click();
                                                }} className="cursor-pointer border-[1px] border-[#D0D5DD] border-dashed rounded-[10px] h-[200px] px-5 flex flex-col gap-3 justify-center items-center">
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} name={key} />
                                                    <div className="">
                                                        <img src={value ? URL.createObjectURL(value) : ProductMediaImg} alt=""  className="object-contain"/>
                                                    </div>
                                                    {!value && <p className="text-[#848484] text-xs text-center">Click to upload or update an image</p>}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="w-[60%]">
                                <button onClick={addSpecification} className='flex items-center gap-5'>Add Specification <i class='bx bx-plus text-[#00753E] text-[1.5rem]'></i></button>
                                {specifications.map((specification) => (
                                    <div className='flex flex-col gap-2 mt-4' key={`${specification.id}`}>
                                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[70%]">
                                            <InputField label="" name="name" value={specification.name} placeholder="Title" type="text" onChange={(e) => {
                                                handleInputChange(e,specification.id)
                                            }} />
                                        </div>
                                        <div className="input-box flex items-center gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                            <div className="w-[70%]">
                                                <InputField label="" name="value" value={specification.value} placeholder="Text" type="text" onChange={(e) => {
                                                    handleInputChange(e,specification.id)
                                                }} />
                                            </div>
                                            <CustomButton buttonText="X" btnClassName="bg-[#ff3030] text-[#FFF] rounded-[15px] border-[1px] border-[#00753E] lg:rounded-[10px] flex justify-center items-center w-[10px] lg:py-2 lg:-mb-2" onClick={() => removeSpecification(specification.id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-32 flex justify-end items-center">
                                <CustomButton buttonText="Update Product" btnClassName="bg-[#00753E] text-[#FFF] rounded-[10px] border-[1px] border-[#00753E] lg:rounded-[10px] flex justify-center items-center lg:py-2 lg:-mb-2" onClick={() => handleUpdateProductSubmit(id)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SellerEditProductComponent;