const foo = {
  name: "Permadi Wibisono",
  username: "permadiwibisono",
  githubURL: "https://github.com/permadiwibisono",
};
const foo2 = {
  ...foo,
  repoURL: "https://github.com/permadiwibisono/react-webpack5-starter.git",
};

console.log(foo);
console.log(foo2);
