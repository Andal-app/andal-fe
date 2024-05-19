const validateInput = (name, value, formData) => {
  let errors = {};

  if (name === 'fullname') {
    errors.fullname = value.length < 1 || value.length > 40 ? 'Nama harus memiliki 1-40 karakter' : '';
  } else if (name === 'email') {
    errors.email = !/\S+@\S+\.\S+/.test(value) ? 'Email tidak valid' : '';
  } else if (name === 'username') {
    errors.username = value.length < 1 || value.length > 20 ? 'Username harus memiliki 1-20 karakter' : '';
  } else if (name === 'password') {
    errors.password =
      value.length > 20
        ? 'Password tidak boleh lebih dari 20 karakter'
        : !/(?=.*[A-Z])(?=.*[0-9]).{8,20}/.test(value)
        ? 'Password harus memiliki 8-20 karakter dengan huruf kapital & angka'
        : '';
  } else if (name === 'confirmPassword') {
    errors.confirmPassword = value !== formData.password ? 'Konfirmasi password harus sama dengan password' : '';
  }

  return errors;
};

export default validateInput;
