function translateUserRole(role) {
  let newRole;

  if (role === 'parent') {
    newRole = 'Orang tua';
  } else if (role === 'child') {
    newRole = 'Anak';
  } else {
    newRole = 'Tidak terdefinisi';
  }

  return newRole;
}

export default translateUserRole;
