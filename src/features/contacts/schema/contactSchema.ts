import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required()
});
