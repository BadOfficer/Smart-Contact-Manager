import type { UserType } from '../types/User';

interface Options {
  query: string;
}

const prepareValue = (value: string) => {
  return value.trim().toLowerCase();
};

export const prepareContactsHelper = (contacts: UserType[], { query }: Options) => {
  const preparedQuery = prepareValue(query);

  return contacts.filter((ct) => {
    const isValid =
      prepareValue(ct.name).includes(preparedQuery) ||
      prepareValue(ct.username).includes(preparedQuery) ||
      prepareValue(ct.email).includes(preparedQuery);

    return isValid;
  });
};
