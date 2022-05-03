import { assignSoft, capitalize, Nullable, nullable } from '../utils'
import { str, StringConfig } from './str'
import { oneOf } from './oneOf'
import { replicate } from '../lists/replicate'
import { trueOrFalse } from './boolean'

export type PartialWordsSet = {
    words?: Array<string>;
    names?: {
        male?: Array<string>;
        female?: Array<string>;
        mixed?: Array<string>;
    };
}

// eslint-disable-next-line max-len
const femaleNames = ['Rebecca', 'Mariam', 'Kimberly', 'Samantha', 'Taylor', 'Annie', 'Evie', 'Ayesha', 'Lola', 'Tiffany', 'Flora', 'Mia', 'Yasmin', 'Erica', 'Amina', 'Leona', 'Nia', 'Miriam', 'Jay', 'Hayley', 'Michelle', 'Daisy', 'Megan', 'Eva', 'Iqra', 'Jerry', 'Alfie', 'Bailey', 'Kelly', 'Mabel', 'Nellie', 'Kyra', 'Katy', 'Kira', 'Deborah', 'Zahra', 'Rowan', 'Rachel', 'Ebony', 'Michaela', 'Thea', 'Gracie', 'Willie', 'Melanie', 'Hattie', 'Rita', 'Sofia', 'Cory', 'Paula', 'Nancy', 'Evangeline', 'Anisa', 'Lana', 'Savannah', 'Tilly', 'Jacqueline', 'Susan', 'Lachlan', 'Monica', 'Amy', 'Aminah', 'Mason', 'Hazel', 'Rosa', 'Claudia', 'Vanessa', 'Melissa', 'Isobel', 'Anita', 'Jennifer', 'Ellis', 'Eliza', 'Spencer', 'Haleema', 'Jamie', 'Alisha', 'Darcie', 'Tanisha', 'Maryam', 'Isla', 'Connie', 'Phoebe', 'Sophie', 'Kiera', 'Katie', 'Cara', 'Sarah', 'Harley', 'Laura', 'Kaitlyn', 'Tina', 'Teresa', 'Faith', 'Alesha', 'Lara', 'Sadie', 'Anne', 'Tamara', 'Tia', 'Lucie']
// eslint-disable-next-line max-len
const maleNames = ['Glenn', 'Xavier', 'Musa', 'Darren', 'Ryan', 'Evangeline', 'Christian', 'Otis', 'Sienna', 'Tyler', 'Xander', 'Aadam', 'Julian', 'Hamzah', 'Farhan', 'Niall', 'Owain', 'Jamie', 'Elmer', 'Oliver', 'Isaac', 'Kyle', 'Myles', 'Hashim', 'Jerry', 'Leroy', 'Jakob', 'Jeffrey', 'Imran', 'Ted', 'Emmanuel', 'Patrick', 'Ajay', 'Juan', 'Sara', 'Rebekah', 'Jose', 'Connor', 'Justin', 'Richard', 'Herman', 'Renee', 'Nicholas', 'Solomon', 'Dale', 'Kye', 'Anas', 'Louis', 'Josh', 'Fabian', 'Kevin', 'Dewey', 'Anika', 'Ross', 'Willard', 'Sean', 'Caleb', 'Muhammad', 'Melvin', 'Ernest', 'Ruben', 'David', 'Jenna', 'Elena', 'Spencer', 'Ronald', 'Todd', 'Courtney', 'Guy', 'Tony', 'Reuben', 'Ethan', 'Aidan', 'Jake', 'Jessie', 'Lachlan', 'Charley', 'Casey', 'Will', 'Leonard', 'Zac', 'Harold', 'Stanley', 'Marcel', 'Mark', 'Mustafa', 'Carl', 'Amir', 'Amaan', 'Terry', 'Howard', 'Edgar', 'Victor', 'Sana', 'Sam', 'Adrian', 'Ronan', 'Phillip', 'Abby', 'Kira']
export const wordsSet = {
    // eslint-disable-next-line max-len
    words: ['spade', 'thunder', 'zany', 'broad', 'hissing', 'poor', 'veil', 'sidewalk', 'milk', 'mellow', 'circle', 'tangible', 'sea', 'grin', 'actually', 'holistic', 'peaceful', 'carve', 'wine', 'reflective', 'cowardly', 'event', 'advise', 'butter', 'clever', 'visit', 'scold', 'volleyball', 'rhythm', 'agonizing', 'magic', 'mouth', 'dapper', 'rat', 'slap', 'jumpy', 'upbeat', 'flat', 'determined', 'sordid', 'whine', 'abandoned', 'morning', 'relax', 'huge', 'frog', 'call', 'blue-eyed', 'squirrel', 'balance', 'giants', 'eatable', 'careful', 'troubled', 'record', 'word', 'hushed', 'clear', 'straight', 'comfortable', 'enormous', 'offer', 'protect', 'double', 'unnatural', 'lamp', 'wry', 'false', 'smash', 'fixed', 'whimsical', 'comb', 'cute', 'eye', 'faithful', 'kittens', 'shame', 'crayon', 'astonishing', 'tow', 'education', 'capable', 'deep', 'filthy', 'fire', 'symptomatic', 'waggish', 'perpetual', 'accurate', 'reject', 'naive', 'parcel', 'absurd', 'ducks', 'selfish', 'hot', 'oceanic', 'dynamic', 'knowing', 'stupid', 'flesh', 'vacation', 'clam', 'fantastic', 'liquid', 'cannon', 'potato', 'shivering', 'numerous', 'earn', 'glow', 'nest', 'rotten', 'army', 'cumbersome', 'clip', 'guide', 'meaty', 'jam', 'woozy', 'bag', 'scarce', 'metal', 'mundane', 'raise', 'boiling', 'complex', 'engine', 'floor', 'toothsome', 'muddle', 'descriptive', 'cooing', 'fumbling', 'race', 'good', 'barbarous', 'color', 'knowledge', 'theory', 'chubby', 'fence', 'sister', 'adorable', 'bedroom', 'nostalgic', 'rich', 'detect', 'cow', 'cycle', 'unbecoming', 'grass', 'time', 'cry', 'rapid', 'thing', 'lumber', 'guttural', 'reduce', 'exist', 'adhesive', 'language', 'hellish', 'groovy', 'well-to-do', 'women', 'scrawny', 'war', 'sun', 'strange', 'zippy', 'eyes', 'meal', 'wonderful', 'cable', 'oranges', 'evanescent', 'craven', 'obtainable', 'flavor', 'sleep', 'flagrant', 'warm', 'brake', 'extra-large', 'general', 'frightened', 'permissible', 'standing', 'touch', 'system', 'frail', 'agreement', 'school', 'back', 'stain', 'smile', 'cheap', 'direful', 'voice', 'sheep', 'equable', 'violet', 'numberless', 'tumble', 'truculent', 'limit', 'tempt', 'tall', 'carry', 'jagged', 'arm', 'omniscient', 'better', 'subdued', 'thumb', 'hard-to-find', 'learned', 'earthy', 'badge', 'early', 'difficult', 'mint', 'abaft', 'lewd', 'yummy', 'capricious', 'melodic', 'tacit', 'seemly', 'ruddy', 'identify', 'income', 'neighborly', 'gate', 'shape', 'coordinated', 'mammoth', 'taboo', 'doctor', 'intelligent', 'legs', 'curious', 'shut', 'iron', 'boy', 'cows', 'puny', 'moan', 'valuable'],
    names: {
        male: maleNames,
        female: femaleNames,
        mixed: maleNames.concat(femaleNames),
    },
}

