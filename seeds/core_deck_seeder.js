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
      image_url: '/src/assets/bahamut.png',
      image_options: '{"object-position": "25% 75%"}'
    },
    {
      name: 'Aspect of Tiamat',
      wager: 13,
      type: 'Dragon',
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic Evil, unchangeable. Trumps unchangeable.',
      image_url: '/src/assets/tiamat.png'
    },
    {
      name: 'Planetar',
      wager: 7,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful Good'
    },
    {
      name: 'Pit Fiend',
      wager: 7,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic Evil'
    },
    {
      name: 'Cloud Giant',
      wager: 5,
      type: null,
      alignments: 'Good Evil',
      rules_text: 'Good or Evil'
    },
    {
      name: 'Assassin',
      wager: 5,
      type: null,
      alignments: 'Lawful Chaotic',
      rules_text: 'Lawful or Chaotic'
    },
    {
      name: 'Displacer Beast',
      wager: 4,
      type: null,
      alignments: 'Lawful Evil',
      rules_text: 'Lawful or Evil'
    },
    {
      name: 'Pegasus',
      wager: 4,
      type: null,
      alignments: 'Chaotic Good',
      rules_text: 'Chaotic or Good'
    },
    {
      name: 'Couatl',
      wager: 3,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good'
    },
    {
      name: 'Gnoll',
      wager: 3,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil'
    },
    {
      name: 'Blink Pup',
      wager: 2,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good'
    },
    {
      name: 'Flumph',
      wager: 2,
      type: null,
      alignments: 'Lawful Good',
      rules_text: 'Lawful or Good'
    },
    {
      name: 'Goblin',
      wager: 2,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil'
    },
    {
      name: 'Specter',
      wager: 2,
      type: null,
      alignments: 'Chaotic Evil',
      rules_text: 'Chaotic or Evil'
    },
  ]);
};
