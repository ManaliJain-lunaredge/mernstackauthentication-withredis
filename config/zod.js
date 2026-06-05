import {z} from "zod";


export const registerSchema=z.object({
    name:z.string().min(3,"Name must be at leats 3 character long"),
    email:z.string().email("Invalid email"),
    password:z.string().min(5,"Password must be at least 5 charrecters long")
})

export const loginSchema=z.object({
  
    email:z.string().email("Invalid email"),
    password:z.string().min(5,"Password must be at least 5 charrecters long")
})