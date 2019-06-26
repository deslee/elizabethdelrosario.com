import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'sj7jy8qa', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  token: 'skBHoJ7a9D2SviMQlCHJagtQycjlIniD8IjsW6PHqOJE7pSrpUuUm0HQvgZKwHEtQbUfkoOq0aGBrvo3dRthfwUtWnNdB3054dcvp9QLQUnGN8MCByBxJsd5KWHyCBzjYs3Uc979HEdVAU2yV9KqNBG163ZUK6bLg32e4GM6CcJoNCW4EERY',
  useCdn: false // `false` if you want to ensure fresh data
})