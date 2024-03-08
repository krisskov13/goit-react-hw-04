import axios from "axios";

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    "https://api.unsplash.com/search/photos?client_id=M87bk--fitS01PewK9WAMz2M95HiYG1OJBwRhrr7Erk",
    {
      params: {
        query: searchQuery,
        page,
      },
    }
  );
  return response.data.results;
};
