const pages = ['/', '/posts']

const desktops = ['macbook-15', 'macbook-13', 'macbook-11', [1920, 1080]]
const mobiles = ['iphone-6+', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3']
const all = [...desktops, ...mobiles]

module.exports = {
  pages: pages,
  screens: {
    all: all,
    desktops: desktops,
    mobiles: mobiles,
  },
}
