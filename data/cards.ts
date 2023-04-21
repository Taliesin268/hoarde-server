import Card from '../types/CardType'

const cards: Record<number,Card> = [
  {
    name: "Quetzalcoatl",
    wager: 13,
    rules_text: "Lawful Good, unchangeable. Trumps unchangeable.",
    alignments: "Lawful Good",
    type: "Dragon",
    image: "Quetzalcoatl.webp"
  },
  {
    name: "Tiamat",
    wager: 13,
    rules_text: "Chaotic Evil, unchangeable. Trumps unchangeable.",
    alignments: "Chaotic Evil",
    type: "Dragon",
    image: "tiamat.png"
  },
  {
    name: "Kraken",
    wager: 10,
    rules_text: "Add 10 gold to your opponent's wager.",
    image: "kraken.jpg"
  },
  {
    name: "Cthulhu",
    wager: 10,
    rules_text:
      "Your opponent reveals their hand next round and must play if able.",
    image: "cthulu.webp"
  },
  {
    name: "Dragon Turtle",
    wager: 9,
    rules_text: "Lawful. Discard a card to play this card again.",
    alignments: "Lawful",
    type: "Dragon",
    image: "dragon-turtle.webp"
  },
  {
    name: "Lung Dragon",
    wager: 9,
    rules_text: "Good. Discard a card to play this card again.",
    alignments: "Good",
    type: "Dragon",
    image: "lung-dragon.jpg"
  },
  {
    name: "Grootslang",
    wager: 9,
    rules_text: "Chaotic. Discard a card to play this card again.",
    alignments: "Chaotic",
    type: "Dragon",
    image: "Grootslang.png"
  },
  {
    name: "Azhdaha",
    wager: 9,
    rules_text: "Evil. Discard a card to play this card again.",
    alignments: "Evil",
    type: "Dragon",
    image: "Azhdaha.webp"
  },
  {
    name: "Angel",
    wager: 8,
    rules_text: "Lawful, unchangeable.",
    alignments: "Lawful",
    image: "angel.webp"
  },
  {
    name: "Gryphon",
    wager: 8,
    rules_text: "Good, unchangeable.",
    alignments: "Good",
    image: "Gryphon.webp"
  },
  {
    name: "Demon",
    wager: 8,
    rules_text: "Chaotic, unchangeable.",
    alignments: "Chaotic",
    image: "demon"
  },
  {
    name: "Lich",
    wager: 8,
    rules_text: "Evil, unchangeable.",
    alignments: "Evil",
    image: "lich"
  },
  {
    name: "Thunderbird",
    wager: 7,
    rules_text: "Lawful Good",
    alignments: "Lawful Good",
    image: "thunderbird.png"
  },
  {
    name: "Horned Serpent",
    wager: 7,
    rules_text: "Chaotic Evil",
    alignments: "Chaotic Evil",
    image: "horned-serpent.jpg"
  },
  {
    name: "Vampire",
    wager: 7,
    rules_text:
      "Lawful Evil. If the opponent rests you may still change the alignment.",
    alignments: "Lawful Evil",
    image: "vampire.jpg"
  },
  {
    name: "Werewolf",
    wager: 7,
    rules_text:
      "Chaotic Good. If the opponent rests you may still change the alignment.",
    alignments: "Chaotic Good",
    image: "werewolf.avif"
  },
  {
    name: "Kitsune",
    wager: 7,
    rules_text:
      "Lawful or Good, or this may gain the alignment of your last played card.",
    alignments: "Lawful Good",
    image: "kitsune"
  },
  {
    name: 'Skin-Walker',
    wager: 7,
    rules_text: 'Chaotic or Evil, your next card may gain that alignment over its own.',
    alignments: 'Chaotic Evil',
    type: 'Dragon',
    image: "skin-walker.jpg"
  },
  {
    name: 'Naga',
    wager: 6,
    rules_text: 'Lawful. If the alignment is Good, you may halve or double the wagers.',
    alignments: 'Lawful Good',
    image: "naga.jpg"
  },
  {
    name: 'Treant',
    wager: 6,
    rules_text: 'Good. If the alignment is Chaotic, you may halve or double the wagers.',
    alignments: 'Chaotic Good',
    image: "treant.png"
  },
  {
    name: 'Manticore',
    wager: 6,
    rules_text: 'Chaotic. If the alignment is Evil, you may halve or double the wagers.',
    alignments: 'Chaotic Evil',
    image: "manticore.jpeg"
  },
  {
    name: 'Siren',
    wager: 6,
    rules_text: 'Evil. If the alignment is Lawful, you may halve or double the wagers.',
    alignments: 'Lawful Evil',
    image: "siren.jpg"
  },
  {
    name: 'Frost Giant',
    wager: 6,
    rules_text: 'Lawful. Trumps unchangeable, except for dragons.',
    alignments: 'Lawful',
    image: "FrostGiant.webp"
  },
  {
    name: 'Storm Giant',
    wager: 6,
    rules_text: 'Good. Trumps unchangeable, except for dragons.',
    alignments: 'Good',
    image: "storm-giant.webp"
  },
  {
    name: 'Fire Giant',
    wager: 6,
    rules_text: 'Chaotic. Trumps unchangeable, except for dragons.',
    alignments: 'Chaotic',
    image: "fire-giant.jpg"
  },
  {
    name: 'Mountain Giant',
    wager: 6,
    rules_text: 'Evil. Trumps unchangeable, except for dragons.',
    alignments: 'Evil',
    image: "Mountaingiant.webp"
  },
  {
    name: 'Djinn',
    wager: 5,
    rules_text: 'Good or Evil',
    alignments: 'Good Evil',
    image: "djinn.jpg"
  },
  {
    name: 'Aqrabuamelu',
    wager: 5,
    rules_text: 'Lawful or Chaotic',
    alignments: 'Lawful Chaotic',
    image: "Aqrabuamelu.jpg"
  },
  {
    name: 'Centaur',
    wager: 4,
    rules_text: 'Lawful. Pair with Gargoyle: Lawful Good, unchangeable.',
    alignments: 'Lawful',
    image: "centaur.webp"
  },
  {
    name: 'Unicorn',
    wager: 4,
    rules_text: 'Good. Pair with Mermaid: Lawful Good, unchangeable.',
    alignments: 'Good',
    image: "unicorn.webp"
  },
  {
    name: 'Troll',
    wager: 4,
    rules_text: 'Chaotic. Pair with Goblin: Chaotic Evil, unchangeable.',
    alignments: 'Chaotic',
    image: "troll.png"
  },
  {
    name: 'Wraith',
    wager: 4,
    rules_text: 'Evil. Pair with Specter: Chaotic Evil, unchangeable.',
    alignments: 'Evil',
    image: "wraith.webp"
  },
  {
    name: "Banshee",
    wager: 4,
    rules_text: "Lawful or Evil",
    alignments: "Lawful Evil",
    image: "banshee.webp"
  },
  {
    name: "Pegasus",
    wager: 4,
    rules_text: "Chaotic or Good",
    alignments: "Chaotic Good",
    image: "Pegasus-5e.webp"
  },
  {
    name: "Baku",
    wager: 4,
    rules_text: "Lawful if you've played a Lawful card, same for Good.",
    alignments: "",
    image: "baku.jpeg"
  },
  {
    name: "Chimera",
    wager: 4,
    rules_text: "Chaotic if you've played a Chaotic card, same for Evil.",
    alignments: "",
    image: "chimera.webp"
  },
  {
    name: "Coatl",
    wager: 3,
    rules_text: "Lawful or Good",
    alignments: "Lawful Good",
    image: "coatl.webp"
  },
  {
    name: "Harpy",
    wager: 3,
    rules_text: "Chaotic or Evil",
    alignments: "Chaotic Evil",
    image: "harpy.webp"
  },
  {
    name: "Skeleton",
    wager: 2,
    rules_text: "Lawful. Free to play.",
    alignments: "Lawful",
    image: "skull-trumpet.gif"
  },
  {
    name: "Sprite",
    wager: 2,
    rules_text: "Good. Free to play.",
    alignments: "Good",
    image: "sprite.avif"
  },
  {
    name: "Imp",
    wager: 2,
    rules_text: "Chaotic. Free to play.",
    alignments: "Chaotic",
    image: "Imp.webp"
  },
  {
    name: "Ghoul",
    wager: 2,
    rules_text: "Evil. Free to play.",
    alignments: "Evil",
    image: "ghoul.png"
  },
  {
    name: "Gargoyle",
    wager: 2,
    rules_text: "Lawful or Good",
    alignments: "Lawful Good",
    image: "gargoyal.jpg"
  },
  {
    name: "Mermaid",
    wager: 2,
    rules_text: "Lawful or Good",
    alignments: "Lawful Good",
    image: "mermaid.png"
  },
  {
    name: "Goblin",
    wager: 2,
    rules_text: "Chaotic or Evil",
    alignments: "Chaotic Evil",
    image: "Goblin.png"
  },
  {
    name: "Specter",
    wager: 2,
    rules_text: "Chaotic or Evil",
    alignments: "Chaotic Evil",
    image: "specter.jpeg"
  },
  {
    name: "Wendigo",
    wager: 5,
    rules_text: "Exchange wager amounts. Free to play.",
    alignments: "",
    image: "wendigo.jpeg"
  },
  {
    name: "Sphinx",
    wager: 5,
    rules_text: "Reverse the effect/alignment of each card played this round. Free to play.",
    alignments: "",
    image: "shinx.png"
  },
  {
    name: "Phoenix",
    wager: 5,
    rules_text: "Replay another card. Discard a card to play this card again.",
    image: "phoenix"
  },
  {
    name: "Hydra",
    wager: 5,
    rules_text: "If your opponent played: 1 card, Lawful. 2, Good. 3, Chaotic. 4+, Evil.",
    alignments: "Lawful Good Chaotic Evil",
    image: "hydra.webp"
  },
  {
    name: "Golem",
    wager: 5,
    rules_text: "Lawful, Chaotic, Good or Evil.",
    alignments: "Lawful Chaotic Good Evil",
    image: "golem.jpg"
  },
  {
    name: "Raijū",
    wager: 5,
    rules_text: "Play immediately on draw, the opponent discards a random card.",
    alignments: "",
    image: "raiju.jpg"
  },
  {
    name: "Rainbow Serpent",
    wager: 3,
    rules_text: "True Neutral, unchangeable. [Wagers remain into next round]",
    alignments: "",
    type: "Dragon",
    image: "rainbow-serpent.webp"
  },
  {
    name: "Wyvern",
    wager: 3,
    rules_text: "Copy the Whelp or a Dragon you played this round.",
    alignments: "",
    type: "Dragon",
    image: "wyvern.gif"
  },
  {
    name: "Gorgon",
    wager: 3,
    rules_text: "If your last card had an alignment, it's unchangeable. Free to play.",
    alignments: "",
    image: "gorgon.jpeg"
  },
  {
    name: "Pontianak",
    wager: 3,
    rules_text: "Your opponent discards a card. Free to play.",
    alignments: "",
    image: "Pontianak.webp"
  },
  {
    name: "Yeti",
    wager: 3,
    rules_text: "If you have wagered the most, gain 5 gold from your opponent.",
    alignments: "",
    image: "yeti-falling-downhill.gif"
  },
  {
    name: "Basilisk",
    wager: 3,
    rules_text: "The next card played won't change the alignment. Free to play.",
    alignments: "",
    image: "basilisk.jpg"
  },
  {
    name: "Slime",
    wager: 1,
    rules_text: "Remove a card, its effect and its gold from the round (not alignment).",
    alignments: "",
    image: "slime.jpg"
  },
  {
    name: "Mimic",
    wager: 1,
    rules_text: "Copy the last card you or your opponent played.",
    alignments: "",
    image: "mimic.png"
  },
]

export default cards