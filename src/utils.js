export const funcSorting = (arr, type) => {
  switch (type) {
    case 'FROM_MORE':
      return [...arr.sort((a, b) => b.id - a.id)];
    case 'FROM_LESS':
      return [...arr.sort((a, b) => a.id - b.id)];
    default:
      return arr;
  }
};

export const searchUser = (arr, word) => {
  if (!word.trim()) {
    return arr;
  }
  return arr.filter((user) =>
    user.username.toLowerCase().includes(word.toLowerCase())
  );
};
