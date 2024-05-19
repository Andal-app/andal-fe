function translateUserRoleURL(role) {
  let roleURL;

  if (role === 'parent') {
    roleURL = 'orangtua';
  } else if (role === 'child') {
    roleURL = 'anak';
  } else {
    roleURL = 'Perlu perbaikan';
  }

  return roleURL;
}

export default translateUserRoleURL;
