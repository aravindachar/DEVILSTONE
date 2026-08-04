const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const curriculum = [
  {
    orderIndex: 1,
    title: "Session 1: Starting Off Right",
    subtopics: [
      {
        title: "The Parts of the Guitar",
        contentHtml: `
          <div class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold mb-4 text-slate-800">The Parts of the Guitar</h3>
            <p class="mb-4 text-slate-600">The guitar is a beautiful, highly expressive string instrument. Understanding its physical anatomy is your first step toward mastery. Guitars generally fall into three main types:</p>
            <ul class="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li><strong>Steel-String Acoustic:</strong> Crisp, bright, and loud. Uses metal strings and is standard for folk, rock, and pop.</li>
              <li><strong>Nylon-String (Classical):</strong> Soft, mellow, and warm. Uses nylon strings and is played with fingers for classical and flamenco.</li>
              <li><strong>Electric Guitar:</strong> Versatile and amplified. Uses magnetic pickups to translate string vibrations into electrical signals.</li>
            </ul>
            <h4 class="text-lg font-semibold mb-3 text-slate-800">Anatomical Breakdown</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span class="font-bold text-slate-800 block mb-1">Headstock</span>
                <p class="text-sm text-slate-600">Located at the top of the neck, housing the tuning keys (pegs) used to adjust string tension and pitch.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span class="font-bold text-slate-800 block mb-1">Neck & Fretboard</span>
                <p class="text-sm text-slate-600">The long wooden board where you fret notes. Metal wires called <strong>frets</strong> divide the neck into semitones. Dots serve as visual marker guides.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span class="font-bold text-slate-800 block mb-1">Body & Bridge</span>
                <p class="text-sm text-slate-600">The body houses the soundbox (acoustic) or pickups (electric). The <strong>bridge</strong> anchors the strings to the body.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span class="font-bold text-slate-800 block mb-1">Nut</span>
                <p class="text-sm text-slate-600">The small strip of bone or plastic separating the headstock from the fretboard, supporting the strings.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        title: "Proper Right Hand Technique",
        contentHtml: `
          <div class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold mb-4 text-slate-800">Proper Right Hand Technique</h3>
            <p class="mb-4 text-slate-600">Your right hand controls the dynamics, attack, and tone. Developing proper technique early prevents speed barriers later.</p>
            <h4 class="text-lg font-semibold mb-2 text-slate-800">1. Holding the Pick</h4>
            <p class="mb-4 text-slate-600">Place the pick flat on the side of your first finger, and lock it down with your thumb. The thumb and pick should form a <strong>90-degree angle</strong>. The tip of the pick should extend roughly <strong>1/4 to 1/2 of an inch</strong> past your thumb.</p>
            <h4 class="text-lg font-semibold mb-2 text-slate-800">2. Hand Stabilization (Bracing)</h4>
            <p class="mb-4 text-slate-600">For accurate string switching, you need hand stability. The most common method is <strong>pinky bracing</strong>: rest your right hand's pinky finger lightly on the soundboard (or pickguard) right below the first string. You don't need to press hard; this provides a constant spatial anchor.</p>
            <h4 class="text-lg font-semibold mb-2 text-slate-800">3. Picking Motion</h4>
            <p class="text-slate-600">Generate the picking stroke from a slight rotation of your wrist, not your entire arm. Keep your hand relaxed to avoid muscle fatigue.</p>
          </div>
        `
      },
      {
        title: "Proper Left Hand Technique",
        contentHtml: `
          <div class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold mb-4 text-slate-800">Proper Left Hand Technique</h3>
            <p class="mb-4 text-slate-600">Left-hand technique determines note clarity and chord transitions. Poor form leads to muted notes and wrist strain.</p>
            <div class="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-r-xl mb-6">
              <strong>CRITICAL RULE:</strong> Wrist low, thumb flat. Never wrap your palm flat against the back of the neck.
            </div>
            <h4 class="text-lg font-semibold mb-3 text-slate-800">Key Guidelines for the Fretting Hand:</h4>
            <ol class="list-decimal pl-6 mb-6 text-slate-600 space-y-2">
              <li><strong>Thumb Position:</strong> Keep your thumb flat against the back of the neck on the upper side. Avoid hooking it over the top of the neck unless performing specialized bends later.</li>
              <li><strong>Wrist Position:</strong> Keep your wrist low and curved. There should be a visible pocket of air space between your palm and the neck of the guitar.</li>
              <li><strong>Fretting:</strong> Press strings down using the very tips of your fingers. Press close to the metal fret wire, but not directly on top of it, to secure a clean ring without buzz.</li>
              <li><strong>Finger Curve:</strong> Your middle fingers (2 and 3) should come straight onto the board. Your first and fourth fingers curve slightly inward to cover their fret zones.</li>
            </ol>
          </div>
        `
      },
      { title: "The Names of the Strings", contentHtml: "" },
      { title: "Tuning the Guitar", contentHtml: "" },
      { title: "How to Read Guitar Tablature", contentHtml: "" },
      { title: "Finger Exercises", contentHtml: "" },
      { title: "How to Read Chord Blocks", contentHtml: "" },
      { title: "The C and G7 Chords", contentHtml: "" }
    ]
  },
  {
    orderIndex: 2,
    title: "Session 2: Reading Music & Notes on the 1st & 2nd Strings",
    subtopics: [
      { title: "How to Read Music", contentHtml: "" },
      { title: "Rhythm & Note Duration", contentHtml: "" },
      { title: "1st & 2nd String Notes & Exercises", contentHtml: "" },
      { title: "Ode To Joy Practice", contentHtml: "" },
      { title: "Jingle Bells Practice", contentHtml: "" }
    ]
  },
  {
    orderIndex: 3,
    title: "Session 3: Notes on the 3rd & 4th Strings",
    subtopics: [
      { title: "Ties, Dots & Repeat Signs", contentHtml: "" },
      { title: "Eighth Notes Introduction", contentHtml: "" },
      { title: "3rd & 4th String Notes & Exercises", contentHtml: "" },
      { title: "Yankee Doodle Song", contentHtml: "" },
      { title: "When The Saints Go Marchin' In", contentHtml: "" },
      { title: "Aura Lee Song", contentHtml: "" }
    ]
  },
  {
    orderIndex: 4,
    title: "Session 4: Notes on the 5th & 6th Strings",
    subtopics: [
      { title: "5th & 6th String Notes & Exercises", contentHtml: "" },
      { title: "Sharps, Flats, Natural Signs", contentHtml: "" },
      { title: "Am & E Chords", contentHtml: "" },
      { title: "Minuet in C", contentHtml: "" },
      { title: "Simple Gifts", contentHtml: "" },
      { title: "The Star Spangled Banner", contentHtml: "" },
      { title: "Minuet in G", contentHtml: "" }
    ]
  },
  {
    orderIndex: 5,
    title: "Session 5: Basic Open Chords",
    subtopics: [
      { title: "Open Chords & Chord Exercises 1-3", contentHtml: "" },
      { title: "Morning Has Broken", contentHtml: "" },
      { title: "America The Beautiful", contentHtml: "" }
    ]
  },
  {
    orderIndex: 6,
    title: "Session 6: Minor Seventh & Suspended Chords",
    subtopics: [
      { title: "Minor Seventh & Suspended Chords", contentHtml: "" },
      { title: "Strumming Patterns", contentHtml: "" },
      { title: "Scarborough Fair", contentHtml: "" },
      { title: "Greensleeves", contentHtml: "" },
      { title: "Island Groove", contentHtml: "" }
    ]
  },
  {
    orderIndex: 7,
    title: "Session 7: Barre Chords on the 6th String",
    subtopics: [
      { title: "Half-Steps & Whole Steps", contentHtml: "" },
      { title: "6th String Barre Chords & Exercises", contentHtml: "" },
      { title: "Major Scales Breakdown", contentHtml: "" },
      { title: "Home on the Range", contentHtml: "" },
      { title: "Yellow Rose of Texas", contentHtml: "" }
    ]
  },
  {
    orderIndex: 8,
    title: "Session 8: Barre Chords on the 5th String",
    subtopics: [
      { title: "5th String Barre Chords & Exercises", contentHtml: "" },
      { title: "Keys & Key Signatures", contentHtml: "" },
      { title: "Relative Major & Minor", contentHtml: "" },
      { title: "Jamaica Farewell (Key of F)", contentHtml: "" },
      { title: "Jamaica Farewell (Key of G)", contentHtml: "" }
    ]
  },
  {
    orderIndex: 9,
    title: "Session 9: The Secret to Great Strumming",
    subtopics: [
      { title: "Strumming Technique Worksheets", contentHtml: "" },
      { title: "Intervals Breakdown", contentHtml: "" },
      { title: "La Bamba Song", contentHtml: "" },
      { title: "The Wabash Cannonball", contentHtml: "" },
      { title: "Blues in E Strum", contentHtml: "" }
    ]
  },
  {
    orderIndex: 10,
    title: "Session 10: Fingerstyle Guitar",
    subtopics: [
      { title: "Technique & Exercises", contentHtml: "" },
      { title: "Merle Travis Picking", contentHtml: "" },
      { title: "House of the Rising Sun", contentHtml: "" },
      { title: "Canon in D Fingerstyle", contentHtml: "" }
    ]
  },
  {
    orderIndex: 11,
    title: "Session 11: Pentatonic Scales",
    subtopics: [
      { title: "Pentatonic Scales and Forms", contentHtml: "" },
      { title: "A Minor Pentatonic Blues Exercise", contentHtml: "" },
      { title: "G Major Pentatonic Exercise", contentHtml: "" },
      { title: "Around the Pentatonic World Workout", contentHtml: "" }
    ]
  },
  {
    orderIndex: 12,
    title: "Session 12: Advanced Chords",
    subtopics: [
      { title: "Two Chords Shapes", contentHtml: "" },
      { title: "Major 7th Chords", contentHtml: "" },
      { title: "Minor 11th Chords", contentHtml: "" },
      { title: "Chord Substitution Rules", contentHtml: "" },
      { title: "Rockin' Exercise", contentHtml: "" },
      { title: "Suspended Smooth Exercise", contentHtml: "" },
      { title: "Acoustic Groove Song", contentHtml: "" }
    ]
  },
  {
    orderIndex: 13,
    title: "Session 13: Playing the Blues",
    subtopics: [
      { title: "The Blues Scale Notes", contentHtml: "" },
      { title: "Minor Pentatonic with Blues Notes", contentHtml: "" },
      { title: "Blues Chord Progressions (12-Bar)", contentHtml: "" },
      { title: "Blues Triads & Worksheets", contentHtml: "" },
      { title: "Jammin the Blues Track", contentHtml: "" },
      { title: "Johnny's E Blues Piece", contentHtml: "" }
    ]
  },
  {
    orderIndex: 14,
    title: "Session 14: Giving Your Playing Some Style",
    subtopics: [
      { title: "Slides and Bends", contentHtml: "" },
      { title: "Hammer-ons & Pull-offs", contentHtml: "" },
      { title: "Tapping & Harmonics", contentHtml: "" },
      { title: "Bending the Blues Solo", contentHtml: "" },
      { title: "Jazz Octaves", contentHtml: "" },
      { title: "The Funky Mute Technique", contentHtml: "" }
    ]
  },
  {
    orderIndex: 15,
    title: "Session 15: Electric Guitars-The Heart of Rock & Roll",
    subtopics: [
      { title: "Power Chords Patterns", contentHtml: "" },
      { title: "Chicken Pickin' country style", contentHtml: "" },
      { title: "Arpeggios & Country Bends", contentHtml: "" },
      { title: "Sliding 4ths", contentHtml: "" },
      { title: "Harmonized Major Scale", contentHtml: "" },
      { title: "Power Chord Rock Solo", contentHtml: "" },
      { title: "Power Riffs", contentHtml: "" }
    ]
  },
  {
    orderIndex: 16,
    title: "Session 16: Advanced Strumming",
    subtopics: [
      { title: "16th Notes Subdivision", contentHtml: "" },
      { title: "Complex Strumming Patterns", contentHtml: "" },
      { title: "Rolling Along Song", contentHtml: "" },
      { title: "A Little Bit Rocky Song", contentHtml: "" },
      { title: "Electric Funk Piece", contentHtml: "" }
    ]
  },
  {
    orderIndex: 17,
    title: "Session 17: Going Beyond the First Position",
    subtopics: [
      { title: "3 Notes per String Scales", contentHtml: "" },
      { title: "Movable Seventh Chords", contentHtml: "" },
      { title: "Triplet Scale Speed Practices", contentHtml: "" },
      { title: "Pop Ballad Groove Practice", contentHtml: "" },
      { title: "ZZ Shuffle Exercise", contentHtml: "" }
    ]
  },
  {
    orderIndex: 18,
    title: "Session 18: Jazz",
    subtopics: [
      { title: "Jazz Chords & Moving Voices", contentHtml: "" },
      { title: "Jazz Progressions (ii-V-I)", contentHtml: "" },
      { title: "Swingin Exercise", contentHtml: "" },
      { title: "Jazz Blues Progression", contentHtml: "" }
    ]
  },
  {
    orderIndex: 19,
    title: "Session 19: Soloing",
    subtopics: [
      { title: "Soloing Principles & Phrasing", contentHtml: "" },
      { title: "Ear Training Intervals", contentHtml: "" },
      { title: "Stevie's Groove Solo", contentHtml: "" }
    ]
  },
  {
    orderIndex: 20,
    title: "Session 20: All the Chords You Need To Know",
    subtopics: [
      { title: "Advanced Chord Formulas & Abbreviations", contentHtml: "" },
      { title: "Chord Inversions Rules", contentHtml: "" },
      { title: "Practicing Chord Inversions 1", contentHtml: "" },
      { title: "Practicing Chord Inversions 2", contentHtml: "" },
      { title: "Friend Song Study", contentHtml: "" },
      { title: "Funky Groove Song Study", contentHtml: "" }
    ]
  }
];

async function main() {
  console.log("Seeding DEVILSTONE Academy database with driver adapter...");

  // 1. Upsert a default student user
  const user = await prisma.user.upsert({
    where: { email: 'student@devilstone.academy' },
    update: {},
    create: {
      email: 'student@devilstone.academy',
    },
  });
  console.log(`Initialized student account: ${user.email}`);

  // 2. Clear old data to prevent duplication
  await prisma.subtopic.deleteMany({});
  await prisma.session.deleteMany({});
  console.log("Cleaned old curriculum sessions.");

  // 3. Populate sessions and subtopics
  for (const s of curriculum) {
    const session = await prisma.session.create({
      data: {
        title: s.title,
        orderIndex: s.orderIndex,
      },
    });

    console.log(`Created Session: ${session.title}`);

    for (let j = 0; j < s.subtopics.length; j++) {
      const sub = s.subtopics[j];
      const fallbackContent = `
        <div class="prose prose-slate max-w-none">
          <h3 class="text-2xl font-bold mb-4 text-slate-800">${sub.title}</h3>
          <p class="mb-4 text-slate-600">Welcome to this lesson topic in <strong>${s.title}</strong>.</p>
          <div class="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-r-xl mb-6">
            <strong>Lesson Under Construction:</strong> Detailed text summaries for this session are currently being indexed from the Learn & Master curriculum book.
          </div>
          <p class="text-slate-600">Please review the syllabus exercises and mark this topic as complete to track your overall course progress.</p>
        </div>
      `;

      await prisma.subtopic.create({
        data: {
          title: sub.title,
          contentHtml: sub.contentHtml || fallbackContent,
          orderIndex: j + 1,
          sessionId: session.id,
        },
      });
    }
    console.log(`└─ Populated ${s.subtopics.length} subtopics.`);
  }

  console.log("DEVILSTONE Academy database seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
