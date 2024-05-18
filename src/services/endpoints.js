import axios from "axios";

const endpoints = {
    signUp: (data) => axios.post("/api/sign-up", data),
    signIn: (data) => axios.post("/api/sign-in", data),

    categories: () => axios.get("/api/categories"),
};

export default endpoints;