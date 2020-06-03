import * as yup from 'yup'

export const registrationSchema = yup.object().shape({
  email: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
  username: yup.string().min(3).max(255),
  admin: yup.bool(),
  location: yup.string().min(3).max(255),
})

export const loginSchema = yup.object().shape({
  email: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
})
