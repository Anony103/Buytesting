import api from "./server";

export const healthz = async () => await api.get("/healthz");

// SHARED API

export const sendOTP = async (data) => await api.post("/user/auth/otp/generate", data);

export const validateOTP = async (data) => await api.post("/user/validateotp", data);

export const sendResetPasswordLink = async (data) => await api.post("/user/auth/reset-password-link/generate", data);

export const validateResetPasswordLink = async (data) => await api.post("/user/auth/reset-password-link/validate", data);

export const uploadImages = async (data, headers) => await api.post("/product/uploadimage", data, { headers: headers });


// BUYER API
export const buyerLogin = async (data) => await api.post("/login", data);

export const buyerSignup = async (data) => await api.post("/user", data);

export const buyerChangePassword = async (data, headers) => await api.patch("/user/auth/password/change", data, { headers: headers });

export const buyerResetPassword = async (data) => await api.patch("/user/auth/password/reset", data);

export const buyerProfile = async (data) => await api.get("/user", data);

export const buyerUpdateProfile = async (data, headers) => await api.patch("/user/auth/profile", data, { headers: headers });


// Seller API

export const sellerLogin = async (data) => await api.post("/login", data);

export const sellerSignup = async (data) => await api.post("/user", data);

export const sellerChangePassword = async (data, headers) => await api.patch("/seller/auth/change-password", data, { headers: headers });

export const sellerVerifyAccount = async (data) => await api.patch("/seller/auth/verify-account", data);

export const sellerProfile = async (data) => await api.get("/seller/auth/me", data);

export const sellerResetPassword = async (data) => await api.patch("/seller/auth/reset-password", data);

export const sellerResendOTP = async (data) => await api.post("/seller/auth/resend-otp", data);

export const sellerUpdateProfilePicture = async (data, headers) => await api.patch("/seller/auth/upload-image", data, { headers: headers });

export const sellerUpdateProfile = async (data, headers) => await api.patch("/seller/auth/update-seller-profile", data, { headers: headers });

export const sellerCreateProduct = async (data, headers) => await api.post("/product", data, { headers: headers });

export const sellerGetAllProducts = async (headers,param) => await api.get("/product", { headers: headers,

    params:param
 });
export const sellerUpdateProduct = async (id, data, headers) => await api.post(`/product/${id}`, data, { headers: headers });


export const getAllProducts = async () => await api.get("/product");
export const getProductById = async (id) => await api.get(`/product/id/${id}`);
export const getCategories = async (id) => await api.get(`/product/category/${id}`);
export const getProductsBySellerId = async (id) => await api.get(`/product/seller/${id}`);
export const SearchProduct = async (productName) => await api.get(`/product`, { params: { productName } });
export const getUserDetails = async (headers) =>  await api.get("/user", { headers: headers});;



// Agent API

export const agentLogin = async (data) => await api.post("/login", data);

export const agentForgotPassword = async (urlParam) => await api.post(`/agent/auth/forgot-password?email=${urlParam}`);

export const agentVerifyAccount = async (data, headers) => await api.post("/agent/auth/verify-token", data, { headers: headers });

export const agentResetPassword = async (data, headers) => await api.post("/agent/auth/reset-password", data, { headers: headers });

export const agentInviteSeller = async (data, headers) => await api.post("/agent/seller/invite-seller", data, { headers: headers });

export const agentCreateSeller = async (data, headers) => await api.post("/user/agentseller", data, { headers: headers });

export const agentGetAllSellers = async (urlParam, headers) => await api.get(`/agent/seller/all-sellers?${urlParam}`, { headers: headers });

export const agentSellerById = async (urlParam, headers) => await api.get(`/agent/seller/single-sellers?${urlParam}`, { headers: headers });

export const agentEditSeller = async (data, urlParam, headers) => await api.patch(`/agent/seller/edit-seller/${urlParam}`, data, { headers: headers });

export const agentDeleteSeller = async (urlParam, headers) => await api.delete(`/agent/seller/delete-seller?${urlParam}`, { headers: headers });


// Admin API

export const adminLogin = async (data) => await api.post("/login", data);

export const adminProfile = async (data, headers) => await api.get("/admin/auth/my-profile", data, { headers: headers });

export const adminDashboard = async (headers) => await api.get("/user/admindash", { headers: headers });

export const adminGetALlBuyer = async (headers) => await api.get("/user/admindash", { headers: headers });

export const adminGetOneBuyer = async (urlParam, headers) => await api.get(`/admin/buyer/single?userId=${urlParam}`, { headers: headers });

export const adminGetAllSellers = async (headers) => await api.get("/user/admindash", { headers: headers });

export const adminGetOneSeller = async (urlParam, headers) => await api.get(`/admin/seller/single-seller?sellerId=${urlParam}`, { headers: headers });

export const adminDeactivateSeller = async (urlParam, headers) => await api.delete(`/admin/seller/deactivate-seller?sellerId=${urlParam}`, { headers: headers });

export const adminGetAllCategory = async (headers) => await api.get("/category");

export const adminCreateCategory = async (data, headers) => await api.post("/category", data, { headers: headers });

export const adminEditCategory = async (data, urlParam, headers) => await api.patch(`/category/${urlParam}`, data, { headers: headers });

export const adminToggleCategory = async (urlParam,data, headers) => await api.patch(`/category/${urlParam}`, data, { headers: headers });

export const adminCreateAgent = async (data, headers) => await api.post("/user/agent", data, { headers: headers });

export const adminGetAllAgents = async (headers) => await api.get("/user/admindash", { headers: headers });

export const getUserByAgent = async (headers) => await api.get(`/user/agent`, { headers: headers });
export const getAllSubscription = async (urlParam) => await api.get(`/subscription${urlParam}`);