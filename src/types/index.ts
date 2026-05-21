export type Report = {
  timestamp: string;
  totalFetched: number;
  inserted: number;
  updated: number;
  ignored: number;
  errors: number;
  durationMs: number;
};

export type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: any;
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  nat: string;
  picture: any;
};

export type FormattedUser = {
  email: string;
  gender: string;
  title: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  cell: string;
  nat: string;
  location: string;
  login: string;
  picture: string;
  dob: string;
  registered: string;
};
