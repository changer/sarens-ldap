const args = process.argv.slice(2);

const ActiveDirectory = require('activedirectory2');

const provider = {
  configuration: {
    "domain": "sarens.com",
    "url": args[0],
    "bindDN": args[1],
    "bindCredentials": args[2],
    "searchBase": "ou=Europe,ou=EMEA,ou=Sarens,dc=local,dc=sarens,dc=com",
    "searchFilter": [
      args[3]
    ],
    "searchAttributes": [
      "displayName",
      "email"
    ]
  }
};

const ad = new ActiveDirectory({
  url: provider.configuration.url,
  baseDN: 'OU=ISA,OU=GLOBAL,OU=Security Groups,OU=Sarens,DC=LOCAL,DC=SARENS,DC=COM',
  username: provider.configuration.bindDN,
  password: provider.configuration.bindCredentials
});

ad.findGroups('(&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person)))', (err, groups) => {
  groups.forEach(group => {
    console.log(group)

    const ad = new ActiveDirectory({
      url: provider.configuration.url,
      baseDN: 'OU=ISA,OU=GLOBAL,OU=Security Groups,OU=Sarens,DC=LOCAL,DC=SARENS,DC=COM',
      username: provider.configuration.bindDN,
      password: provider.configuration.bindCredentials
    });

    ad.getUsersForGroup(group.cn, (err, users) => console.log(group.cn, err || users && users.length));
  })
});
