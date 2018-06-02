/* @flow */

module.exports = {
  host: process.env.NODE_HOST || '192.168.1.4', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Cool Starter',
    titleTemplate: 'React Cool Starter - %s',
    meta: [
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.'
      }
    ]
  },
  payloadLimit: '600mb',
  connectString: 'mssql://sa:123456@./iPOS',
  cipher: {
    algorithm: 'aes-128-cbc',
    key: '5ebe2294ecd0e0f08eab7690d2a6ee69',
    iv: '26ae5cc854e36b6bdfca366848dea6bb'
  },
  jwt: {
    expiredTime: 3600,
    algorithm: 'RS256',
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAI49VXldgR6v+tr/2EDqw0L1SEmT6pkm3tu1Ex0euOhhnItNaE1w
PeqH2qRFeGdLk0HGEEMzmHBofOCg83R5rr8CAwEAAQJATm7PtQ60ZmGPqDcv3gwW
A9QROlFQKYdfmDMvCP2p5Kkpk73tssifc+hyiCVPPZZMKofN11R9tyA38doKeAn2
4QIhAN7uuK8amYB6nO2SZA2soZxPw0TuXBr0zgmtz3k5IptJAiEAo1aCjMqTK+ov
/dOHV3f29G6IbGJbCCWaxK178YoKMccCIDUB8Dn6iitJfEzk9RNnS9oeASE/x/jE
4sTcZiu90SO5AiBSn00UaNg/S4wRKnH4xd8uz8bEhJAls9fxCwx6Juh3OwIgI7+q
YZwrvMhP2k4xmuvEdlY6V8daAtF7afnQ6Q8nkeo=
-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI49VXldgR6v+tr/2EDqw0L1SEmT6pkm
3tu1Ex0euOhhnItNaE1wPeqH2qRFeGdLk0HGEEMzmHBofOCg83R5rr8CAwEAAQ==
-----END PUBLIC KEY-----`
  }
};
