const args = process.argv.slice(2);

new (require('activedirectory2'))({
  url: args[0],
  username: args[1],
  password: args[2],
  baseDN: args[3],
  filter: args[4]
}).findUsers({ paged: true }, (err, users) => {
  if (err) {
    return console.error(`Error in parsing response: ${err}`);
  }

  console.info(`Found ${users.length} users`);
});
