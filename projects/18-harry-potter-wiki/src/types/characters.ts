export interface Character {
  id:               string
  name:             string
  alternate_names:  string[]
  species:          Species
  gender:           Gender
  house:            House
  dateOfBirth:      null | string
  yearOfBirth:      number | null
  wizard:           boolean
  ancestry:         Ancestry
  eyeColour:        EyeColour
  hairColour:       HairColour
  wand:             Wand
  patronus:         Patronus
  hogwartsStudent:  boolean
  hogwartsStaff:    boolean
  actor:            string
  alternate_actors: string[]
  alive:            boolean
  image:            string
}

export enum Ancestry {
  Empty = '',
  HalfBlood = 'half-blood',
  HalfVeela = 'half-veela',
  Muggle = 'muggle',
  Muggleborn = 'muggleborn',
  PureBlood = 'pure-blood',
  QuarterVeela = 'quarter-veela',
  Squib = 'squib',
}

export enum EyeColour {
  Amber = 'amber',
  Black = 'black',
  Blue = 'blue',
  Brown = 'brown',
  Dark = 'dark',
  Empty = '',
  Green = 'green',
  Grey = 'grey',
  Hazel = 'hazel',
  Orange = 'orange',
  PaleSilvery = 'pale, silvery',
  Red = 'red',
  White = 'white',
  Yellow = 'yellow',
  Yellowish = 'yellowish',
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export enum HairColour {
  Bald = 'bald',
  Black = 'black',
  Blond = 'blond',
  Blonde = 'blonde',
  Brown = 'brown',
  Dark = 'dark',
  Dull = 'dull',
  Empty = '',
  Ginger = 'ginger',
  Grey = 'grey',
  Red = 'red',
  Sandy = 'sandy',
  Silver = 'silver',
  Tawny = 'tawny',
  White = 'white',
}

export enum House {
  Empty = '',
  Gryffindor = 'Gryffindor',
  Hufflepuff = 'Hufflepuff',
  Ravenclaw = 'Ravenclaw',
  Slytherin = 'Slytherin',
}

export enum Patronus {
  Boar = 'boar',
  Doe = 'doe',
  Empty = '',
  Goat = 'goat',
  Hare = 'hare',
  Horse = 'horse',
  JackRussellTerrier = 'Jack Russell terrier',
  Lynx = 'lynx',
  NonCorporeal = 'Non-Corporeal',
  Otter = 'otter',
  PersianCat = 'persian cat',
  Stag = 'stag',
  Swan = 'swan',
  TabbyCat = 'tabby cat',
  Weasel = 'weasel',
  Wolf = 'wolf',
}

export enum Species {
  Acromantula = 'acromantula',
  Cat = 'cat',
  Centaur = 'centaur',
  Dragon = 'dragon',
  Ghost = 'ghost',
  Giant = 'giant',
  Goblin = 'goblin',
  HalfGiant = 'half-giant',
  HalfHuman = 'half-human',
  Hippogriff = 'hippogriff',
  HouseELF = 'house-elf',
  Human = 'human',
  Owl = 'owl',
  Poltergeist = 'poltergeist',
  ThreeHeadedDog = 'three-headed dog',
  Vampire = 'vampire',
  Werewolf = 'werewolf',
}

export interface Wand {
  wood:   Wood
  core:   Core
  length: number | null
}

export enum Core {
  DragonHeartstring = 'dragon heartstring',
  Empty = '',
  PhoenixFeather = 'phoenix feather',
  UnicornHair = 'unicorn hair',
  UnicornTailHair = 'unicorn tail-hair',
}

export enum Wood {
  Ash = 'ash',
  Birch = 'birch',
  Cedar = 'cedar',
  Cherry = 'cherry',
  Chestnut = 'chestnut',
  Cypress = 'cypress',
  Elm = 'elm',
  Empty = '',
  Fir = 'fir',
  Hawthorn = 'hawthorn',
  Holly = 'holly',
  Hornbeam = 'hornbeam',
  Larch = 'larch',
  Mahogany = 'mahogany',
  Oak = 'oak',
  Vine = 'vine',
  Walnut = 'walnut',
  Willow = 'willow',
  Yew = 'yew',
}
