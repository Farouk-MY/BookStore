import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';


const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };
        
        try {
            await createOrder(newOrder).unwrap();
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#f0c041',
                color: '#1a1a1a'
            });

            Toast.fire({
                icon: 'success',
                title: 'Order placed successfully! 📚'
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to place your order. Please try again.',
                confirmButtonColor: '#f0c041'
            });
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <div className="container max-w-screen-xl mx-auto p-6">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-amber-900 mb-2">
                        BeeStore Checkout
                    </h1>
                    <div className="flex items-center justify-center space-x-2 text-amber-700">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3L4 9v12h16V9l-8-6zm0 2.7L17.5 10H6.5L12 5.7z"/>
                        </svg>
                        <span className="text-lg">{cartItems.length} books in your honeycomb</span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Checkout Form */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-xl border border-amber-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl text-amber-900 font-semibold">Shipping Details</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">Full Name</label>
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.name ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="Jane Austen"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">Email</label>
                                    <input
                                        type="email"
                                        disabled
                                        defaultValue={currentUser?.email}
                                        className="w-full px-4 py-2 border border-amber-200 rounded-lg bg-amber-50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-amber-900">Phone Number</label>
                                <input
                                    {...register("phone", { 
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9+-]+$/,
                                            message: "Please enter a valid phone number"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                        errors.phone ? 'border-red-500' : 'border-amber-200'
                                    }`}
                                    placeholder="+1 (234) 567-8900"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">Address</label>
                                    <input
                                        {...register("address", { required: "Address is required" })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.address ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="123 Bookworm Lane"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">City</label>
                                    <input
                                        {...register("city", { required: "City is required" })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.city ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="Libraryville"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">Country</label>
                                    <input
                                        {...register("country", { required: "Country is required" })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.country ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="Country"
                                    />
                                    {errors.country && (
                                        <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">State</label>
                                    <input
                                        {...register("state", { required: "State is required" })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.state ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="State"
                                    />
                                    {errors.state && (
                                        <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-amber-900">ZIP Code</label>
                                    <input
                                        {...register("zipcode", { 
                                            required: "ZIP code is required",
                                            pattern: {
                                                value: /^\d{5}(-\d{4})?$/,
                                                message: "Please enter a valid ZIP code"
                                            }
                                        })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                            errors.zipcode ? 'border-red-500' : 'border-amber-200'
                                        }`}
                                        placeholder="12345"
                                    />
                                    {errors.zipcode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.zipcode.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                                />
                                <label className="text-sm text-amber-700">
                                    I agree to the{' '}
                                    <Link className="text-amber-600 hover:text-amber-700 underline">
                                        Terms & Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link className="text-amber-600 hover:text-amber-700 underline">
                                        Shopping Policy
                                    </Link>
                                </label>
                            </div>

                            <button
                                disabled={!isChecked}
                                className="w-full py-3 px-6 text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Complete Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-xl border border-amber-200 p-6 h-fit">
                        <div className="mb-6">
                            <h2 className="text-2xl text-amber-900 font-semibold">Order Summary</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 py-2 border-b border-amber-100">
                                    <div className="w-12 h-16 bg-amber-100 rounded flex items-center justify-center">
                                        📚
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-amber-900">{item.title}</h3>
                                        <p className="text-sm text-amber-600">${item.newPrice}</p>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="pt-4 border-t border-amber-200">
                                <div className="flex justify-between text-lg font-medium text-amber-900">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <p className="text-sm text-amber-600 mt-2">
                                    Free shipping on orders over $50
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;