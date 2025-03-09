export const BASE_URL = "https://trello-backend-sigma.vercel.app"
// export const BASE_URL = 'http://localhost:5000';

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};