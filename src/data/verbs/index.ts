import { TagalogVerb } from './types';

/**
 * Sample Tagalog Verbs with Complete Conjugation Data
 * 
 * This demonstrates the verb focus system with real conjugations.
 * Root verb: "kain" (eat)
 */
export const VERBS: TagalogVerb[] = [
  {
    id: 'verb-kain',
    root: 'kain',
    englishMeaning: 'eat',
    level: 'Beginner',
    transitivity: 'transitive',
    commonFocus: 'actor',
    notes: 'One of the most commonly used verbs in Tagalog. Central to food-related conversations.',

    conjugations: {
      // ACTOR FOCUS: Emphasis on the person eating
      actor: {
        completed: {
          firstSingular: 'kumain ako',
          secondSingular: 'kumain ka',
          thirdSingular: 'kumain siya',
          firstPluralInclusive: 'kumain tayo',
          firstPluralExclusive: 'kumain kami',
          secondPlural: 'kumain kayo',
          thirdPlural: 'kumain sila',
        },
        incomplete: {
          firstSingular: 'kumakain ako',
          secondSingular: 'kumakain ka',
          thirdSingular: 'kumakain siya',
          firstPluralInclusive: 'kumakain tayo',
          firstPluralExclusive: 'kumakain kami',
          secondPlural: 'kumakain kayo',
          thirdPlural: 'kumakain sila',
        },
        contemplated: {
          firstSingular: 'kakain ako',
          secondSingular: 'kakain ka',
          thirdSingular: 'kakain siya',
          firstPluralInclusive: 'kakain tayo',
          firstPluralExclusive: 'kakain kami',
          secondPlural: 'kakain kayo',
          thirdPlural: 'kakain sila',
        },
      },

      // OBJECT FOCUS: Emphasis on what is being eaten
      object: {
        completed: {
          firstSingular: 'kinain ko',
          secondSingular: 'kinain mo',
          thirdSingular: 'kinain niya',
          firstPluralInclusive: 'kinain natin',
          firstPluralExclusive: 'kinain namin',
          secondPlural: 'kinain ninyo',
          thirdPlural: 'kinain nila',
        },
        incomplete: {
          firstSingular: 'kinakain ko',
          secondSingular: 'kinakain mo',
          thirdSingular: 'kinakain niya',
          firstPluralInclusive: 'kinakain natin',
          firstPluralExclusive: 'kinakain namin',
          secondPlural: 'kinakain ninyo',
          thirdPlural: 'kinakain nila',
        },
        contemplated: {
          firstSingular: 'kakainin ko',
          secondSingular: 'kakainin mo',
          thirdSingular: 'kakainin niya',
          firstPluralInclusive: 'kakainin natin',
          firstPluralExclusive: 'kakainin namin',
          secondPlural: 'kakainin ninyo',
          thirdPlural: 'kakainin nila',
        },
      },

      // LOCATION FOCUS: Emphasis on where eating occurs
      location: {
        completed: {
          firstSingular: 'kainan ko',
          secondSingular: 'kainan mo',
          thirdSingular: 'kainan niya',
          firstPluralInclusive: 'kainan natin',
          firstPluralExclusive: 'kainan namin',
          secondPlural: 'kainan ninyo',
          thirdPlural: 'kainan nila',
        },
        incomplete: {
          firstSingular: 'kinakainan ko',
          secondSingular: 'kinakainan mo',
          thirdSingular: 'kinakainan niya',
          firstPluralInclusive: 'kinakainan natin',
          firstPluralExclusive: 'kinakainan namin',
          secondPlural: 'kinakainan ninyo',
          thirdPlural: 'kinakainan nila',
        },
        contemplated: {
          firstSingular: 'kakaainan ko',
          secondSingular: 'kakaainan mo',
          thirdSingular: 'kakaainan niya',
          firstPluralInclusive: 'kakaainan natin',
          firstPluralExclusive: 'kakaainan namin',
          secondPlural: 'kakaainan ninyo',
          thirdPlural: 'kakaainan nila',
        },
      },

      // BENEFICIARY FOCUS: Emphasis on who benefits from eating
      beneficiary: {
        completed: {
          firstSingular: 'kainan ako',
          secondSingular: 'kainan ka',
          thirdSingular: 'kainan siya',
          firstPluralInclusive: 'kainan tayo',
          firstPluralExclusive: 'kainan kami',
          secondPlural: 'kainan kayo',
          thirdPlural: 'kainan sila',
        },
        incomplete: {
          firstSingular: 'kinakainan ako',
          secondSingular: 'kinakainan ka',
          thirdSingular: 'kinakainan siya',
          firstPluralInclusive: 'kinakainan tayo',
          firstPluralExclusive: 'kinakainan kami',
          secondPlural: 'kinakainan kayo',
          thirdPlural: 'kinakainan sila',
        },
        contemplated: {
          firstSingular: 'kakaainan ako',
          secondSingular: 'kakaainan ka',
          thirdSingular: 'kakaainan siya',
          firstPluralInclusive: 'kakaainan tayo',
          firstPluralExclusive: 'kakaainan kami',
          secondPlural: 'kakaainan kayo',
          thirdPlural: 'kakaainan sila',
        },
      },
    },

    examples: [
      {
        tagalog: 'Kumain kami ng tinapay.',
        english: 'We ate bread.',
        focus: 'actor',
        aspect: 'completed',
      },
      {
        tagalog: 'Kumakain siya ng gulay araw-araw.',
        english: 'He/She eats vegetables every day.',
        focus: 'actor',
        aspect: 'incomplete',
      },
      {
        tagalog: 'Kakain tayo bukas.',
        english: 'We will eat tomorrow.',
        focus: 'actor',
        aspect: 'contemplated',
      },
      {
        tagalog: 'Ang tinapay ay kinain ng mga bata.',
        english: 'The bread was eaten by the children.',
        focus: 'object',
        aspect: 'completed',
      },
      {
        tagalog: 'Kinakain namin ang pagkain nang mabilis.',
        english: 'We eat the food quickly.',
        focus: 'object',
        aspect: 'incomplete',
      },
      {
        tagalog: 'Sa bahay, kakain kami.',
        english: 'At home, we will eat.',
        focus: 'location',
        aspect: 'contemplated',
      },
      {
        tagalog: 'Kainan ka namin bukas.',
        english: 'We will feed/treat you tomorrow.',
        focus: 'beneficiary',
        aspect: 'contemplated',
      },
    ],
  },

  {
    id: 'verb-bili',
    root: 'bili',
    englishMeaning: 'buy',
    level: 'Beginner',
    transitivity: 'transitive',
    commonFocus: 'actor',

    conjugations: {
      actor: {
        completed: {
          firstSingular: 'bumili ako',
          secondSingular: 'bumili ka',
          thirdSingular: 'bumili siya',
          firstPluralInclusive: 'bumili tayo',
          firstPluralExclusive: 'bumili kami',
          secondPlural: 'bumili kayo',
          thirdPlural: 'bumili sila',
        },
        incomplete: {
          firstSingular: 'bumibili ako',
          secondSingular: 'bumibili ka',
          thirdSingular: 'bumibili siya',
          firstPluralInclusive: 'bumibili tayo',
          firstPluralExclusive: 'bumibili kami',
          secondPlural: 'bumibili kayo',
          thirdPlural: 'bumibili sila',
        },
        contemplated: {
          firstSingular: 'bibili ako',
          secondSingular: 'bibili ka',
          thirdSingular: 'bibili siya',
          firstPluralInclusive: 'bibili tayo',
          firstPluralExclusive: 'bibili kami',
          secondPlural: 'bibili kayo',
          thirdPlural: 'bibili sila',
        },
      },

      object: {
        completed: {
          firstSingular: 'binili ko',
          secondSingular: 'binili mo',
          thirdSingular: 'binili niya',
          firstPluralInclusive: 'binili natin',
          firstPluralExclusive: 'binili namin',
          secondPlural: 'binili ninyo',
          thirdPlural: 'binili nila',
        },
        incomplete: {
          firstSingular: 'binibili ko',
          secondSingular: 'binibili mo',
          thirdSingular: 'binibili niya',
          firstPluralInclusive: 'binibili natin',
          firstPluralExclusive: 'binibili namin',
          secondPlural: 'binibili ninyo',
          thirdPlural: 'binibili nila',
        },
        contemplated: {
          firstSingular: 'bibili ko',
          secondSingular: 'bibili mo',
          thirdSingular: 'bibili niya',
          firstPluralInclusive: 'bibili natin',
          firstPluralExclusive: 'bibili namin',
          secondPlural: 'bibili ninyo',
          thirdPlural: 'bibili nila',
        },
      },

      location: {
        completed: {
          firstSingular: 'bilian ko',
          secondSingular: 'bilian mo',
          thirdSingular: 'bilian niya',
          firstPluralInclusive: 'bilian natin',
          firstPluralExclusive: 'bilian namin',
          secondPlural: 'bilian ninyo',
          thirdPlural: 'bilian nila',
        },
        incomplete: {
          firstSingular: 'binibilian ko',
          secondSingular: 'binibilian mo',
          thirdSingular: 'binibilian niya',
          firstPluralInclusive: 'binibilian natin',
          firstPluralExclusive: 'binibilian namin',
          secondPlural: 'binibilian ninyo',
          thirdPlural: 'binibilian nila',
        },
        contemplated: {
          firstSingular: 'bibilhan ko',
          secondSingular: 'bibilhan mo',
          thirdSingular: 'bibilhan niya',
          firstPluralInclusive: 'bibilhan natin',
          firstPluralExclusive: 'bibilhan namin',
          secondPlural: 'bibilhan ninyo',
          thirdPlural: 'bibilhan nila',
        },
      },

      beneficiary: {
        completed: {
          firstSingular: 'bilian ako',
          secondSingular: 'bilian ka',
          thirdSingular: 'bilian siya',
          firstPluralInclusive: 'bilian tayo',
          firstPluralExclusive: 'bilian kami',
          secondPlural: 'bilian kayo',
          thirdPlural: 'bilian sila',
        },
        incomplete: {
          firstSingular: 'binibilian ako',
          secondSingular: 'binibilian ka',
          thirdSingular: 'binibilian siya',
          firstPluralInclusive: 'binibilian tayo',
          firstPluralExclusive: 'binibilian kami',
          secondPlural: 'binibilian kayo',
          thirdPlural: 'binibilian sila',
        },
        contemplated: {
          firstSingular: 'bibilhan ako',
          secondSingular: 'bibilhan ka',
          thirdSingular: 'bibilhan siya',
          firstPluralInclusive: 'bibilhan tayo',
          firstPluralExclusive: 'bibilhan kami',
          secondPlural: 'bibilhan kayo',
          thirdPlural: 'bibilhan sila',
        },
      },
    },

    examples: [
      {
        tagalog: 'Bumili kami ng mga libro.',
        english: 'We bought books.',
        focus: 'actor',
        aspect: 'completed',
      },
      {
        tagalog: 'Binili niya ang damit.',
        english: 'She bought the dress.',
        focus: 'object',
        aspect: 'completed',
      },
      {
        tagalog: 'Bibili sila sa tindahan bukas.',
        english: 'They will buy at the store tomorrow.',
        focus: 'actor',
        aspect: 'contemplated',
      },
    ],
  },

  {
    id: 'verb-sulat',
    root: 'sulat',
    englishMeaning: 'write',
    level: 'Beginner',
    transitivity: 'transitive',
    commonFocus: 'actor',

    conjugations: {
      actor: {
        completed: {
          firstSingular: 'nagsulat ako',
          secondSingular: 'nagsulat ka',
          thirdSingular: 'nagsulat siya',
          firstPluralInclusive: 'nagsulat tayo',
          firstPluralExclusive: 'nagsulat kami',
          secondPlural: 'nagsulat kayo',
          thirdPlural: 'nagsulat sila',
        },
        incomplete: {
          firstSingular: 'nagsusulat ako',
          secondSingular: 'nagsusulat ka',
          thirdSingular: 'nagsusulat siya',
          firstPluralInclusive: 'nagsusulat tayo',
          firstPluralExclusive: 'nagsusulat kami',
          secondPlural: 'nagsusulat kayo',
          thirdPlural: 'nagsusulat sila',
        },
        contemplated: {
          firstSingular: 'magsusulat ako',
          secondSingular: 'magsusulat ka',
          thirdSingular: 'magsusulat siya',
          firstPluralInclusive: 'magsusulat tayo',
          firstPluralExclusive: 'magsusulat kami',
          secondPlural: 'magsusulat kayo',
          thirdPlural: 'magsusulat sila',
        },
      },

      object: {
        completed: {
          firstSingular: 'sinulat ko',
          secondSingular: 'sinulat mo',
          thirdSingular: 'sinulat niya',
          firstPluralInclusive: 'sinulat natin',
          firstPluralExclusive: 'sinulat namin',
          secondPlural: 'sinulat ninyo',
          thirdPlural: 'sinulat nila',
        },
        incomplete: {
          firstSingular: 'sinusulat ko',
          secondSingular: 'sinusulat mo',
          thirdSingular: 'sinusulat niya',
          firstPluralInclusive: 'sinusulat natin',
          firstPluralExclusive: 'sinusulat namin',
          secondPlural: 'sinusulat ninyo',
          thirdPlural: 'sinusulat nila',
        },
        contemplated: {
          firstSingular: 'susulatin ko',
          secondSingular: 'susulatin mo',
          thirdSingular: 'susulatin niya',
          firstPluralInclusive: 'susulatin natin',
          firstPluralExclusive: 'susulatin namin',
          secondPlural: 'susulatin ninyo',
          thirdPlural: 'susulatin nila',
        },
      },

      location: {
        completed: {
          firstSingular: 'sulatan ko',
          secondSingular: 'sulatan mo',
          thirdSingular: 'sulatan niya',
          firstPluralInclusive: 'sulatan natin',
          firstPluralExclusive: 'sulatan namin',
          secondPlural: 'sulatan ninyo',
          thirdPlural: 'sulatan nila',
        },
        incomplete: {
          firstSingular: 'sinusulatan ko',
          secondSingular: 'sinusulatan mo',
          thirdSingular: 'sinusulatan niya',
          firstPluralInclusive: 'sinusulatan natin',
          firstPluralExclusive: 'sinusulatan namin',
          secondPlural: 'sinusulatan ninyo',
          thirdPlural: 'sinusulatan nila',
        },
        contemplated: {
          firstSingular: 'susulatan ko',
          secondSingular: 'susulatan mo',
          thirdSingular: 'susulatan niya',
          firstPluralInclusive: 'susulatan natin',
          firstPluralExclusive: 'susulatan namin',
          secondPlural: 'susulatan ninyo',
          thirdPlural: 'susulatan nila',
        },
      },

      beneficiary: {
        completed: {
          firstSingular: 'sulatan ako',
          secondSingular: 'sulatan ka',
          thirdSingular: 'sulatan siya',
          firstPluralInclusive: 'sulatan tayo',
          firstPluralExclusive: 'sulatan kami',
          secondPlural: 'sulatan kayo',
          thirdPlural: 'sulatan sila',
        },
        incomplete: {
          firstSingular: 'sinusulatan ako',
          secondSingular: 'sinusulatan ka',
          thirdSingular: 'sinusulatan siya',
          firstPluralInclusive: 'sinusulatan tayo',
          firstPluralExclusive: 'sinusulatan kami',
          secondPlural: 'sinusulatan kayo',
          thirdPlural: 'sinusulatan sila',
        },
        contemplated: {
          firstSingular: 'susulatan ako',
          secondSingular: 'susulatan ka',
          thirdSingular: 'susulatan siya',
          firstPluralInclusive: 'susulatan tayo',
          firstPluralExclusive: 'susulatan kami',
          secondPlural: 'susulatan kayo',
          thirdPlural: 'susulatan sila',
        },
      },
    },

    examples: [
      {
        tagalog: 'Nagsulat kami ng liham.',
        english: 'We wrote a letter.',
        focus: 'actor',
        aspect: 'completed',
      },
      {
        tagalog: 'Sinulat niya ang kwento.',
        english: 'She wrote the story.',
        focus: 'object',
        aspect: 'completed',
      },
      {
        tagalog: 'Nagsusulat ako ng tula tuwing gabi.',
        english: 'I write poetry every night.',
        focus: 'actor',
        aspect: 'incomplete',
      },
    ],
  },
];
