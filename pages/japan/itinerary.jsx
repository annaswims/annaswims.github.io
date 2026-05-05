import { useState } from "react";

const familyColors = {
  Chris: "#7a9cbf",
  Anna: "#c4816a",
  Zoe: "#9b7fc7",
  Emily: "#5faa82",
  Family: "#d4b896",
};

const days = [
  {
    day: 1, date: "Sat Jul 11 → Sun Jul 12", location: "Indianapolis → Tokyo", emoji: "✈️",
    color: "#7a9cbf", tags: ["Travel Day"],
    summary: "Depart Indianapolis morning of July 11. Cross the date line. Arrive Tokyo evening of July 12.",
    morningWalk: null,
    pairings: [],
    schedule: [
      { time: "Morning Jul 11", type: "transport", icon: "✈️", label: "Depart IND — morning flight to connection (ORD or SEA)", detail: "Allow plenty of time at your connection airport. Book seats together in advance.", who: "Family" },
      { time: "Overnight", type: "transport", icon: "✈️", label: "Cross the Pacific — cross the date line", detail: "You lose July 11 crossing the date line. Try to sleep on the long leg. Arriving July 12 in Tokyo despite departing July 11 from Indianapolis.", who: "Family" },
      { time: "Afternoon Jul 12", type: "transport", icon: "🚉", label: "Arrive Narita (NRT) — clear immigration", detail: "Japan immigration is efficient. Have passports and landing cards ready. Everyone stays together. Allow 90min for immigration, customs, and bags.", who: "Family" },
      { time: "Evening Jul 12", type: "transport", icon: "🚅", label: "N'EX Narita Express → Shinjuku (~90min)", detail: "Buy N'EX Round-Trip Ticket at airport: ¥5,000/adult, ¥2,500/child. All reserved seats, direct to Shinjuku. No transfers.", who: "Family" },
      { time: "Evening Jul 12", type: "activity", icon: "🏨", label: "Check in — MIMARU Tokyo Shinjuku West", detail: "Two-bedroom apartment. Kids claim the tatami room. Short gentle walk around the block — just to feel Japan.", who: "Family" },
      { time: "Evening", type: "food", icon: "🍜", label: "First ramen — Shinjuku neighborhood", detail: "Find the nearest ramen shop. Chris and Zoe practice ordering in Japanese. Keep it simple. Early night.", who: "Family" },
      { time: "9:00pm", type: "sleep", icon: "😴", label: "Early night — reset to Tokyo time", detail: "Jet lag is real. Sleep by 9-10pm Tokyo time even if it feels wrong.", who: "Family" },
    ],
    notes: "You depart July 11 and arrive July 12 — the date line takes July 11 from you. Arrive, eat, sleep. Japan will still be there tomorrow."
  },
  {
    day: 2, date: "Mon Jul 13", location: "Tokyo — Harajuku, Shibuya & Akihabara", emoji: "🌸",
    color: "#e8a8c0", tags: ["Whole Family", "Fashion"],
    summary: "First full day in Japan. Ease in gently — jet lag lurks around 3pm.",
    morningWalk: { who: "Chris solo (+ Anna & Emily if awake)", route: "Shinjuku neighborhood streets at dawn. Specialty coffee shop on the way back.", duration: "~1 hour", coffee: "% Arabica or Bear Pond Espresso, Shinjuku area" },
    pairings: [],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris's morning walk — Shinjuku dawn streets", detail: "Solo, or with Anna and Emily if they wake. Dawn Tokyo is extraordinary — quiet, already alive. Good coffee on the return.", who: "Chris" },
      { time: "8:00am", type: "food", icon: "🏪", label: "First 7-Eleven run — warm-up for Zoe's konbini day later", detail: "Everyone chooses something. Zoe notes everything she wants to come back for.", who: "Family" },
      { time: "9:30am", type: "transport", icon: "🚇", label: "Shinjuku → Harajuku (JR Yamanote Line, ~10min)", detail: "Suica IC cards. Exit Harajuku Station, Takeshita exit. Everyone together.", who: "Family" },
      { time: "10:00am", type: "activity", icon: "🎀", label: "Takeshita Street — kawaii fashion, pink crepes", detail: "Emily's first big Japan moment. Both adults present. Zoe hunts soft goth pieces. Emily wants everything pink.", who: "Family" },
      { time: "11:00am", type: "activity", icon: "🌳", label: "Meiji Jingu Outer Garden — forested park walk", detail: "A vast ancient forested park in central Tokyo — beautiful architecture, community craft stalls at the edges. Anna spots the street art woven into the surrounding neighborhood.", who: "Family" },
      { time: "12:30pm", type: "food", icon: "🍱", label: "Lunch — Omotesando", detail: "Wide tree-lined boulevard. Find somewhere with outdoor seating in the shade.", who: "Family" },
      { time: "2:00pm", type: "rest", icon: "🌡️", label: "Midday rest — Shibuya indoor (Hikarie or 109)", detail: "July heat peaks 1-3pm. Air conditioning essential.", who: "Family" },
      { time: "4:00pm", type: "activity", icon: "🌇", label: "Shibuya Crossing + Shibuya Sky rooftop (~¥2,500/adult)", detail: "Time the crossing as a family, then the 4:30pm Shibuya Sky slot for golden hour views at 229m. Book in advance.", who: "Family" },
      { time: "6:00pm", type: "transport", icon: "🚇", label: "Shibuya → Akihabara (JR Yamanote Line, ~20min)", detail: "Zoe leads from here. Electric Town exit.", who: "Family" },
      { time: "6:30pm", type: "activity", icon: "🎮", label: "Akihabara — anime district evening", detail: "Multi-floor game centres, Ghibli goods, manga shops. Zoe and Emily lead. Anna and Chris follow. ~1.5 hours.", who: "Family" },
      { time: "8:00pm", type: "food", icon: "🍣", label: "Conveyor belt sushi near Akihabara", detail: "Zoe's perfect meal. Everyone picks exactly what they want. Chris orders in Japanese.", who: "Family" },
      { time: "9:00pm", type: "transport", icon: "🚇", label: "Akihabara → Shinjuku (JR Chuo Line, ~20min)", detail: "Back to MIMARU.", who: "Family" },
    ],
    notes: "Don't push through the 3pm jet lag wall. The indoor Shibuya rest is deliberate. Everyone will feel human again by 4pm."
  },
  {
    day: 3, date: "Tue Jul 14", location: "Tokyo — Konbini Morning, Asakusa & teamLab", emoji: "🏮",
    color: "#c8a882", tags: ["Whole Family", "Art"],
    summary: "Zoe's konbini morning. Historic architecture, yukata, and immersive digital art. Ghibli is closed today — perfectly timed for tomorrow.",
    morningWalk: { who: "Chris solo", route: "Nakameguro canal at dawn — one of Tokyo's most beautiful urban waterways. Canal-side cafes open at 7am.", duration: "~1.5 hours", coffee: "Nakameguro has some of Tokyo's best third-wave coffee" },
    pairings: [],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris's walk — Nakameguro canal at dawn", detail: "Solo. Canal at dawn is quiet and extraordinary. Canal-side cafes open at 7am. Returns by 8am.", who: "Chris" },
      { time: "8:00am", type: "food", icon: "🏪", label: "DEDICATED KONBINI MORNING — Zoe leads the family", detail: "The unhurried 7-Eleven experience Zoe has been waiting for. She has a list: onigiri (salmon, tuna mayo), egg salad sandwich, matcha latte, karaage, strawberry daifuku, tamagoyaki. Allow 45 minutes. This is a meal AND a cultural event.", who: "Family" },
      { time: "9:30am", type: "transport", icon: "🚇", label: "Shinjuku → Asakusa (Tokyo Metro Ginza Line, ~30min)", detail: "Suica cards.", who: "Family" },
      { time: "10:00am", type: "activity", icon: "🏯", label: "Senso-ji precinct — historic architecture & market walk", detail: "Tokyo's oldest and most spectacular historic building. The Kaminarimon gate, five-storey pagoda, incense courtyard — pure atmosphere. Anna explores backstreet craft galleries nearby.", who: "Family" },
      { time: "11:00am", type: "activity", icon: "👘", label: "Yukata rental — family dress-up (~¥3,000-4,000/person)", detail: "Hair styling for the girls. Wear them for the afternoon. Emily in yukata is the trip's first great photo.", who: "Family" },
      { time: "12:00pm", type: "food", icon: "🍡", label: "Nakamise street food lunch", detail: "Ningyo-yaki, melonpan, tempura sticks. Eat as you walk.", who: "Family" },
      { time: "1:30pm", type: "transport", icon: "🚇", label: "Asakusa → Toyosu (Yurikamome Line, ~30min)", detail: "Return yukata if rented. Head to Toyosu for teamLab.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "🌈", label: "teamLab Planets — immersive digital art (book in advance)", detail: "~¥3,600/adult, ¥1,500/child (4-12). Wear shorts — some rooms have shallow water. Extraordinary for all four. Allow 1.5-2 hours.", who: "Family" },
      { time: "5:30pm", type: "activity", icon: "🗼", label: "Tokyo Skytree — sunset observation deck (~¥2,100/adult)", detail: "Book the 6pm slot for golden hour into dusk. The best view of Tokyo available.", who: "Family" },
      { time: "7:30pm", type: "food", icon: "🍤", label: "Dinner — Asakusa tempura or tonkatsu", detail: "Traditional sit-down dinner near the historic district.", who: "Family" },
      { time: "9:00pm", type: "transport", icon: "🚇", label: "Asakusa → Shinjuku (~30min)", detail: "Home.", who: "Family" },
    ],
    notes: "Ghibli Museum is closed on Tuesdays — this day is perfectly arranged around that. Tomorrow is the big Ghibli day."
  },
  {
    day: 4, date: "Wed Jul 15", location: "Tokyo — Ghibli Museum Day 🌟", emoji: "🐱",
    color: "#a8c8a0", tags: ["Ghibli", "Must-Book", "Whole Family"],
    summary: "The most important day of the trip. Possibly ever, for Zoe and Emily.",
    morningWalk: { who: "Chris solo", route: "Inokashira Park at dawn — the park surrounding the Ghibli Museum. Walk the lake path. Coffee in Kichijoji before the family arrives.", duration: "~1 hour", coffee: "Kichijoji has wonderful independent coffee shops" },
    pairings: [],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris's walk — Inokashira Park at dawn", detail: "Solo. The park containing the museum at its most magical. Chris has seen the neighborhood before his family arrives.", who: "Chris" },
      { time: "8:30am", type: "food", icon: "☕", label: "Family breakfast — relaxed morning", detail: "Timed entry means no rush.", who: "Family" },
      { time: "9:30am", type: "transport", icon: "🚇", label: "Shinjuku → Kichijoji (Keio Inokashira Line, ~26min, ~¥220)", detail: "Direct to Kichijoji. Suica cards.", who: "Family" },
      { time: "10:00am", type: "activity", icon: "🐱", label: "STUDIO GHIBLI MUSEUM — timed entry", detail: "⚠️ BOOK JUNE 9 at 9pm Indianapolis time (10am JST June 10). Photography banned inside. Exclusive short film screened only here. Allow 2.5-3 hours. The building itself is a masterwork.", who: "Family" },
      { time: "12:30pm", type: "activity", icon: "🛍️", label: "GHIBLI MUSEUM GIFT SHOP — exclusive merchandise only here", detail: "The ONLY place on earth for these items. Budget deliberately — especially Zoe and Emily. Allow 45 minutes.", who: "Family" },
      { time: "1:30pm", type: "food", icon: "🌿", label: "Inokashira Park picnic or Kichijoji lunch", detail: "Konbini picnic in the park, or a sit-down in one of Kichijoji's excellent restaurants.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "🛒", label: "Kichijoji neighborhood — boutique exploration", detail: "Emily: mori girl boutiques, soft green pieces. Zoe: Donguri Republic Ghibli store. Anna: craft shops. Chris: Muji, slow cafe.", who: "Family" },
      { time: "5:00pm", type: "activity", icon: "☕", label: "Afternoon coffee — Kichijoji independent cafe", detail: "Chris's great afternoon cup. Everyone rests. The day has been enormous.", who: "Family" },
      { time: "6:00pm", type: "transport", icon: "🚇", label: "Kichijoji → Shinjuku (Keio Inokashira Line, ~26min)", detail: "Back to MIMARU.", who: "Family" },
      { time: "7:30pm", type: "food", icon: "🍜", label: "Celebratory dinner — Zoe and Emily choose", detail: "Ghibli Museum day deserves a celebration. Ramen is Zoe's call.", who: "Family" },
    ],
    notes: "⚠️ GHIBLI TICKETS: On sale June 9 at 9:00pm Indianapolis time (EDT) — that is 10:00am JST June 10 in Japan. Create your Lawson Ticket account NOW. Have payment details ready. Log in 15-30min early. Do NOT refresh repeatedly before 9pm — the site may block you. Museum requires ID matching ticket holder."
  },
  {
    day: 5, date: "Thu Jul 16", location: "Tokyo — Manga Workshop + Furoshiki + Anna's Solo Morning", emoji: "✏️",
    color: "#b8b0d8", tags: ["Split Day", "Art", "Craft"],
    summary: "The family divides by interest. Everyone does exactly their thing.",
    morningWalk: { who: "Chris solo (longer)", route: "Yanaka — Tokyo's most preserved old-town neighborhood. Cemetery lanes, tiny historic buildings, a kissaten (old-school Japanese coffee shop) for a slow, quiet cup.", duration: "~2 hours", coffee: "Yanaka's kissaten cafes are Tokyo institutions — slow and quiet" },
    pairings: [
      { pair: "Chris, Zoe & Emily", activity: "Manga & illustration workshop — 3 hours with a working Japanese illustrator. Character design, manga panel composition, expression techniques. Chris practices Japanese with the instructor. Emily draws her own Ghibli-inspired character." },
      { pair: "Anna Solo", activity: "Furoshiki fabric-wrapping workshop (1.5-2h) — the cloth she makes becomes her carry-all for the rest of the trip. Then: Isetan Shinjuku depachika food hall, completely alone, no agenda." },
      { pair: "Family (1:00pm)", activity: "Reunion lunch — Anna brings depachika discoveries. Everyone shares what they made, found, and drew." },
    ],
    schedule: [
      { time: "5:30am", type: "walk", icon: "☕", label: "Chris's walk — Yanaka old town", detail: "Solo. Wander the preserved streets, find a kissaten for a very slow, quiet morning cup. Return by 8am.", who: "Chris" },
      { time: "8:00am", type: "food", icon: "☕", label: "Quick family breakfast — split begins", detail: "Anna heads out first. Chris takes the girls to the workshop.", who: "Family" },
      { time: "9:00am", type: "activity", icon: "🎨", label: "ANNA: Furoshiki workshop — solo", detail: "1.5-2 hour workshop. The cloth she makes immediately becomes her trip carry-all.", who: "Anna" },
      { time: "9:30am", type: "activity", icon: "✏️", label: "CHRIS, ZOE & EMILY: Manga & illustration workshop (3h)", detail: "Working illustrator teaches character design and manga techniques. Book via Airbnb Experiences or Viator — English-taught sessions. Bring your own sketchbook.", who: "Chris, Zoe, Emily" },
      { time: "11:00am", type: "activity", icon: "🏬", label: "ANNA: Isetan Shinjuku depachika — solo wander", detail: "B1 and B2 food halls. No plan. Sample things. Buy things. Her own pace. Anna's quietly perfect morning.", who: "Anna" },
      { time: "1:00pm", type: "food", icon: "🍱", label: "Family reunion lunch — Anna brings the goods", detail: "Anna's depachika finds become the shared table. Zoe shows her manga character. Emily shows hers. Stories exchanged.", who: "Family" },
      { time: "3:00pm", type: "rest", icon: "😴", label: "Afternoon rest — MIMARU", detail: "Hot July afternoon. Girls watch Ghibli films. Chris journals. Anna reads.", who: "Family" },
      { time: "5:00pm", type: "activity", icon: "🌇", label: "Optional: Tokyo Metropolitan Government Building (FREE)", detail: "10min walk from MIMARU. Free observation deck at 202m. Open until 10:30pm.", who: "Family" },
      { time: "7:00pm", type: "food", icon: "🏮", label: "Dinner — Shinjuku Golden Gai or nearby izakaya", detail: "Small atmospheric bars and restaurants. Anna loves the community feel.", who: "Family" },
      { time: "Night", type: "activity", icon: "🧳", label: "LOGISTICS: Forward large bags to Kyoto via Yamato Transport", detail: "⚠️ Ask MIMARU front desk tonight. Forward to MIMARU Kyoto Shinmachi Sanjo. ~¥1,500-2,000/bag. Pack overnight bags for Hakone: change of clothes, toiletries, medications, valuables. Ryokan provides everything else.", who: "Family" },
    ],
    notes: "Book manga workshop well in advance. Klook, Viator, Airbnb Experiences have English-taught Tokyo options. The furoshiki cloth becomes one of Anna's most used objects for the rest of the trip."
  },
  {
    day: 6, date: "Fri Jul 17", location: "Tokyo — Sanrio Puroland + Shimokitazawa", emoji: "🎀",
    color: "#f0c0d0", tags: ["Split Day", "Emily Special", "Street Art"],
    summary: "Emily's dream day. Anna escorts the girls, then joins Chris for their best Tokyo afternoon.",
    morningWalk: { who: "Chris (then Anna joins)", route: "Shimokitazawa early — see the neighborhood before the shops open. Neighborhood cafe breakfast together before the day divides.", duration: "~1.5 hours", coffee: "Shimokitazawa independent cafes are excellent" },
    pairings: [
      { pair: "Anna escorts Zoe & Emily to Puroland, then returns", activity: "Anna accompanies the girls on the 35min Keio Line to Tama-Center Station, walks them into Puroland, confirms they're settled, then returns to Shimokitazawa. Puroland is fully enclosed, one entrance/exit, English signage throughout. Check-in texts every 2 hours." },
      { pair: "Anna & Chris (after escort)", activity: "Shimokitazawa street murals, vintage shops, independent galleries, long lunch together. Anna's Tokyo art-in-community day." },
      { pair: "Anna picks up Zoe & Emily at 5pm", activity: "Anna returns to Tama-Center for pickup. Everyone reconvenes at Shinjuku." },
    ],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris's walk — Shimokitazawa at dawn, then Anna joins", detail: "Chris explores the neighborhood. Anna joins at 7am. Quiet breakfast together — a mini morning date before the day splits.", who: "Chris, then Anna" },
      { time: "8:00am", type: "food", icon: "☕", label: "Quick family breakfast — Puroland prep", detail: "Load Zoe and Emily's Suica cards. ¥8,000 cash each. Both phones charged. Hotel address card in Japanese in Zoe's bag.", who: "Family" },
      { time: "9:00am", type: "transport", icon: "🚇", label: "ANNA escorts Zoe & Emily → Tama-Center (Keio Line, ~35min)", detail: "Anna accompanies all the way to Puroland entrance. Settles them in. Confirms meeting plan. Then returns to Shimokitazawa.", who: "Anna, Zoe, Emily" },
      { time: "9:30am", type: "activity", icon: "🎀", label: "ZOE & EMILY: Sanrio Puroland — all day", detail: "Fully indoors, air-conditioned, one entrance/exit, English signage. Hello Kitty character meets, pink food for Emily, Cinnamoroll boat ride, live shows, merchandise. Book online for up to 43% discount.", who: "Zoe, Emily" },
      { time: "10:30am", type: "activity", icon: "🎨", label: "ANNA & CHRIS: Shimokitazawa street art & community", detail: "Anna leads. Back-alley murals, independent galleries, art woven into neighborhood life.", who: "Anna, Chris" },
      { time: "12:00pm", type: "activity", icon: "👔", label: "Vintage shops + Muji for Chris", detail: "Anna scouts Zoe's vintage finds. Chris finds classic menswear pieces, possibly a bag.", who: "Anna, Chris" },
      { time: "1:30pm", type: "food", icon: "🥗", label: "ANNA & CHRIS: Long lunch in Shimokitazawa", detail: "Excellent independent restaurants. Take their time. Rare adult conversation.", who: "Anna, Chris" },
      { time: "3:00pm", type: "activity", icon: "📚", label: "Shimokitazawa continued — record shops, bookshops", detail: "Tokyo's best independent record stores and bookshops. The afternoon is theirs.", who: "Anna, Chris" },
      { time: "5:00pm", type: "transport", icon: "🚇", label: "ANNA: Return to Tama-Center to collect Zoe & Emily", detail: "Keio Line, ~35min. Everyone reconvenes at Shinjuku. The girls have stories.", who: "Anna, Zoe, Emily" },
      { time: "7:00pm", type: "food", icon: "🍛", label: "Family dinner — Shinjuku", detail: "Zoe and Emily report everything. Anna and Chris report Shimokitazawa.", who: "Family" },
    ],
    notes: "Puroland is completely contained — one building, one entrance, English throughout, exceptionally helpful staff. Anna's escort to/from handles the transport concern entirely."
  },
  {
    day: 7, date: "Sat Jul 18", location: "Tokyo → Hakone — Ryokan Night ♨️", emoji: "♨️",
    color: "#a0c0d8", tags: ["Whole Family", "Onsen", "Special Night"],
    summary: "Leave the city behind. Anna's most anticipated night of the trip.",
    morningWalk: { who: "Chris solo", route: "Final Tokyo morning — Koenji canal or Shinjuku neighborhood streets. Last great Tokyo coffee.", duration: "~45 minutes", coffee: "One final great Tokyo cup before the mountains" },
    pairings: [
      { pair: "Whole Family", activity: "Hakone Open Air Museum — Zoe and Emily explore the Picasso pavilion and foot-bath pool areas freely within the museum grounds while Anna and Chris take in the larger sculptures. All within the site." },
    ],
    schedule: [
      { time: "6:30am", type: "walk", icon: "☕", label: "Chris's final Tokyo walk", detail: "Short. Easy. Last Tokyo coffee. Returns by 7:30am.", who: "Chris" },
      { time: "8:00am", type: "food", icon: "☕", label: "Family breakfast + check-out", detail: "Large bags already forwarded to Kyoto. Hakone overnight bags only.", who: "Family" },
      { time: "9:00am", type: "transport", icon: "🚶", label: "Walk to Shinjuku Station — Odakyu platforms", detail: "10-15min walk. Buy Hakone Free Pass (2-day, ~¥6,100/adult) at Odakyu counter.", who: "Family" },
      { time: "9:30am", type: "transport", icon: "🚂", label: "ROMANCECAR — Shinjuku → Hakone-Yumoto (~85min)", detail: "Reserved seats — book in advance via EMot Online Tickets. Sit right side for mountain views.", who: "Family" },
      { time: "11:00am", type: "activity", icon: "🖼️", label: "Hakone Open Air Museum — art in nature", detail: "World-class sculpture in a beautiful outdoor landscape. Anna leads. Girls explore the Picasso pavilion and foot-bath areas within the grounds.", who: "Family" },
      { time: "1:00pm", type: "food", icon: "🍜", label: "Lunch — soba near museum", detail: "Hakone soba is a local specialty.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "⛵", label: "Lake Ashi pirate ship cruise (Hakone Free Pass)", detail: "Emily's most anticipated Hakone moment. 30-minute galleon cruise. Anna gets her lake water views.", who: "Family" },
      { time: "4:00pm", type: "activity", icon: "🌊", label: "Hakone Shrine lakeside gate — Anna's waterfront walk", detail: "The iconic gate rising from Lake Ashi. Forested approach. Anna walks the lake path slowly.", who: "Family" },
      { time: "5:00pm", type: "activity", icon: "🏨", label: "CHECK IN — Yoshiike Ryokan (private onsen)", detail: "Yukata for everyone. Tatami room, futon laid out later. Private onsen is yours anytime.", who: "Family" },
      { time: "5:30pm", type: "activity", icon: "♨️", label: "Private onsen — first family soak", detail: "Anna's moment. Emily is delighted. The mineral water is extraordinary.", who: "Family" },
      { time: "7:00pm", type: "food", icon: "🍱", label: "KAISEKI DINNER — served in your room", detail: "Multi-course traditional dinner. Beautiful presentation. Emily photographs every dish. Sake for Anna and Chris.", who: "Family" },
      { time: "9:00pm", type: "activity", icon: "♨️", label: "Evening onsen + inn garden walk in yukata", detail: "Second soak. Walk the garden. Futons laid out while you were at dinner.", who: "Family" },
    ],
    notes: "Book ryokan NOW. Confirm private onsen. Ryokan provides yukata, towels, toiletries — pack minimally for this one night."
  },
  {
    day: 8, date: "Sun Jul 19", location: "Hakone + Mt. Fuji — Chris's Day 🗻", emoji: "🗻",
    color: "#d0d8c0", tags: ["Split Day", "Adventure", "Chris Solo"],
    summary: "Chris climbs the mountain. The family loops Hakone. Everyone has their best day.",
    morningWalk: { who: "Chris solo — this IS his walk (all day)", route: "Pre-dawn transport to Mt. Fuji 5th Station. Full summit climb — 5-7h up, 3-4h down. Summit at 3,776m.", duration: "Full day", coffee: "Thermos from the ryokan. No coffee at the summit — just the view." },
    pairings: [
      { pair: "Chris Solo", activity: "Mt. Fuji summit climb — pre-dawn start. His most solitary, extraordinary moment." },
      { pair: "Anna, Zoe & Emily", activity: "Hakone Loop — Owakudani volcanic valley, Lake Ashi waterfront walk, pirate ship, Hakone Shrine gate. Anna gets her lake time." },
    ],
    schedule: [
      { time: "3:30am", type: "walk", icon: "🗻", label: "CHRIS: Pre-dawn transport to Mt. Fuji 5th Station", detail: "Book a guided group climb or pre-arranged car. ~90min to 5th Station. Begin climb at 5am.", who: "Chris" },
      { time: "5:00am", type: "activity", icon: "🗻", label: "CHRIS: Begin Fuji climb (2,305m → 3,776m)", detail: "Yoshida Trail. 5-7h up, 3-4h down. Summit temp ~10°C even in July. Layers, poles, thermos, snacks, headlamp essential. ¥2,000 trail conservation fee.", who: "Chris" },
      { time: "7:00am", type: "food", icon: "🍱", label: "FAMILY: Ryokan traditional breakfast — served in room", detail: "Miso soup, grilled fish, rice, pickles, tamagoyaki. Emily photographs it all.", who: "Anna, Zoe, Emily" },
      { time: "9:00am", type: "transport", icon: "🚠", label: "FAMILY: Hakone Ropeway → Owakudani (book timed entry)", detail: "~15min to Owakudani. Panoramic views. Covered by Hakone Free Pass.", who: "Anna, Zoe, Emily" },
      { time: "9:30am", type: "activity", icon: "🌋", label: "FAMILY: Owakudani volcanic valley", detail: "Sulphurous steam vents. Black volcanic eggs (kuro tamago) ¥500 for 5. Emily fascinated and slightly horrified. Zoe photographs the landscape.", who: "Anna, Zoe, Emily" },
      { time: "11:00am", type: "activity", icon: "🌊", label: "FAMILY: Lake Ashi waterfront walk — Anna's water moment", detail: "Bus from Owakudani to Moto-Hakone (Free Pass). Anna walks the lakeside path. Water, mountains, quiet.", who: "Anna, Zoe, Emily" },
      { time: "12:00pm", type: "food", icon: "🍜", label: "FAMILY: Lakeside soba lunch", detail: "Views over the lake. Hakone soba.", who: "Anna, Zoe, Emily" },
      { time: "12:00pm", type: "activity", icon: "🏔️", label: "CHRIS: Summit Mt. Fuji (3,776m)", detail: "Estimated summit arrival. Walk the crater rim. Take time. Views to Tokyo on clear days.", who: "Chris" },
      { time: "1:30pm", type: "activity", icon: "⛵", label: "FAMILY: Lake Ashi pirate ship cruise (Free Pass)", detail: "Emily's highlight. 30min galleon cruise. She will talk about this for years.", who: "Anna, Zoe, Emily" },
      { time: "4:30pm", type: "transport", icon: "🚂", label: "FAMILY: Romancecar → Shinjuku, then Shinkansen → Kyoto", detail: "Return Romancecar (Free Pass). Tokyo Station → Kyoto Nozomi: ~2h 15min, ¥14,170/adult. SIT RIGHT SIDE (D/E) — Mt. Fuji view!", who: "Anna, Zoe, Emily" },
      { time: "8:30pm", type: "activity", icon: "🏨", label: "FAMILY: Check in — MIMARU Kyoto Shinmachi Sanjo", detail: "Luggage already waiting (forwarded from Tokyo). Kyoto is immediately different — quieter, older, more refined.", who: "Anna, Zoe, Emily" },
      { time: "~Evening", type: "transport", icon: "🚅", label: "CHRIS: Descend + Shinkansen → Kyoto (flexible ticket)", detail: "Descend takes 3-4h. Shinkansen from Mishima or Gotemba to Kyoto. Joins family this evening or first thing tomorrow.", who: "Chris" },
    ],
    notes: "The logistically complex day. Brief everyone the night before. Anna has Free Pass and all Suica cards. Chris has climbing gear and return transport pre-booked."
  },
  {
    day: 9, date: "Mon Jul 20", location: "Kyoto — Recovery Day", emoji: "🌿",
    color: "#c8b8a0", tags: ["Recovery", "Gentle"],
    summary: "Gentle. Chris's legs need this. Everyone gets Kyoto-adjusted.",
    morningWalk: { who: "Chris (very short)", route: "Just enough to find coffee. His legs are destroyed after Fuji.", duration: "~30 minutes", coffee: "Nearest good coffee to MIMARU — this morning is about rest" },
    pairings: [
      { pair: "Anna & Chris", activity: "Kamo River walk together, then Japanese supermarket — their shared food love." },
      { pair: "Zoe & Emily (parent within half a block)", activity: "Teramachi covered arcade — manga and bookshops for Zoe, washi and stationery for Emily. Parent checks in regularly." },
    ],
    schedule: [
      { time: "7:00am", type: "walk", icon: "☕", label: "Chris's very gentle recovery walk", detail: "15-30 minutes maximum. He climbed a mountain yesterday.", who: "Chris" },
      { time: "9:00am", type: "food", icon: "☕", label: "Slow family breakfast — MIMARU kitchen", detail: "Use the kitchen. No schedule. No rush.", who: "Family" },
      { time: "10:30am", type: "activity", icon: "🌊", label: "ANNA & CHRIS: Kamo River walk", detail: "10-15min walk from MIMARU. The river runs through central Kyoto — locals on the stepped banks. Anna gets her riverside moment.", who: "Anna, Chris" },
      { time: "10:30am", type: "activity", icon: "📚", label: "ZOE & EMILY: Teramachi arcade (parent within half a block)", detail: "Covered arcade near MIMARU. Manga and bookshops for Zoe, washi paper and stationery for Emily.", who: "Zoe, Emily" },
      { time: "11:30am", type: "activity", icon: "🛒", label: "ANNA & CHRIS: Japanese supermarket visit", detail: "A full Japanese supermarket — bento, fresh sashimi, seasonal produce. Anna and Chris's shared food curiosity at full flow.", who: "Anna, Chris" },
      { time: "1:00pm", type: "food", icon: "🍜", label: "Nishiki Market — first taste (preview pass)", detail: "Family together. Anna samples everything. This is just the preview — full Nishiki time is Day 10.", who: "Family" },
      { time: "2:30pm", type: "rest", icon: "😴", label: "Long afternoon rest", detail: "Chris sleeps. Zoe draws. Emily looks at her Ghibli haul. Anna reads.", who: "Family" },
      { time: "5:30pm", type: "activity", icon: "🌅", label: "Kamo River evening walk — family", detail: "The riverbanks at dusk: locals, herons, fireflies in July. Beautiful and free.", who: "Family" },
      { time: "7:00pm", type: "food", icon: "🍣", label: "Dinner — Pontocho Alley", detail: "Narrow lantern-lit alley alongside the Kamo River. Find a restaurant with a riverside kawayuka terrace.", who: "Family" },
    ],
    notes: "The recovery day is not wasted. Kyoto reveals itself slowly. A gentle day here is part of experiencing the city properly."
  },
  {
    day: 10, date: "Tue Jul 21", location: "Kyoto — Nishiki Market + Gion Festival", emoji: "🎆",
    color: "#e8d0a8", tags: ["Whole Family", "Food", "Festival"],
    summary: "Anna's food market morning. Historic Kyoto. Extraordinary festival atmosphere at night.",
    morningWalk: { who: "Chris solo", route: "Kamo River north at dawn toward the mountains. Herons, turtles, monks crossing bridges. Coffee at a riverside kissaten.", duration: "~1 hour", coffee: "Riverside kissaten along the Kamo — slow and quiet" },
    pairings: [
      { pair: "Anna leads the family", activity: "Nishiki Market — she sets the pace, everyone follows." },
      { pair: "Anna & Chris (with girls in castle grounds)", activity: "Nijo Castle — significant historic fortification with famous 'nightingale floors.' Girls explore the grounds as a pair while parents take in the interior. All within the site." },
    ],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris's walk — Kamo River north at dawn", detail: "Solo. Pre-dawn river walk toward the mountains. Coffee at a riverside kissaten on the return.", who: "Chris" },
      { time: "9:30am", type: "activity", icon: "🛒", label: "NISHIKI MARKET — Anna leads, 2 hours", detail: "100+ vendors. Tsukemono, tofu, fresh dashi, warabi mochi, fresh sushi. Everyone samples constantly. Chris practices Japanese with vendors. Best before 11am.", who: "Family" },
      { time: "11:30am", type: "food", icon: "🍱", label: "Nishiki stall lunch — eat as you walk", detail: "The market constitutes a full meal if you sample strategically.", who: "Family" },
      { time: "1:30pm", type: "rest", icon: "🌡️", label: "Midday rest — department store air conditioning", detail: "July heat. Takashimaya nearby has excellent food floors too.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "🏯", label: "Nijo Castle — historic fortification & garden", detail: "Famous for its 'nightingale floors' that squeak underfoot. Girls explore the grounds together while Anna and Chris take in the interior — all within the castle site.", who: "Family" },
      { time: "5:00pm", type: "activity", icon: "🏘️", label: "Gion district — evening walk through historic machiya townhouses", detail: "Gion Matsuri runs ALL of July. Lantern-lit Hanamikoji Street. Anna is completely in her element here.", who: "Family" },
      { time: "6:30pm", type: "activity", icon: "🎆", label: "Gion Matsuri festival stalls", detail: "Food stalls throughout Gion. Takoyaki, yakisoba, kakigori shaved ice. Emily in yukata eating kakigori — the perfect Kyoto image.", who: "Family" },
      { time: "8:00pm", type: "food", icon: "🍜", label: "Dinner — Gion restaurant (book 4-6 weeks ahead)", detail: "Kaiseki-influenced set menu. Anna will love the progression of courses.", who: "Family" },
    ],
    notes: "Nishiki Market is best before 11am. The Gion Matsuri evening is one of the great Japan travel experiences — don't rush it."
  },
  {
    day: 11, date: "Wed Jul 22", location: "Kyoto — Arashiyama + Wild Monkeys", emoji: "🎋",
    color: "#a8c8a8", tags: ["Split Day", "Nature", "Animals"],
    summary: "Chris sees the bamboo grove twice. Wild macaques. The most beautiful river in Japan.",
    morningWalk: { who: "Chris solo (very early)", route: "Arashiyama Bamboo Grove at 6am — nearly alone in one of Japan's most famous places. Coffee at a riverside cafe before the family arrives.", duration: "~1.5 hours", coffee: "Riverside cafes in Arashiyama open early" },
    pairings: [
      { pair: "Anna & Emily", activity: "Iwatayama Monkey Park — 15min uphill hike to wild macaques roaming free. Emily's animal dream. Anna's wild nature encounter. ¥550/adult, ¥250/child." },
      { pair: "Chris & Zoe", activity: "Bamboo grove photography (Chris sees it again, now with Zoe), Tenryu-ji garden." },
      { pair: "Family", activity: "Sagano Scenic Railway and Togetsukyo Bridge river walk together." },
    ],
    schedule: [
      { time: "5:45am", type: "walk", icon: "☕", label: "Chris's walk — Bamboo Grove alone at dawn", detail: "Solo. Bus or taxi to Arashiyama (~30min). At 6am the bamboo grove may be nearly empty. Transcendent. Returns to meet family at 9am.", who: "Chris" },
      { time: "8:30am", type: "food", icon: "☕", label: "Family breakfast + travel prep", detail: "Quick breakfast, pack day bags.", who: "Family" },
      { time: "9:00am", type: "transport", icon: "🚇", label: "Family → Arashiyama (JR Sagano Line, ~15min, ¥240)", detail: "Kyoto Station → Saga-Arashiyama. Suica cards.", who: "Family" },
      { time: "9:15am", type: "activity", icon: "🎋", label: "Bamboo Grove — family visit", detail: "Chris has seen this at dawn alone. Now with his family. Both are magnificent. Zoe photographs relentlessly.", who: "Family" },
      { time: "10:00am", type: "activity", icon: "🐒", label: "ANNA & EMILY: Iwatayama Monkey Park", detail: "Short uphill hike. Wild Japanese macaques roaming free on the hillside. Emily's reaction will be the trip's most joyful moment.", who: "Anna, Emily" },
      { time: "10:00am", type: "activity", icon: "🌿", label: "CHRIS & ZOE: Tenryu-ji garden (~¥500/person)", detail: "UNESCO World Heritage garden. Pond garden backed by the Arashiyama mountains.", who: "Chris, Zoe" },
      { time: "11:30am", type: "food", icon: "🍜", label: "Lunch — riverside restaurant", detail: "Anna gets her water views over lunch. Outdoor riverside decks available.", who: "Family" },
      { time: "1:00pm", type: "activity", icon: "🚂", label: "Sagano Scenic Railway — book in advance (¥880/person)", detail: "25min through mountain gorge. Outdoor cars in summer. The most beautiful train journey in Japan.", who: "Family" },
      { time: "2:30pm", type: "activity", icon: "🌉", label: "Togetsukyo Bridge — Anna's river moment", detail: "The iconic bridge over the Oi River. Anna walks it slowly. This is exactly what she came for.", who: "Family" },
      { time: "3:30pm", type: "transport", icon: "🚇", label: "Arashiyama → Kyoto (JR Sagano Line, ~15min)", detail: "Back to MIMARU.", who: "Family" },
      { time: "7:30pm", type: "food", icon: "🍣", label: "Dinner — Shijo-Kawaramachi area", detail: "Walking distance from MIMARU. Everyone chooses tonight.", who: "Family" },
    ],
    notes: "Monkey park hike is 15min uphill — both Anna and Emily will find it completely worth it."
  },
  {
    day: 12, date: "Thu Jul 23", location: "Kyoto — Fushimi Inari + Calligraphy + Cooking Class", emoji: "⛩️",
    color: "#d8a8a0", tags: ["Split Day", "Art", "Cooking", "Chris Solo"],
    summary: "Pre-dawn torii gates. Calligraphy for Chris and Zoe. The whole family cooks together.",
    morningWalk: { who: "Chris solo (unmissable)", route: "Fushimi Inari torii gates before sunrise — at 5am you may have the 5,000+ gates nearly alone. Extraordinary early light.", duration: "~2 hours", coffee: "Coffee at the base before going up, or bring a thermos" },
    pairings: [
      { pair: "Chris & Zoe", activity: "Calligraphy workshop — language and art together. Their shared intellectual world." },
      { pair: "Anna & Emily", activity: "Kinkaku-ji Golden Pavilion and surrounding garden. Emily's aesthetic photo of the trip. Parent present throughout." },
      { pair: "Whole Family (afternoon)", activity: "Cooking class together in a machiya townhouse — Kyoto cuisine, then eat what you made." },
    ],
    schedule: [
      { time: "4:45am", type: "walk", icon: "☕", label: "Chris's pre-dawn walk — Fushimi Inari ALONE", detail: "Solo. JR Nara Line: Kyoto → Inari Station, 5min, ¥150. At 5am the gates may be nearly deserted. Return by 7:30am.", who: "Chris" },
      { time: "7:30am", type: "food", icon: "☕", label: "Family breakfast + split prep", detail: "Pack art materials for calligraphy.", who: "Family" },
      { time: "9:00am", type: "activity", icon: "🏯", label: "Fushimi Inari — family walk together (30-45min up)", detail: "Chris sees it again with his family — completely different energy from dawn. Zoe photographs everything.", who: "Family" },
      { time: "10:30am", type: "transport", icon: "🚇", label: "ANNA & EMILY → Kinkaku-ji (city bus, ~40min)", detail: "North Kyoto. Anna and Emily together.", who: "Anna, Emily" },
      { time: "10:30am", type: "transport", icon: "🚇", label: "CHRIS & ZOE → Calligraphy workshop (Gion/Nishiki area)", detail: "~1.5-2 hour session. Search 'Kyoto calligraphy experience English'.", who: "Chris, Zoe" },
      { time: "11:00am", type: "activity", icon: "🖌️", label: "CALLIGRAPHY WORKSHOP — Chris & Zoe", detail: "Brush writing. Zoe writes words from her Japanese study. Chris writes his name in kanji. Both take pieces home as genuine art.", who: "Chris, Zoe" },
      { time: "11:00am", type: "activity", icon: "🏯", label: "KINKAKU-JI — Anna & Emily", detail: "The golden pavilion reflected in the pond. Emily's most aesthetic photo of the trip. ~1.5 hours. Parent present throughout.", who: "Anna, Emily" },
      { time: "1:00pm", type: "food", icon: "🍱", label: "Family reconvenes — light lunch", detail: "Don't eat heavily — the cooking class means you eat what you make for dinner.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "🍳", label: "KYOTO COOKING CLASS — 3 hours in a machiya townhouse", detail: "100+ year-old townhouse kitchen. Kyoto cuisine: dashi broth, miso, seasonal vegetables, wagashi sweets for Emily. Anna is in her element — craft, community, and food in one setting.", who: "Family" },
      { time: "6:00pm", type: "food", icon: "🍱", label: "DINNER IS THE COOKING CLASS MEAL", detail: "You eat what you cooked together. The machiya setting makes it extraordinary.", who: "Family" },
      { time: "7:30pm", type: "transport", icon: "🚶", label: "Evening walk home through Gion", detail: "Hanamikoji Street at night during Gion Matsuri. Walk slowly.", who: "Family" },
    ],
    notes: "Cooking class at 3pm means you avoid peak heat. The class meal replaces dinner cost."
  },
  {
    day: 13, date: "Fri Jul 24", location: "Kyoto — Shibori + Nara + Date Night 💙", emoji: "💙",
    color: "#a0b8d0", tags: ["Date Night", "Craft", "Animals", "Special"],
    summary: "Everyone has their perfect day. And their perfect evening.",
    morningWalk: { who: "Chris solo", route: "Philosopher's Path at dawn — 2km stone canal walk, Japan's most beautiful urban path. At 5:30am it may be entirely yours.", duration: "~1.5 hours", coffee: "Cafes open along the path around 7am" },
    pairings: [
      { pair: "Anna & Emily", activity: "Indigo shibori dyeing workshop — mother and daughter making something beautiful together. WEAR OLD CLOTHES. Indigo stains permanently. Emily's piece will be her most treasured souvenir." },
      { pair: "Chris & Zoe", activity: "Nara day trip — wild deer, giant Buddha, Japanese practice with locals." },
      { pair: "Anna & Chris (evening)", activity: "Date night — Gion dinner and sake bar. Stay in Gion (~15min walk from hotel). Home by 10pm." },
      { pair: "Zoe & Emily (hotel evening)", activity: "Konbini run within hotel block only, then room, then Ghibli film marathon. Check-in texts every 90 minutes." },
    ],
    schedule: [
      { time: "5:30am", type: "walk", icon: "☕", label: "Chris's walk — Philosopher's Path at dawn", detail: "Solo. The 2km stone canal path — Japan's most beautiful urban walk. Nearly yours at 5:30am.", who: "Chris" },
      { time: "8:00am", type: "food", icon: "☕", label: "Family breakfast — then split", detail: "Anna and Emily head to shibori. Chris and Zoe to Kyoto Station for Nara.", who: "Family" },
      { time: "9:00am", type: "activity", icon: "🎨", label: "ANNA & EMILY: Shibori indigo dyeing workshop (~2h)", detail: "Book in advance. CRITICAL: wear old clothes — indigo stains permanently. Both make their own unique wearable piece.", who: "Anna, Emily" },
      { time: "9:00am", type: "transport", icon: "🚅", label: "CHRIS & ZOE → Nara (JR Nara Line, ~45min, ¥720)", detail: "From Kyoto Station. No reservation needed.", who: "Chris, Zoe" },
      { time: "10:00am", type: "activity", icon: "🦌", label: "CHRIS & ZOE: Nara deer park", detail: "~1,200 free-roaming deer. Buy shika senbei crackers (¥200). The deer bow then mug you aggressively for more. Hilarious. Zoe practices Japanese with vendors.", who: "Chris, Zoe" },
      { time: "11:30am", type: "activity", icon: "🏯", label: "CHRIS & ZOE: Todai-ji — great Buddha hall", detail: "World's largest wooden building. Giant bronze Buddha. Try to fit through the famous wooden pillar hole.", who: "Chris, Zoe" },
      { time: "1:00pm", type: "food", icon: "🍜", label: "CHRIS & ZOE: Lunch in Nara", detail: "Kakinoha-zushi (persimmon leaf sushi) — a Nara specialty.", who: "Chris, Zoe" },
      { time: "11:00am", type: "activity", icon: "🛍️", label: "ANNA & EMILY: Teramachi craft shops after workshop", detail: "Both wearing their new shibori pieces already. Browse craft and textile shops together.", who: "Anna, Emily" },
      { time: "2:30pm", type: "transport", icon: "🚅", label: "CHRIS & ZOE → back to Kyoto (~45min)", detail: "Rest before the evening.", who: "Chris, Zoe" },
      { time: "4:30pm", type: "rest", icon: "😴", label: "Family rest + date night prep", detail: "Anna gets ready. Zoe and Emily briefed: konbini run within hotel block only, then room. Phones charged, both parent numbers saved.", who: "Family" },
      { time: "5:00pm", type: "activity", icon: "🏪", label: "ZOE & EMILY: Konbini run — hotel block only", detail: "One trip, within the block. Emily gets every beautiful pink and green thing. Zoe gets every untried snack. Back by 5:30pm.", who: "Zoe, Emily" },
      { time: "6:00pm", type: "activity", icon: "💙", label: "ANNA & CHRIS: Date night — Gion restaurant", detail: "Book 4-6 weeks in advance. Small atmospheric room. Chef's menu. Sake. ~15min walk from MIMARU. Stay in Gion all evening.", who: "Anna, Chris" },
      { time: "6:00pm", type: "activity", icon: "🎬", label: "ZOE & EMILY: Ghibli film night in the room", detail: "Spirited Away queued. Snacks arranged. Check-in texts to parents every 90 minutes.", who: "Zoe, Emily" },
      { time: "8:30pm", type: "activity", icon: "🥃", label: "ANNA & CHRIS: Sake bar — Gion lantern-lit alleys", detail: "A small sake bar after dinner. Gion Matsuri at night. The most beautiful neighbourhood in Japan.", who: "Anna, Chris" },
      { time: "10:00pm", type: "transport", icon: "🚶", label: "ANNA & CHRIS: Walk home through Gion", detail: "15-20min walk back. Check on the girls when you return.", who: "Anna, Chris" },
    ],
    notes: "Book Gion restaurant NOW. Anna and Chris stay in Gion — 15min walk from hotel — reachable in minutes if needed. Girls are in the room with phones charged."
  },
  {
    day: 14, date: "Sat Jul 25", location: "Kyoto → Osaka — Food Day + Tenjin Matsuri Fireworks 🎆", emoji: "🦑",
    color: "#e8b870", tags: ["Whole Family", "Food", "Festival", "Grand Finale"],
    summary: "Final Kyoto morning. Osaka arrival. Tenjin Matsuri — AND the fireworks tonight.",
    morningWalk: { who: "Chris, Anna & Emily", route: "Nishiki Market at opening (8am) — quiet and beautiful. Anna's final Kyoto market pass.", duration: "~1 hour", coffee: "Kyoto kissaten — slow, quiet, the right farewell cup" },
    pairings: [
      { pair: "Anna & Chris", activity: "Kuromon Ichiba Market deep dive + Japanese supermarket — their shared food love at peak." },
      { pair: "Zoe & Emily (one parent within half a block)", activity: "Dotonbori neon photography and street food." },
    ],
    schedule: [
      { time: "6:00am", type: "walk", icon: "☕", label: "Chris, Anna & Emily — Nishiki Market at opening", detail: "All three slip out early. Nishiki at 8am is quiet and wonderful. Last Kyoto coffee.", who: "Chris, Anna, Emily" },
      { time: "8:30am", type: "food", icon: "☕", label: "Family breakfast — final Kyoto morning", detail: "MIMARU kitchen. Last morning together in Kyoto.", who: "Family" },
      { time: "9:30am", type: "activity", icon: "🛒", label: "Nishiki Market — Anna's final Kyoto food shopping", detail: "Miso, yatsuhashi, tsukemono sets, matcha, mirin. Gifts and ingredients for cooking Japanese food back in Indianapolis.", who: "Family" },
      { time: "10:30am", type: "activity", icon: "🧳", label: "LOGISTICS: Forward bags to Osaka via Yamato Transport", detail: "⚠️ Ask MIMARU front desk. Forward to MIMARU Osaka Namba Station. Pack day bags only for the journey.", who: "Family" },
      { time: "11:30am", type: "food", icon: "🍱", label: "Final Kyoto lunch — everyone chooses their favourite", detail: "Last Kyoto meal.", who: "Family" },
      { time: "1:00pm", type: "transport", icon: "🚅", label: "Hankyu Limited Express → Osaka Umeda (~44min, ¥400/person)", detail: "Kawaramachi Station (10min walk from MIMARU) → Umeda. No reservation needed.", who: "Family" },
      { time: "1:45pm", type: "transport", icon: "🚇", label: "Umeda → Namba (Osaka Metro Midosuji Line, ~10min, ¥230)", detail: "Suica cards. Exit Namba Station.", who: "Family" },
      { time: "2:00pm", type: "activity", icon: "🏨", label: "Check in — MIMARU Osaka Namba Station", detail: "Two-bedroom apartment. 130+ board games. Free coffee 7-11am. Tatami bunk room for girls. Luggage arrives this evening.", who: "Family" },
      { time: "3:00pm", type: "activity", icon: "🛒", label: "ANNA & CHRIS: Kuromon Ichiba Market (1.5h)", detail: "Osaka's kitchen — fresh seafood, wagyu, tropical fruit. Loud, enthusiastic vendors. Anna's market experience at its peak.", who: "Anna, Chris" },
      { time: "3:00pm", type: "activity", icon: "🌃", label: "ZOE & EMILY: Dotonbori (parent within half a block)", detail: "Giant mechanical crab, Glico running man, neon reflections. Zoe photographs everything. Emily tries character-shaped takoyaki.", who: "Zoe, Emily" },
      { time: "4:30pm", type: "food", icon: "🍡", label: "Family: Dotonbori street food crawl", detail: "Everyone together. Takoyaki, okonomiyaki, kushikatsu. Chris finds tantanmen ramen for his spice fix.", who: "Family" },
      { time: "5:30pm", type: "transport", icon: "🚇", label: "Family → Tenjin Matsuri reserved riverside seats", detail: "Walk or subway to Yodogawa riverside. Find your reserved seats — booked months ago. Arrive early.", who: "Family" },
      { time: "6:00pm", type: "activity", icon: "🎆", label: "TENJIN MATSURI — river procession begins", detail: "Decorated boats carrying portable shrines, musicians, performers. Traditional costumes, festival music, thousands in yukata.", who: "Family" },
      { time: "7:30pm", type: "activity", icon: "🎆", label: "TENJIN MATSURI FIREWORKS — GRAND FINALE", detail: "~5,000 fireworks over the Yodo River. Reserved riverside seats. Emily holds someone's hand. Zoe photographs everything. Anna and Chris sit together. The perfect ending.", who: "Family" },
      { time: "9:00pm", type: "transport", icon: "🚇", label: "Walk or subway back to MIMARU", detail: "Large crowds after fireworks. Be patient. The festival continues in the streets.", who: "Family" },
    ],
    notes: "Tenjin Matsuri fireworks are tonight — July 25 — your last night in Japan. Book riverside seats NOW. Perfect timing."
  },
  {
    day: 15, date: "Sun Jul 26", location: "Osaka → Indianapolis ✈️", emoji: "🏠",
    color: "#9b9bb0", tags: ["Travel Day"],
    summary: "Fly home from Kansai Airport. Cross the date line back. Arrive Indianapolis still July 26.",
    morningWalk: { who: "Chris solo (final walk of the trip)", route: "Shinsekai neighborhood at dawn — Osaka's most atmospheric old district. Retro advertising, old cafes, nobody around at 6am. Final great Japanese coffee.", duration: "~1 hour", coffee: "Shinsekai kissaten — a perfect final cup for the trip" },
    pairings: [],
    schedule: [
      { time: "5:45am", type: "walk", icon: "☕", label: "Chris's final walk — Shinsekai at dawn", detail: "Solo. Osaka's most atmospheric old neighborhood at its quietest. Last great Japanese coffee of the trip. Walk back along Dotonbori canal as the city wakes up.", who: "Chris" },
      { time: "7:00am", type: "food", icon: "☕", label: "Free coffee — MIMARU lobby (7-11am)", detail: "MIMARU provides free coffee 7-11am. Last konbini breakfast run together.", who: "Family" },
      { time: "8:00am", type: "activity", icon: "🦔", label: "ANNA & EMILY: Animal cafe — cat or hedgehog (book in advance)", detail: "NO strong perfume — bothers the animals. Old clothes. Emily with a hedgehog in her hands. 1 hour session. This is Emily's final Japan moment.", who: "Anna, Emily" },
      { time: "8:00am", type: "activity", icon: "🛍️", label: "CHRIS & ZOE: Amerika-mura vintage — same block as cafe", detail: "Osaka's vintage and streetwear district. Zoe's final soft goth finds. Chris browses Japanese menswear. Stay within the block.", who: "Chris, Zoe" },
      { time: "10:00am", type: "activity", icon: "🛍️", label: "Final souvenir sweep — everyone together", detail: "Last Ghibli finds, kawaii, mori girl, menswear. Anna: Doguyasuji kitchen street for Japanese knives. Last chance for anything missed.", who: "Family" },
      { time: "11:30am", type: "food", icon: "🍜", label: "Last ramen — Zoe chooses", detail: "Final meal in Japan. Zoe has full authority. Chris goes maximum spice. Emily gets katsu.", who: "Family" },
      { time: "1:00pm", type: "activity", icon: "🧳", label: "Final pack + check out", detail: "Everything in bags. Passports checked. Boarding passes downloaded.", who: "Family" },
      { time: "2:00pm", type: "transport", icon: "🚇", label: "Namba → Kansai Airport (Nankai Airport Express, ~38min, ¥1,450/adult)", detail: "Direct from Namba Station to KIX. Runs frequently. Allow 3 hours before your flight departure.", who: "Family" },
      { time: "~Evening", type: "transport", icon: "✈️", label: "Depart KIX → Indianapolis (via connection)", detail: "Cross the date line westward — you gain back the day. Depart July 26 Osaka, arrive July 26 Indianapolis.", who: "Family" },
    ],
    notes: "You gain back July 26 crossing the date line home. Depart Osaka July 26 and arrive Indianapolis July 26. Last konbini run at KIX airport — stock up on snacks for the flight home."
  }
];

const tagColors = {
  "Whole Family": "#4a7c6f", "Split Day": "#8b6bb5", "Ghibli": "#5a8a5a",
  "Must-Book": "#c0392b", "Date Night": "#c4816a", "Festival": "#d4810a",
  "Grand Finale": "#c0392b", "Art": "#7b6fa0", "Food": "#c4816a",
  "Nature": "#5a8a5a", "Animals": "#5faa82", "Culture": "#6b8cba",
  "Fashion": "#b07090", "Craft": "#8a7060", "Onsen": "#5090a0",
  "Adventure": "#c04040", "Cooking": "#c4816a", "Street Art": "#8b6bb5",
  "Recovery": "#888888", "Gentle": "#7a9a7a", "Special Night": "#d4a017",
  "Chris Solo": "#7a9cbf", "Special": "#d4a017", "Travel Day": "#6a7a9a",
};

export default function JapanDocumentary() {
  const [activeDay, setActiveDay] = useState(1);
  const [openItems, setOpenItems] = useState({});
  const [filter, setFilter] = useState("All");

  const toggle = (k) => setOpenItems(p => ({ ...p, [k]: !p[k] }));
  const current = days.find(d => d.day === activeDay);
  const filtered = filter === "All" ? days : days.filter(d => d.tags.includes(filter));
  const filters = ["All", "Split Day", "Whole Family", "Chris Solo", "Ghibli", "Food", "Animals", "Festival", "Date Night"];

  const typeColors = {
    transport: "#e8b870", walk: "#7a9cbf", food: "#c4816a",
    activity: "#9b7fc7", rest: "#5faa82", sleep: "#6a7a9a"
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", background: "#f7f3ed", minHeight: "100vh", color: "#1e1812" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(170deg, #0d0b08 0%, #1a1510 50%, #0c0e0b 100%)", padding: "3.5rem 2rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 60%, rgba(122,156,191,0.06) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(196,129,106,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.55em", color: "#7a6040", textTransform: "uppercase", marginBottom: "1rem" }}>A Family Documentary</div>
          <div style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#f0e8da", fontWeight: "normal", lineHeight: 0.85, letterSpacing: "0.03em" }}>Japan</div>
          <div style={{ fontSize: "clamp(0.9rem, 2vw, 1.25rem)", color: "#c8a882", fontStyle: "italic", margin: "0.75rem 0 0.25rem" }}>Depart Jul 11 · Arrive Jul 12 · Return Jul 26, 2026</div>
          <div style={{ fontSize: "0.7rem", color: "#5a4830", letterSpacing: "0.25em" }}>CHRIS · ANNA · ZOE · EMILY</div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(240,232,218,0.05)", border: "1px solid rgba(200,168,130,0.12)", borderRadius: "2rem", padding: "0.5rem 1.25rem", fontSize: "0.68rem", color: "#8a7050", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["IND ✈ Jul 11", "Tokyo Jul 12-18", "→", "Hakone Jul 18-19", "→", "Kyoto Jul 19-25", "→", "Osaka Jul 25-26", "→", "✈ IND Jul 26"].map((s, i) => (
              <span key={i} style={{ color: s === "→" ? "#c8a882" : "#8a7050" }}>{s}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {Object.entries(familyColors).filter(([k]) => k !== "Family").map(([name, color]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "0.65rem", color: "#7a6040", letterSpacing: "0.12em" }}>{name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: "0.4rem", padding: "0.85rem 1rem", overflowX: "auto", background: "#ede8e0", borderBottom: "1px solid #ddd5c5", position: "sticky", top: 0, zIndex: 20, justifyContent: "center", flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.28rem 0.8rem", borderRadius: "2rem", border: `1px solid ${filter === f ? "#c8a882" : "#ccc5b5"}`, background: filter === f ? "#c8a882" : "transparent", color: filter === f ? "#fff" : "#8a7050", cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.06em", fontFamily: "inherit", whiteSpace: "nowrap" }}>{f}</button>
        ))}
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", overflowX: "auto", background: "#e8e2d8", borderBottom: "2px solid #d5cdc0", position: "sticky", top: "46px", zIndex: 10 }}>
        {filtered.map(d => (
          <button key={d.day} onClick={() => setActiveDay(d.day)} style={{ flex: "0 0 auto", padding: "0.65rem 0.55rem 0.45rem", border: "none", cursor: "pointer", fontFamily: "inherit", minWidth: 52, textAlign: "center", borderBottom: activeDay === d.day ? `3px solid ${d.color}` : "3px solid transparent", background: activeDay === d.day ? "#f7f3ed" : "transparent" }}>
            <div style={{ fontSize: "0.95rem" }}>{d.emoji}</div>
            <div style={{ fontSize: "0.58rem", color: activeDay === d.day ? d.color : "#9a8070", marginTop: "0.12rem", fontWeight: activeDay === d.day ? "bold" : "normal" }}>{d.day}</div>
            <div style={{ fontSize: "0.5rem", color: "#b0a080" }}>{d.date.split(" ")[1]} {d.date.split(" ")[2]}</div>
          </button>
        ))}
      </div>

      {/* Day content */}
      {current && (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 0 4rem" }}>
          <div style={{ padding: "1.75rem 1.5rem 1.25rem", borderBottom: `2px solid ${current.color}30`, background: `linear-gradient(180deg, ${current.color}08 0%, transparent 100%)` }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ fontSize: "2.25rem", lineHeight: 1, flexShrink: 0 }}>{current.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.6rem", color: "#9a8060", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Day {current.day} · {current.date} · {current.location}</div>
                <div style={{ fontSize: "1.2rem", color: "#1e1812", lineHeight: 1.4, fontStyle: "italic" }}>{current.summary}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginTop: "0.85rem" }}>
              {current.tags.map(t => (
                <span key={t} style={{ fontSize: "0.58rem", padding: "0.14rem 0.52rem", borderRadius: "1rem", background: `${tagColors[t] || "#888"}18`, color: tagColors[t] || "#888", border: `1px solid ${tagColors[t] || "#888"}28`, letterSpacing: "0.04em" }}>{t}</span>
              ))}
            </div>
          </div>

          {current.morningWalk && (
            <div style={{ margin: "1.25rem 1.5rem 0", background: `${familyColors.Chris}0e`, border: `1px solid ${familyColors.Chris}28`, borderRadius: "0.85rem", padding: "1rem 1.1rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.55rem" }}>
                <span style={{ fontSize: "1rem" }}>☕</span>
                <div style={{ fontSize: "0.58rem", color: familyColors.Chris, letterSpacing: "0.18em", textTransform: "uppercase" }}>Chris's Morning · {current.morningWalk.who}</div>
              </div>
              <div style={{ fontSize: "0.87rem", color: "#5a4830", lineHeight: 1.6, fontStyle: "italic", marginBottom: "0.45rem" }}>{current.morningWalk.route}</div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#9a8060" }}>⏱ {current.morningWalk.duration}</span>
                <span style={{ fontSize: "0.7rem", color: "#9a8060" }}>☕ {current.morningWalk.coffee}</span>
              </div>
            </div>
          )}

          {current.pairings.length > 0 && (
            <div style={{ margin: "1.25rem 1.5rem 0" }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "#c8a882", textTransform: "uppercase", marginBottom: "0.65rem" }}>Family Pairings Today</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {current.pairings.map((p, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e8e0d0", borderRadius: "0.7rem", padding: "0.7rem 0.9rem", display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: "bold", color: "#c8a882", minWidth: 105, paddingTop: "0.1rem", flexShrink: 0 }}>{p.pair}</div>
                    <div style={{ fontSize: "0.82rem", color: "#5a4830", lineHeight: 1.45 }}>{p.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ margin: "1.25rem 1.5rem 0" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "#c8a882", textTransform: "uppercase", marginBottom: "0.65rem" }}>Schedule</div>
            <div style={{ borderRadius: "0.85rem", overflow: "hidden", border: "1px solid #e0d8cc" }}>
              {current.schedule.map((item, i) => {
                const k = `${activeDay}-${i}`;
                const isOpen = openItems[k];
                const dot = typeColors[item.type] || "#999";
                const whoColor = item.who && familyColors[item.who] ? familyColors[item.who] : null;
                return (
                  <div key={i} onClick={() => toggle(k)} style={{ borderBottom: i < current.schedule.length - 1 ? "1px solid #f0ebe2" : "none", background: isOpen ? "#fdfaf6" : "#fff", cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: "0.7rem", padding: "0.6rem 0.9rem", alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot, marginTop: "0.45rem", flexShrink: 0 }} />
                      <div style={{ fontSize: "0.68rem", color: "#a09070", minWidth: 52, paddingTop: "0.12rem", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{item.time}</div>
                      <div style={{ fontSize: "0.88rem", flexShrink: 0 }}>{item.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.85rem", color: "#1e1812", lineHeight: 1.35 }}>{item.label}</span>
                          {whoColor && item.who !== "Family" && (
                            <span style={{ fontSize: "0.58rem", padding: "0.08rem 0.42rem", borderRadius: "1rem", background: `${whoColor}14`, color: whoColor, border: `1px solid ${whoColor}25`, whiteSpace: "nowrap" }}>{item.who}</span>
                          )}
                        </div>
                        {isOpen && item.detail && (
                          <div style={{ fontSize: "0.76rem", color: "#7a6040", lineHeight: 1.55, marginTop: "0.3rem", fontStyle: "italic" }}>{item.detail}</div>
                        )}
                      </div>
                      <div style={{ color: "#c8a882", fontSize: "0.58rem", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {current.notes && (
            <div style={{ margin: "1rem 1.5rem 0", background: "rgba(200,168,130,0.07)", border: "1px solid rgba(200,168,130,0.2)", borderRadius: "0.75rem", padding: "0.9rem 1.1rem" }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "#c8a882", textTransform: "uppercase", marginBottom: "0.4rem" }}>Planning Notes</div>
              <div style={{ fontSize: "0.82rem", color: "#7a5830", lineHeight: 1.6 }}>{current.notes}</div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ background: "#0d0b08", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.38em", color: "#c8a882", textTransform: "uppercase", marginBottom: "1.5rem", textAlign: "center" }}>Book Immediately</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))", gap: "0.6rem" }}>
            {[
              { what: "Flights (IND→NRT Jul 11, KIX→IND Jul 26)", when: "Now", urgent: true },
              { what: "MIMARU hotels — all three cities", when: "Jan 12, 2026 (6 months out)", urgent: true },
              { what: "Hakone Ryokan — private onsen", when: "Now", urgent: true },
              { what: "Ghibli Museum tickets", when: "June 9 at 9pm Indianapolis time (EDT)", urgent: true },
              { what: "Tenjin Matsuri riverside seats (Jul 25)", when: "Now — sell out months ahead", urgent: true },
              { what: "Cooking class — Kyoto machiya", when: "2–3 months before", urgent: false },
              { what: "Manga/illustration workshop", when: "2–3 months before", urgent: false },
              { what: "Shibori dyeing — Kyoto", when: "2–3 months before", urgent: false },
              { what: "Furoshiki workshop — Tokyo", when: "2–3 months before", urgent: false },
              { what: "teamLab Planets", when: "4–6 weeks before", urgent: false },
              { what: "Sanrio Puroland (timed entry)", when: "4–6 weeks before", urgent: false },
              { what: "Animal cafe — Osaka", when: "2–4 weeks before", urgent: false },
              { what: "Sagano Scenic Railway", when: "1–2 months before", urgent: false },
              { what: "Gion date night restaurant", when: "4–6 weeks before", urgent: false },
            ].map((item, i) => (
              <div key={i} style={{ background: item.urgent ? "rgba(200,80,50,0.09)" : "rgba(240,232,218,0.03)", border: `1px solid ${item.urgent ? "rgba(200,80,50,0.22)" : "rgba(200,168,130,0.09)"}`, borderRadius: "0.6rem", padding: "0.7rem 0.8rem" }}>
                <div style={{ fontSize: "0.78rem", color: "#f0e0c0", lineHeight: 1.35, marginBottom: "0.22rem" }}>
                  {item.urgent && <span style={{ color: "#e87050", marginRight: "0.3rem" }}>★</span>}
                  {item.what}
                </div>
                <div style={{ fontSize: "0.65rem", color: item.urgent ? "#e87050" : "#6a5030" }}>{item.when}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(200,168,130,0.06)", border: "1px solid rgba(200,168,130,0.15)", borderRadius: "0.75rem" }}>
            <div style={{ fontSize: "0.6rem", color: "#c8a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>⚠️ Ghibli Ticket Reminder</div>
            <div style={{ fontSize: "0.8rem", color: "#b0a080", lineHeight: 1.6 }}>
              Tickets for July visits go on sale <strong style={{ color: "#f0e0c0" }}>Monday June 9, 2026 at 9:00pm Indianapolis time (EDT)</strong> — that is 10:00am JST on June 10 in Japan. Create your Lawson Ticket account now. Log in 15-30 minutes early. Do not refresh repeatedly before the sale opens.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