export type TextConfig = {
    /**
     * The content of resulting text, would it be a random strings, names or plain words
     *
     * Default: 'words'
     */
    type?: 'words'|'random_string'|'names';

    /**
     * Genders of names if the type is 'names'
     *
     * Default: 'mixed'
     */
    namesGender?: 'male'|'female'|'mixed';

    /**
     * Config of random string if the type is 'random_string'
     *
     * Default: { size: 7 }
     */
    randomStringConfig?: StringConfig;

    /**
     * Custom list of words and names
     *
     * Default: {}
     */
    wordsSet?: PartialWordsSet;

    /**
     * Should the text be capitalized (first letter is in upper case)
     *
     * Default: false
     */
    capitalized?: boolean;

    /**
     * Count of words in resulting text
     */
    size: number;
}
export function text(config: TextConfig): string
export function text(config: Nullable<TextConfig, false>): string
export function text(config: Nullable<TextConfig>): string | null

/**
 * Generates a random text separated by spaces
 */
export function text(config: TextConfig | Nullable<TextConfig>): string | null
{
    if (nullable(config)) if (trueOrFalse()) return null
    config.type ??= 'words'
    config.namesGender ??= 'mixed'
    config.randomStringConfig ??= { size: 5 }
    config.capitalized ??= false
    config.wordsSet = assignSoft(config.wordsSet ?? {}, wordsSet)

    const wordSet = config.type === 'random_string'
        ? [] as Array<string> // we will not use it in this case
        : config.type === 'words'
            ? wordsSet[config.type]
            : wordsSet[config.type][config.namesGender]

    const generateWord = config.type === 'random_string'
        ? () => str(config.randomStringConfig ?? { size: 7 })
        : () => oneOf({ list: wordSet })

    const result = replicate({
        size: config.size,
        schema: generateWord,
    }).join(' ')

    return config.capitalized ? capitalize(result) : result
}