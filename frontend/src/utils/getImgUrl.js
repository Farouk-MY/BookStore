const getImgUrl = (coverImagePath) => {
    if (!coverImagePath) return '/placeholder.png'; // Fallback image
    return `${import.meta.env.VITE_API_URL}${coverImagePath}`;
};

export { getImgUrl };
