/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cards').del()
  await knex('cards').insert([
    {
      name: 'Aspect of Bahamut',
      wager: 13,
      type: 'Dragon',
      alignments: 'Lawful Good',
      rules_text: 'Lawful Good, unchangeable. Trumps unchangeable.',
      image_url: 'http://localhost:4000/images/bahamut.png',
      image_options: '{"object-position": "25% 75%"}'
    },
    {
      name: 'Aspect of Tiamat',
      wager: 13,
      type: 'Dragon',
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic Evil, unchangeable. Trumps unchangeable.',
      image_url: 'http://localhost:4000/images/tiamat.png'
    },
    {
      name: 'Planetar',
      wager: 7,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful Good',
      image_url: 'http://localhost:4000/images/Planetar.webp'
    },
    {
      name: 'Pit Fiend',
      wager: 7,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic Evil',
      image_url: 'http://localhost:4000/images/pitfiend.webp'
    },
    {
      name: 'Cloud Giant',
      wager: 5,
      type: null,
      alignments: 'Good Evil',
      rules_text: 'Good or Evil',
      image_url: 'http://localhost:4000/images/cloudgiant.webp'
    },
    {
      name: 'Assassin',
      wager: 5,
      type: null,
      alignments: 'Lawful Chaotic',
      rules_text: 'Lawful or Chaotic',
      image_url: 'http://localhost:4000/images/assassin.png'
    },
    {
      name: 'Displacer Beast',
      wager: 4,
      type: null,
      alignments: 'Lawful Evil',
      rules_text: 'Lawful or Evil',
      image_url: 'http://localhost:4000/images/DisplacerBeast.webp'
    },
    {
      name: 'Pegasus',
      wager: 4,
      type: null,
      alignments: 'Chaotic Good',
      rules_text: 'Chaotic or Good',
      image_url: 'http://localhost:4000/images/Pegasus-5e.webp'
    },
    {
      name: 'Couatl',
      wager: 3,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good',
      image_url: 'http://localhost:4000/images/couatl.png'
    },
    {
      name: 'Gnoll',
      wager: 3,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil',
      image_url: 'http://localhost:4000/images/Gnoll-5e.webp'
    },
    {
      name: 'Blink Pup',
      wager: 2,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good',
      image_url: 'http://localhost:4000/images/Blink_Dog.webp'
    },
    {
      name: 'Flumph',
      wager: 2,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good',
      image_url: 'http://localhost:4000/images/Flumph.webp'
    },
    {
      name: 'Goblin',
      wager: 2,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil',
      image_url: 'http://localhost:4000/images/Goblin.webp'
    },
    {
      name: 'Specter',
      wager: 2,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil',
      image_url: 'http://localhost:4000/images/specter.jpg'
    },
  ]);
};
