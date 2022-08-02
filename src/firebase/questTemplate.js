export const quests = [
  {
    // 0
    name: 'Monster from sewers',
    desc: "Rise up, %n. You have proven yourself to be reliable %c. I have a quest for you. People are telling stories about the monster from the sewers. I want you to go there and take care of that problem. Remember... this isn't an ordinary task, your skills will be put to the serious test.",
    enemy: {
      name: 'Gargoyle Oswald',
      stats: {
        endurance: 40,
        strength: 23,
        wisdom: 10,
        level: 4
      },
      charClass: 'Monster',
      portrait: 17
    },
    xp: 1500,
    gold: 200
  },
  {
    // 1
    name: 'Cursed Graveyard',
    desc: "Fine work with your last mission, %n. However, there's still much to be done. People are complaining about obscure noises from crypt. You will go to graveyard and investigate this. Make sure your equipment is upgraded.",
    enemy: {
      name: 'Ari von Gratz',
      stats: {
        endurance: 50,
        strength: 35,
        wisdom: 10,
        level: 6
      },
      charClass: 'Necromancer',
      portrait: 15
    },
    xp: 2500,
    gold: 400
  },
  {
    // 2
    name: 'Blood Tribe',
    desc: 'We need your assistance once again, %c. There is serious threat on our eastern border. Some of the orcish and goblin tribes are seeking new territories and they started raiding our allies. You are experienced enough to challenge their leader and drive them away.',
    enemy: {
      name: 'Sorak',
      stats: {
        endurance: 60,
        strength: 45,
        wisdom: 10,
        level: 8
      },
      charClass: 'Warrior',
      portrait: 16
    },
    xp: 5000,
    gold: 700
  }

]
