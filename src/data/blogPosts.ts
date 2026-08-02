export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  tag: string;
  author: string;
  body: Block[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "free-fire-sensitivity-settings-guide",
    title: "Free Fire Sensitivity Settings: A Complete Guide for Tournament Players",
    excerpt:
      "Sensitivity is the single biggest thing separating casual players from tournament finalists. Here is how to build a setup that actually fits your thumbs, your phone and your playstyle.",
    date: "July 28, 2026",
    isoDate: "2026-07-28",
    readTime: "8 min",
    tag: "Guide",
    author: "VeloRix Esports Desk",
    body: [
      {
        type: "p",
        text: "Every week we watch hundreds of Free Fire matches inside VeloRix tournaments. The pattern is painfully consistent: players lose winnable fights not because their aim is bad, but because their sensitivity setup is fighting them. Their crosshair overshoots at close range, then feels like it is stuck in mud when they try to track someone at 60 metres. If that sounds familiar, this guide is for you.",
      },
      {
        type: "p",
        text: "There is no universal 'pro' sensitivity. A player on a 6.4-inch phone with a 60Hz panel needs a very different setup than someone on a 6.9-inch 120Hz device. What we can give you is a repeatable method to find your numbers, plus the reasoning behind each slider so you stop copy-pasting settings from YouTube thumbnails.",
      },
      { type: "h2", text: "What each slider actually controls" },
      {
        type: "ul",
        items: [
          "General: your hip-fire and camera look speed. This is the slider you use most in a match, and the one people set far too high.",
          "Red Dot: aim speed while using a red dot sight. Mostly relevant for close and mid-range MP40, M1887 and UMP fights.",
          "2x Scope: your bread-and-butter mid-range scope for AR duels at 30-60 metres.",
          "4x Scope: long-range control. High values here turn small thumb movements into wild swings.",
          "AWM Scope: sniper control. Almost always the lowest number in your profile.",
          "Free Look: purely for peeking while running. It does not affect your aim at all, so max it out.",
        ],
      },
      { type: "h2", text: "The 20-minute calibration routine" },
      {
        type: "p",
        text: "Do this in Training Ground, not in a ranked match. You want a controlled environment where you can repeat the same movement fifty times.",
      },
      {
        type: "ol",
        items: [
          "Start with General at 95, Red Dot 90, 2x at 75, 4x at 55, AWM at 40, Free Look 100. This is a neutral baseline, not a final answer.",
          "Stand still and do a 180-degree turn with one thumb swipe. If you overshoot past your target consistently, drop General by 5. If you cannot complete the turn in one swipe, raise it by 5.",
          "Move to the shooting range and fire ten controlled bursts at a mid-range target with an AR. Watch where your crosshair drifts during recoil, not where the bullets land.",
          "Repeat the burst test with a 2x scope. If your crosshair jumps above the head after four bullets, lower 2x by 5 and try again.",
          "Finish with three AWM shots at the longest target. If micro-adjustments feel twitchy, lower AWM by 5 until small thumb movements produce small crosshair movements.",
          "Play three full matches with the result. Do not change anything mid-session — muscle memory needs at least a few hours to adapt.",
        ],
      },
      {
        type: "quote",
        text: "Change one slider at a time, then play at least three matches before changing anything else. Players who tweak everything after every death never build muscle memory.",
      },
      { type: "h2", text: "Device matters more than people admit" },
      {
        type: "p",
        text: "Screen size changes the physical distance your thumb travels for the same in-game rotation. A larger screen means more travel, which usually means you need slightly higher sensitivity values to complete a turn in one swipe. Refresh rate matters too: on a 120Hz panel the extra frames make high sensitivity feel controllable, while the same numbers on a 60Hz screen feel like the camera is teleporting.",
      },
      {
        type: "p",
        text: "Thermal throttling is the silent killer. Ten minutes into a match your phone gets hot, your framerate drops from 60 to 45, and your carefully tuned sensitivity suddenly feels wrong. If you are playing a tournament, take the case off, avoid charging while playing, and lower graphics to Smooth so your frame pacing stays stable from the first circle to the last.",
      },
      { type: "h2", text: "Claw, thumb and the layout question" },
      {
        type: "p",
        text: "Two-finger thumb players generally want slightly higher General sensitivity, because one thumb is doing both movement and camera work. Four-finger claw players can afford lower values across the board since their index fingers handle fire and jump, freeing the thumbs for finer camera control. If you are moving from thumb to claw, expect two weeks of feeling worse before you feel better. That dip is normal and almost everyone quits during it.",
      },
      {
        type: "p",
        text: "Custom HUD placement deserves as much attention as sensitivity. Put the fire button where your finger already rests, not where a pro placed theirs. Make the scope button large enough that you never miss it under pressure, and keep the crouch and jump buttons far enough apart that you never crouch when you meant to vault.",
      },
      { type: "h2", text: "Common mistakes we see in tournament lobbies" },
      {
        type: "ul",
        items: [
          "Maxing every slider to 100 because a highlight reel said so. Maximum sensitivity makes tracking almost impossible at range.",
          "Copying a settings screenshot from a creator who plays on a completely different device.",
          "Changing sensitivity between matches of the same tournament. Lock your profile before the first match starts.",
          "Ignoring gyroscope. If your device has a good gyro, a moderate gyro setting with slightly lower touch sensitivity gives the best of both worlds.",
          "Never testing settings under pressure. Training Ground has no adrenaline; your thumbs behave differently in a final circle.",
        ],
      },
      { type: "h2", text: "A starting point for three playstyles" },
      {
        type: "p",
        text: "Aggressive rusher: General 100, Red Dot 95, 2x 80, 4x 55, AWM 40. You want fast camera turns for close-quarters chaos and you rarely take long-range fights.",
      },
      {
        type: "p",
        text: "Balanced fragger: General 90, Red Dot 85, 2x 72, 4x 50, AWM 35. This is the safest profile for tournament play, where you take fights at every range.",
      },
      {
        type: "p",
        text: "Support and sniper: General 80, Red Dot 75, 2x 65, 4x 45, AWM 28. Lower numbers reward patience and precise long-range corrections.",
      },
      {
        type: "p",
        text: "Treat all of these as starting points, run the calibration routine on top, and write your final numbers down somewhere. Game updates occasionally reset settings, and rebuilding your profile from memory in the ten minutes before a tournament is the worst possible way to start a match.",
      },
    ],
  },
  {
    slug: "bgmi-tournament-strategy-rotations",
    title: "BGMI Tournament Strategy: How Good Squads Think About Rotations",
    excerpt:
      "Placement points win tournaments, and placement comes from rotations. A practical breakdown of zone reading, vehicle discipline and the mistakes that eliminate squads in the third circle.",
    date: "July 21, 2026",
    isoDate: "2026-07-21",
    readTime: "9 min",
    tag: "Strategy",
    author: "VeloRix Esports Desk",
    body: [
      {
        type: "p",
        text: "In casual BGMI matches you can play like a headless chicken and still finish top ten. In a tournament with points tables and multiple matches, that approach falls apart immediately. Consistent squads score points across every match, and the biggest lever on consistency is not aim — it is rotation.",
      },
      {
        type: "p",
        text: "A rotation is simply the journey from where you are to where you want to be when the circle closes. Doing it well means arriving early, arriving alive, and arriving in a position you can hold. Doing it badly means dying in an open field to three teams who arrived before you.",
      },
      { type: "h2", text: "Read the zone, not just the circle" },
      {
        type: "p",
        text: "Most players look at the circle and run toward the centre. Better squads ask three questions the moment the zone appears: which parts of this circle have cover, which teams are already inside it, and which route gets us there without crossing open ground.",
      },
      {
        type: "p",
        text: "The centre of the circle is usually the worst place to be. It is the most contested area, it is often open, and every team pushing in has an angle on you. Edge positions with hard cover and a wall at your back are almost always better, even if they cost you a little rotation later.",
      },
      { type: "h2", text: "The three rotation windows" },
      {
        type: "ul",
        items: [
          "Early (circles 1-2): You have time. Loot properly, secure a vehicle, and take the safe route even if it is longer. There is no reward for arriving first in the first circle.",
          "Mid (circles 3-5): This is where tournaments are decided. Compounds are getting claimed, and there are still enough teams alive that open ground is fatal. Commit to a target building before you move, not after.",
          "Late (circles 6+): Space collapses. You are no longer choosing a compound, you are choosing an angle. Utility becomes more valuable than ammunition.",
        ],
      },
      { type: "h2", text: "Vehicle discipline" },
      {
        type: "p",
        text: "Vehicles are the most misused tool in amateur tournament play. They are loud, they draw attention, and they get squads killed at exactly the wrong moment. Three rules that will save you points:",
      },
      {
        type: "ol",
        items: [
          "Never drive into the final third of your rotation. Park 150-200 metres out from your target compound and approach on foot.",
          "Never leave your vehicle in front of the building you occupy. It is a flag telling every squad in the area exactly where you are.",
          "Never rotate in a vehicle without a designated driver who does not shoot. Someone who splits attention between driving and firing does both badly.",
        ],
      },
      { type: "h2", text: "Communication that actually helps" },
      {
        type: "p",
        text: "The average squad voice channel during a rotation is noise. The fix is not talking less, it is standardising what gets said. Callouts should contain three pieces of information: direction, distance and status.",
      },
      {
        type: "quote",
        text: "'Two enemies, north-east, 80 metres, in the two-storey, one knocked.' That is a callout. 'Behind you bro they are here' is panic with extra steps.",
      },
      {
        type: "p",
        text: "Assign an in-game leader before the match, not during it. The IGL calls the rotation target and the timing to move. Everyone else can suggest, but only one person decides. Squads that vote on every decision lose the fight while they are still debating it.",
      },
      { type: "h2", text: "Fight selection is a scoring decision" },
      {
        type: "p",
        text: "In a points tournament, a kill is worth a fixed number of points and dying is worth losing all your remaining placement potential. That maths should drive your decisions. Taking a fifty-fifty fight in circle three for one kill is usually a bad trade. Taking the same fight in circle seven when the kill secures your position is a good one.",
      },
      {
        type: "p",
        text: "The exception is third-party opportunities. If two squads are already fighting and you can arrive with full health and a flank angle, that is not a fifty-fifty, that is free points. Discipline means waiting for those moments instead of manufacturing fights you did not need.",
      },
      { type: "h2", text: "Utility usage that separates tiers" },
      {
        type: "ul",
        items: [
          "Carry at least two smokes per player in the late game. Smoke is how you cross open ground, revive teammates and break sightlines.",
          "Use frags to force rotations, not to get kills. A grenade that moves an enemy out of hard cover has done its job even if it deals zero damage.",
          "Molotovs deny space. Throwing one into a doorway during a push buys your team five seconds, which is often the entire fight.",
          "Save one smoke for the final circle. Squads that run out of utility in the last zone are entirely at the mercy of whoever still has some.",
        ],
      },
      { type: "h2", text: "Reviewing your matches" },
      {
        type: "p",
        text: "The fastest improvement any tournament squad can make costs nothing: watch your own deaths. After each tournament, go through every match and answer one question per death — was this a mechanical loss or a positional loss? If more than half your deaths are positional, no amount of aim training will fix your placement.",
      },
      {
        type: "p",
        text: "Keep a simple log across tournaments: map, drop location, circle where you died, and cause. After ten matches, patterns appear that are invisible match to match. Almost every squad we have talked to discovers they die in the same circle, in the same way, on the same map.",
      },
    ],
  },
  {
    slug: "how-anti-cheat-works-in-velorix",
    title: "How Anti-Cheat Works in VeloRix Tournaments",
    excerpt:
      "Cheaters are the fastest way to kill a tournament community. Here is an honest look at the layers we use to catch them, what we can detect, and what we cannot.",
    date: "July 14, 2026",
    isoDate: "2026-07-14",
    readTime: "7 min",
    tag: "Engineering",
    author: "VeloRix Engineering",
    body: [
      {
        type: "p",
        text: "Ask any Indian mobile gamer why they stopped using a tournament app and the answer is almost always the same: hackers. Someone with auto-headshot walks into a paid lobby, wins, and the organiser either does not notice or does not care. We built VeloRix after losing entry fees to exactly that, so this is the part of the product we are most opinionated about.",
      },
      {
        type: "p",
        text: "This post is not a marketing page. We want to be specific about what our system does and equally specific about its limits, because any platform claiming a hundred percent cheat-free environment is lying to you.",
      },
      { type: "h2", text: "Layer one: identity and entry" },
      {
        type: "p",
        text: "Most cheating is repeat behaviour by a small number of accounts. Making it expensive to create new identities removes a surprising share of the problem before a match even starts. Every VeloRix account is tied to a verified contact method, and we track device fingerprints so that a banned player cannot simply register again on the same phone in five minutes.",
      },
      {
        type: "p",
        text: "We also require in-game IDs to be locked before a tournament closes registration. Late ID swaps are a classic trick used to sneak a smurf or a hired ringer into a lobby that was advertised as a beginner bracket.",
      },
      { type: "h2", text: "Layer two: statistical anomaly detection" },
      {
        type: "p",
        text: "Cheating produces numbers that honest play does not. We aggregate per-match results and flag accounts whose statistics sit far outside the distribution for their bracket. The signals we weigh most heavily:",
      },
      {
        type: "ul",
        items: [
          "Headshot ratio that stays abnormally high across many matches, not just one hot game.",
          "Kill counts that are inconsistent with survival time — twenty kills in four minutes is not a good day, it is a script.",
          "Damage-per-match curves with no variance. Real players have bad games; aimbots do not.",
          "Win rate concentrated in specific lobby types, which usually indicates coordinated account sharing.",
          "New accounts posting veteran-level statistics from their very first tournament.",
        ],
      },
      {
        type: "quote",
        text: "A statistical flag is never an automatic ban. It is a signal that pushes a match into human review, and nothing more.",
      },
      { type: "h2", text: "Layer three: evidence and human review" },
      {
        type: "p",
        text: "Every tournament result can be disputed by participants within a fixed window after the match ends. Disputes require evidence — a clip, a screenshot, a recording. Our moderators review the evidence against the flagged statistics rather than acting on either alone.",
      },
      {
        type: "p",
        text: "For prize-pool tournaments, payouts are held until the dispute window closes. This is deliberately inconvenient. It is also the only way to avoid paying a cheater and then being unable to recover the money.",
      },
      { type: "h2", text: "Layer four: room integrity" },
      {
        type: "p",
        text: "A large share of what players call 'hacking' is actually organiser fraud: fake room IDs, rooms that never start, passwords leaked to friends, or results announced without a match ever happening. We treat this as part of the same problem.",
      },
      {
        type: "ul",
        items: [
          "Room credentials are released to registered participants only, at a fixed time before the match.",
          "Every credential release, result submission and prize distribution is written to an immutable audit log.",
          "Organisers cannot edit results after the dispute window closes without leaving a visible trail.",
        ],
      },
      { type: "h2", text: "What we cannot do" },
      {
        type: "p",
        text: "We are a tournament platform, not the game developer. We do not have kernel-level access to your device, we do not read the game's memory, and we do not install anything invasive on your phone. That is a deliberate privacy choice, and it comes with a real cost: we cannot detect a cheat at the moment it executes the way an in-game anti-cheat can.",
      },
      {
        type: "p",
        text: "What we can do is make cheating unprofitable. If a cheater's account is flagged, their payout is held, their evidence is reviewed and their device is banned, the economics stop working. Most cheating in mobile tournaments is opportunistic rather than sophisticated, and removing the easy money removes most of it.",
      },
      { type: "h2", text: "How to help" },
      {
        type: "p",
        text: "Record your matches when a prize pool is involved. Screen recording costs you almost nothing and turns a 'he said, she said' dispute into a five-minute decision. When you report someone, include the match ID, the timestamp and what specifically looked wrong. Reports that say only 'he was hacking' are the hardest ones to act on, and they are unfortunately the most common.",
      },
    ],
  },
  {
    slug: "beginners-guide-to-mobile-esports-tournaments",
    title: "A Beginner's Guide to Joining Your First Mobile Esports Tournament",
    excerpt:
      "Never played a competitive lobby before? Here is exactly what happens from registration to results, what to prepare, and how not to embarrass yourself in your first match.",
    date: "July 7, 2026",
    isoDate: "2026-07-07",
    readTime: "7 min",
    tag: "Guide",
    author: "VeloRix Esports Desk",
    body: [
      {
        type: "p",
        text: "The gap between playing ranked matches with friends and entering an organised tournament feels enormous from the outside. In practice it is a handful of small, learnable steps. This guide walks through the entire process so your first tournament is about playing well rather than figuring out what is happening.",
      },
      { type: "h2", text: "Step 1: Pick the right bracket" },
      {
        type: "p",
        text: "The most common beginner mistake is entering a high-stakes tournament first. Start with a free-entry or low-entry lobby aimed at newcomers. You are not there to win money, you are there to learn how a scheduled competitive match feels. The pressure of a tournament lobby is genuinely different from ranked, and the first time you feel it should not cost you anything.",
      },
      {
        type: "p",
        text: "Read the tournament description carefully. It should state the game mode, map, squad size, scoring system, prize distribution and match schedule. If any of that is missing, do not register. A vague tournament listing is the single clearest warning sign of a badly run event.",
      },
      { type: "h2", text: "Step 2: Register early and correctly" },
      {
        type: "ol",
        items: [
          "Enter your in-game name and ID exactly as they appear in the game. A typo here is the number one reason players get refused entry to a room.",
          "If you are entering as a squad, make sure every member registers before the deadline. Half-registered squads usually get disqualified.",
          "Note the match time in your own timezone and set an alarm fifteen minutes before.",
          "Check whether the organiser needs you in a Discord or WhatsApp channel for room credentials.",
        ],
      },
      { type: "h2", text: "Step 3: Prepare your device" },
      {
        type: "ul",
        items: [
          "Charge to full and keep a charger nearby, but do not play while charging if your phone gets hot.",
          "Close background apps, and turn on Do Not Disturb. A call in the middle of a final circle has ended more tournament runs than any hacker.",
          "Test your internet. Mobile data and Wi-Fi both work; what matters is stability, not raw speed. A stable 10 Mbps beats an unstable 200 Mbps.",
          "Verify the game is updated. Mandatory updates released hours before a match are common and they will lock you out of the lobby.",
          "Warm up for ten to fifteen minutes before the match. Cold hands lose first fights.",
        ],
      },
      { type: "h2", text: "Step 4: The lobby" },
      {
        type: "p",
        text: "Room credentials are typically shared ten to fifteen minutes before the scheduled start. Join immediately, take a screenshot of the lobby showing your name in it, and wait. That screenshot is your evidence if anything goes wrong later.",
      },
      {
        type: "p",
        text: "Do not leave the room once you have joined, even if the start is delayed. Delays of five to ten minutes are normal while the organiser waits for slots to fill. Leaving and rejoining is how people lose their slot.",
      },
      { type: "h2", text: "Step 5: Playing your first competitive match" },
      {
        type: "p",
        text: "Expect a slower, more cautious game than ranked. In tournaments, placement usually carries as much weight as kills, so most squads avoid early fights. If you drop hot out of habit and die in the first two minutes, your tournament is effectively over.",
      },
      {
        type: "quote",
        text: "Survive to the third circle in your first tournament and you have already outperformed most first-timers.",
      },
      {
        type: "p",
        text: "Play for information. Note where teams land, which compounds get contested, and how the lobby behaves in the mid-game. That knowledge is worth more than the couple of kills you might have picked up by rushing.",
      },
      { type: "h2", text: "Step 6: Results and disputes" },
      {
        type: "p",
        text: "Results are usually posted within thirty to sixty minutes of the final match. Check your own numbers against the posted table. If something looks wrong, raise a dispute within the stated window and attach your screenshots. Complaining in a group chat three days later will not get your points back.",
      },
      { type: "h2", text: "Common first-tournament mistakes" },
      {
        type: "ul",
        items: [
          "Registering with the wrong in-game ID.",
          "Missing the room credential message because notifications were off.",
          "Changing sensitivity or HUD settings minutes before the match.",
          "Playing on a phone at 8 percent battery.",
          "Dropping hot out of habit in a placement-weighted format.",
          "Not recording the match, then having no evidence when a dispute comes up.",
        ],
      },
      {
        type: "p",
        text: "None of these are skill problems, which is the encouraging part. Fix the logistics and your first tournament becomes a fair test of how you actually play. That is all anyone competitive is really looking for.",
      },
    ],
  },
  {
    slug: "optimising-android-for-competitive-gaming",
    title: "Optimising a Budget Android Phone for Competitive Gaming",
    excerpt:
      "You do not need a flagship to compete. A practical, no-nonsense breakdown of the settings that actually improve frame stability on mid-range and older Android devices.",
    date: "June 30, 2026",
    isoDate: "2026-06-30",
    readTime: "8 min",
    tag: "Engineering",
    author: "VeloRix Engineering",
    body: [
      {
        type: "p",
        text: "A large share of Indian mobile gamers play on devices between 8,000 and 20,000 rupees. Most 'optimisation' advice targets flagship owners and is useless at that price point, or worse, recommends sketchy booster apps that make things slower. Here is what actually moves the needle, based on testing across dozens of budget and mid-range Android phones.",
      },
      { type: "h2", text: "Frame stability beats frame rate" },
      {
        type: "p",
        text: "A locked 40 frames per second feels dramatically better in a fight than an average of 55 that swings between 30 and 70. Your brain adapts to a consistent frame time; it cannot adapt to a stutter. Every recommendation below is aimed at stability rather than a bigger number in a benchmark.",
      },
      { type: "h2", text: "In-game settings that matter" },
      {
        type: "ul",
        items: [
          "Graphics quality: choose Smooth. The visual downgrade is minor and the frame time improvement is large.",
          "Frame rate: choose the highest setting your device can hold for ten straight minutes, not the highest it can reach for one minute.",
          "Shadows: off. Shadows are one of the most expensive effects relative to how little competitive value they add.",
          "Anti-aliasing: off. On a small display the difference is barely visible.",
          "Auto-adjust graphics: off. Mid-match quality switching causes exactly the frame time swings you are trying to eliminate.",
        ],
      },
      { type: "h2", text: "System-level changes" },
      {
        type: "ol",
        items: [
          "Free up storage. Android performance degrades noticeably when internal storage passes about 85 percent full. Keep at least 15 percent free.",
          "Restrict background activity for social and shopping apps, which are the biggest silent CPU consumers.",
          "Turn off auto-sync while gaming. Photo backup starting mid-match is a genuine cause of stutter.",
          "Disable animations in Developer Options — set window, transition and animator scale to 0.5x or off. This will not increase in-game FPS but makes the whole device more responsive.",
          "Enable Do Not Disturb. Notification pop-ups steal input focus at the worst times.",
          "Uninstall so-called booster and RAM-cleaner apps. They aggressively kill processes that Android then has to restart, which costs more performance than it saves.",
        ],
      },
      { type: "h2", text: "Heat is the real enemy" },
      {
        type: "p",
        text: "Budget phones do not have vapour chambers. After roughly ten to fifteen minutes of sustained load, the processor reduces clock speeds to protect itself, and your frame rate drops. Nothing in software fixes physics, but a few things help:",
      },
      {
        type: "ul",
        items: [
          "Remove the case before a long session. Cases are insulation.",
          "Never play while charging. Charging and gaming together produce heat from two sources at once.",
          "Play in a cooler room or in front of a fan. This sounds trivial and it measurably works.",
          "Lower screen brightness slightly. The display is one of the largest heat and power consumers.",
          "Between tournament matches, put the phone down and let it cool for a few minutes instead of queueing casual games.",
        ],
      },
      { type: "h2", text: "Network stability on mobile data" },
      {
        type: "p",
        text: "Most competitive mobile gaming in India happens on 4G or 5G rather than home broadband. Ping spikes matter far more than average ping. If you consistently see spikes, try locking your network mode instead of leaving it on automatic — constant switching between 4G and 5G in a weak-signal area causes exactly the interruptions that get you killed.",
      },
      {
        type: "p",
        text: "If you are on Wi-Fi, sit closer to the router and prefer the 5GHz band when the signal allows it. Ask people at home not to start large downloads during your match. This is unglamorous advice and it prevents more losses than any settings tweak.",
      },
      { type: "h2", text: "How we build for low-end devices" },
      {
        type: "p",
        text: "On our side, we design VeloRix assuming a 2GB RAM device on an unreliable connection. That shapes concrete decisions: aggressive caching so repeat visits load from local storage, GPU-accelerated CSS animations rather than JavaScript-driven ones, image formats sized for the device requesting them, and screens that render useful content before all data has arrived.",
      },
      {
        type: "p",
        text: "If the app or site feels slow on your device, tell us which phone and which screen. Vague reports are hard to act on; a specific device and screen combination usually leads to a fix within a release or two.",
      },
    ],
  },
  {
    slug: "esports-tournament-formats-explained",
    title: "Tournament Formats Explained: Points Tables, Brackets and Round Robin",
    excerpt:
      "Battle royale points systems, single elimination, double elimination and Swiss — what each format rewards, and which one suits the tournament you want to play or host.",
    date: "June 23, 2026",
    isoDate: "2026-06-23",
    readTime: "8 min",
    tag: "Guide",
    author: "VeloRix Esports Desk",
    body: [
      {
        type: "p",
        text: "Format decides strategy. A squad that dominates a single-elimination bracket can finish mid-table in a points-based series, and vice versa. Whether you are entering a tournament or hosting one, understanding what each format rewards is the difference between a competition that feels fair and one that feels arbitrary.",
      },
      { type: "h2", text: "Battle royale points systems" },
      {
        type: "p",
        text: "The standard format for Free Fire and BGMI tournaments. Squads play a set number of matches and accumulate points from placement plus kills. A typical structure awards 12 points for first place, scaling down to 1 point for tenth, with one point per kill.",
      },
      {
        type: "p",
        text: "The placement-to-kill ratio is the single most important design decision in this format. Weight placement heavily and you get slow, positional, sometimes boring matches. Weight kills heavily and you get chaos, early fights and higher variance. Most well-run tournaments sit in the middle, roughly balanced so that a first-place finish is worth about the same as ten kills.",
      },
      {
        type: "ul",
        items: [
          "Strengths: many teams compete simultaneously, results reflect consistency across matches, one bad match does not eliminate you.",
          "Weaknesses: needs several matches to be meaningful, and lobby composition can create luck-based imbalances.",
          "Best for: open tournaments with 12 to 25 squads and enough time for at least four matches.",
        ],
      },
      { type: "h2", text: "Single elimination" },
      {
        type: "p",
        text: "Lose once and you are out. Fast, dramatic, easy to understand and easy to run, which is why it dominates one-day events. The cost is accuracy: a strong team that meets another strong team in round one goes home early, and the bracket says nothing useful about who was actually second best.",
      },
      {
        type: "ul",
        items: [
          "Strengths: fastest possible format, high tension in every match, minimal scheduling complexity.",
          "Weaknesses: high variance, half the field plays only one match, seeding errors have permanent consequences.",
          "Best for: 1v1 or small-squad head-to-head modes with tight time limits.",
        ],
      },
      { type: "h2", text: "Double elimination" },
      {
        type: "p",
        text: "Every team must lose twice to be eliminated, with a winners bracket and a losers bracket. Considerably more accurate than single elimination and considerably more work to organise. The final often includes a bracket reset, where the team coming from the losers side must win two series to take the title.",
      },
      {
        type: "ul",
        items: [
          "Strengths: a single bad match does not end your run, results correlate much better with actual skill.",
          "Weaknesses: roughly twice the matches, complex scheduling, and the format confuses newer players.",
          "Best for: serious competitions with prize pools worth protecting from variance.",
        ],
      },
      { type: "h2", text: "Round robin" },
      {
        type: "p",
        text: "Everyone plays everyone. It is the fairest format that exists and also the least practical: eight teams means twenty-eight matches. It works well for small leagues played across weeks, and almost never for a single-day event.",
      },
      { type: "h2", text: "Swiss system" },
      {
        type: "p",
        text: "Underused in Indian mobile esports and genuinely worth considering. Teams play a fixed number of rounds, and each round pairs teams with similar records. Nobody is eliminated early, strong teams naturally meet strong teams by the later rounds, and the total match count stays manageable.",
      },
      {
        type: "quote",
        text: "Swiss gives you most of the accuracy of round robin at a fraction of the match count. For a 16-team event, five Swiss rounds usually produce a credible top four.",
      },
      { type: "h2", text: "Choosing a format as an organiser" },
      {
        type: "ol",
        items: [
          "Count your available hours first. Format follows time, not the other way around.",
          "Decide whether you are optimising for fairness or for spectacle. Both are legitimate; pretending you can maximise both is not.",
          "Publish the full scoring system before registration opens, including tiebreakers. Undefined tiebreakers are the most common source of post-tournament arguments.",
          "Define what happens if a match cannot be completed — server issues, mass disconnects, or a room that fails to start.",
          "Keep the format stable once registration opens. Changing rules mid-tournament destroys trust faster than anything else an organiser can do.",
        ],
      },
      {
        type: "p",
        text: "The best format is the one your players understand before they register. A slightly less accurate system that everyone comprehends will always produce a healthier competition than a technically superior one nobody can follow.",
      },
    ],
  },
  {
    slug: "avoiding-tournament-scams",
    title: "How to Spot a Tournament Scam Before You Pay the Entry Fee",
    excerpt:
      "Fake prize pools, vanishing organisers and rooms that never start. The warning signs every Indian mobile gamer should know before handing over an entry fee.",
    date: "June 16, 2026",
    isoDate: "2026-06-16",
    readTime: "6 min",
    tag: "Community",
    author: "VeloRix Community Team",
    body: [
      {
        type: "p",
        text: "Ask around any Free Fire or BGMI community and you will hear the same story: someone paid 50 rupees to enter a tournament, the room never opened, and the organiser's account disappeared. The amounts are small enough that nobody bothers pursuing them, which is precisely why the scam works at scale.",
      },
      {
        type: "p",
        text: "We run a tournament platform, so we have an obvious interest here. But this advice applies regardless of where you play, including on us. Judge every organiser by the same checklist.",
      },
      { type: "h2", text: "Warning signs before you pay" },
      {
        type: "ul",
        items: [
          "Prize pool advertised without a stated slot count. If 100 slots at 50 rupees cannot fund the advertised 20,000 rupee prize, the maths is a lie.",
          "Payment requested to a personal UPI ID with no platform, invoice or receipt in between.",
          "No published rules, scoring system or tiebreakers.",
          "Registration closing 'in 10 minutes' as pure pressure. Urgency is the oldest trick in the book.",
          "A brand new social account with a few hundred followers running a tournament with a large prize pool.",
          "No visible history: no past results, no winner announcements, no player feedback anyone can verify.",
          "Organiser blocks or deletes comments asking about previous payouts.",
        ],
      },
      { type: "h2", text: "Do the prize pool maths" },
      {
        type: "p",
        text: "This one calculation eliminates most scams. Multiply the entry fee by the number of slots. If the advertised prize pool is more than about 70 percent of that figure, ask where the rest of the money comes from. Legitimate organisers with a sponsor will say so proudly. Scammers get defensive or go quiet.",
      },
      {
        type: "quote",
        text: "A tournament that cannot explain where its prize money comes from does not have any.",
      },
      { type: "h2", text: "Warning signs during the event" },
      {
        type: "ul",
        items: [
          "Room credentials shared late, or repeatedly delayed with vague explanations.",
          "The organiser or their friends playing in a tournament they also administer.",
          "Rules changing after the first match has been played.",
          "Results posted as plain text with no screenshots of the final scoreboards.",
          "Winners announced who nobody in the lobby remembers seeing.",
        ],
      },
      { type: "h2", text: "Protecting yourself" },
      {
        type: "ol",
        items: [
          "Start with free tournaments from any new organiser. Let them earn your entry fee.",
          "Screenshot everything: the tournament listing, the prize terms, the payment confirmation and the final lobby.",
          "Record your matches when money is involved.",
          "Never pay through a channel that leaves no record, and never share your game account credentials with anyone for any reason.",
          "Ask in the community before entering. Scam organisers are usually already known to somebody.",
        ],
      },
      { type: "h2", text: "What a trustworthy platform should give you" },
      {
        type: "p",
        text: "Whether or not you use VeloRix, hold every tournament platform to these standards: published rules before registration, prize distribution stated in writing, a dispute window with real human review, an audit trail for results, and a support channel that answers. If any of those are missing, your entry fee is a donation with extra steps.",
      },
      {
        type: "p",
        text: "If you have been scammed, report the account to the platform it operated on and share the details with your community. It rarely gets your money back, but it makes the next round of victims smaller. Most of these operators rely entirely on nobody talking to each other.",
      },
    ],
  },
  {
    slug: "building-a-competitive-squad",
    title: "Building a Competitive Squad That Does Not Fall Apart in Two Weeks",
    excerpt:
      "Roles, practice structure, handling losses and the uncomfortable conversations. What actually keeps an amateur esports squad together long enough to get good.",
    date: "June 9, 2026",
    isoDate: "2026-06-09",
    readTime: "8 min",
    tag: "Community",
    author: "VeloRix Community Team",
    body: [
      {
        type: "p",
        text: "Most amateur squads die the same way. Four friends decide to go competitive, play brilliantly for a week, lose three tournaments in a row, start blaming each other, and quietly stop showing up. The skill was never the problem. The structure was.",
      },
      { type: "h2", text: "Define roles before you define goals" },
      {
        type: "p",
        text: "A squad where everyone plays the same way is four players competing for the same job. Clear roles remove that friction and make communication far shorter, because everyone already knows who is doing what.",
      },
      {
        type: "ul",
        items: [
          "In-game leader: calls rotations and decides fights. Needs decisiveness more than the best aim in the squad.",
          "Entry fragger: takes the first contact in a push. Highest-risk role, and the one that most needs the rest of the squad's trust.",
          "Support: carries utility, revives, holds flanks. Unglamorous and the reason good squads survive to late circles.",
          "Sniper or long-range: watches open ground, provides information, punishes rotations. Usually the most patient player.",
        ],
      },
      {
        type: "p",
        text: "Assign roles based on temperament, not on who wants which one. The player who panics under pressure should not be your IGL, however much they enjoy talking.",
      },
      { type: "h2", text: "Practice with structure" },
      {
        type: "p",
        text: "Playing random matches together is not practice, it is hanging out. Both are valuable, but only one improves your tournament results. A practical weekly structure for an amateur squad:",
      },
      {
        type: "ol",
        items: [
          "One session focused purely on mechanics: training ground, aim drills, recoil control. Individual work, done separately.",
          "One session of scrims against another squad, played with tournament rules and tournament seriousness.",
          "One review session where you watch two of your own matches and note only positional mistakes.",
          "One casual session with no goals, because a squad that never has fun together stops existing.",
        ],
      },
      {
        type: "quote",
        text: "Two focused hours a week beats twenty unfocused ones. Almost every squad that improves does less total playing and more deliberate practice.",
      },
      { type: "h2", text: "Reviewing without blaming" },
      {
        type: "p",
        text: "Review sessions destroy more squads than losses do, because they turn into arguments. One rule fixes this: critique decisions, not people. 'We pushed that compound without smoke' is a decision. 'You always push like an idiot' is an attack, and it ends the useful part of the conversation.",
      },
      {
        type: "p",
        text: "Let each player call out their own biggest mistake first. When everyone has already admitted one, the atmosphere changes completely and people stop defending themselves.",
      },
      { type: "h2", text: "Handling a losing streak" },
      {
        type: "p",
        text: "Every squad hits a run of bad results. What matters is what you do in week three of it. The instinct is to change the roster; that is almost always wrong. Roster changes reset chemistry, and chemistry is usually what you were actually missing.",
      },
      {
        type: "ul",
        items: [
          "Drop down a tier of tournaments for a few weeks and rebuild confidence with achievable competition.",
          "Pick one specific weakness and work on only that until it stops appearing in reviews.",
          "Take a scheduled week off. Burnout looks exactly like a skill plateau and is treated very differently.",
          "Talk about whether everyone still wants the same thing. Mismatched ambition is the real reason most squads break up.",
        ],
      },
      { type: "h2", text: "The uncomfortable conversations" },
      {
        type: "p",
        text: "At some point a squad has to decide whether it is a group of friends who play, or a competitive team that happens to be friends. Both are fine. Pretending to be the second while behaving like the first is what generates resentment.",
      },
      {
        type: "p",
        text: "Agree in advance on attendance expectations, how prize money is split, and what happens if someone cannot commit anymore. Writing it down when everyone is happy is far easier than negotiating it after a tournament you won. Squads that survive their first year almost always had these conversations early, awkward as they felt at the time.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);