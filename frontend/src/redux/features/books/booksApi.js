import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),

        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),

        addBook: builder.mutation({
            query: (formData) => {
                // Check if the input is FormData (for image uploads) or regular JSON
                const isFormData = formData instanceof FormData;
                
                return {
                    url: `/create-book`,
                    method: "POST",
                    body: formData,
                    // Don't set Content-Type for FormData, let the browser handle it
                    headers: isFormData ? {} : {
                        'Content-Type': 'application/json'
                    }
                };
            },
            // Transform the response if needed
            transformResponse: (response) => {
                if (response.book) {
                    // Ensure the image URL is properly formatted
                    const imageUrl = response.book.coverImage
                        ? `${getBaseUrl()}/api/books/image/${response.book.coverImage}`
                        : null;
                    return {
                        ...response,
                        book: {
                            ...response.book,
                            imageUrl
                        }
                    };
                }
                return response;
            },
            invalidatesTags: ["Books"]
        }),

        updateBook: builder.mutation({
            query: ({ id, ...rest }) => {
                const isFormData = rest instanceof FormData;
                
                return {
                    url: `/edit/${id}`,
                    method: "PUT",
                    body: rest,
                    headers: isFormData ? {} : {
                        'Content-Type': 'application/json'
                    }
                };
            },
            // Transform response similar to addBook if needed
            transformResponse: (response) => {
                if (response.book) {
                    const imageUrl = response.book.coverImage
                        ? `${getBaseUrl()}/api/books/image/${response.book.coverImage}`
                        : null;
                    return {
                        ...response,
                        book: {
                            ...response.book,
                            imageUrl
                        }
                    };
                }
                return response;
            },
            invalidatesTags: ["Books"]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        }),

        // New endpoint for fetching book images
        getBookImage: builder.query({
            query: (filename) => ({
                url: `/image/${filename}`,
                responseHandler: 'blob', // Handle image response as blob
            }),
            // Cache the images for better performance
            keepUnusedDataFor: 300, // Keep unused images in cache for 5 minutes
        })
    })
});

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useGetBookImageQuery
} = booksApi;

export default booksApi;