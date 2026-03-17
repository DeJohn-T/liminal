// ...existing code...
const memories = [
  { photo: "assets/1stPic.jpg", caption: "straight off the plane in Madrid. I didn't know yet. But I was about to find out." },
  { photo: "assets/AMSEXP.jpg", caption: "what a quote." },
  { photo: "assets/amslook.jpeg", caption: "the architecture here was nothing short of surreal. SF should catch up" },
  { photo: "assets/amsterdam.JPG", caption: "christmas lights through the canals. our boat driver was from Sweden and talked to me the whole ride. never got his name. hope he's doing well." },
  { photo: "assets/Amsterdammeats.jpeg", caption: "ate alone in Amsterdam and had the time of my life doing it. I didn't really see this coming at all." },
  { photo: "assets/ArtSS.jpg", caption: "met these people the day before and said yes to the day trip anyway. Honestly what did I have to lose? haha" },
  { photo: "assets/Barber.JPG", caption: " my barber in madrid, gustavo spoke two words of English. My spanish was rough. yet we still figured it out. light work. " },
  { photo: "assets/Beachboys.jpg", caption: "The beach. Portugal. the boys. I remember thinking there's no way this is actually our life right now." },
  { photo: "assets/beachview.JPG", caption: "debriefing in Barcelona. way too much traveling." },
  { photo: "assets/blurry.JPG", caption: "blurry because we weren't stopping for anything." },
  { photo: "assets/brekview.jpeg", caption: "Only reservation left was 6am. I took it. Ate duck for the first time with this view. legendary." },
  { photo: "assets/brothers.JPG", caption: "Barcelona with Castro 5am. We were literally waiting for McDonald's to open before our ride back. I love this trip man." },
  { photo: "assets/CameraPic.jpg", caption: "Me and my Fujifilm. bought it the day before leaving. Best decision I made going into any of this." },
  //{ photo: "assets/castrodj.jpg", caption: "Lisbon. We have the pictures so we were definitely there." },
  { photo: "assets/castroo.JPG", caption: "Post friendsgiving. Someone may or may not have fallen down the stairs. Everyone made it home though." },
  { photo: "assets/CHM.jpeg", caption: "christmas Eve in Paris! My Semester is over, friends are gone, and i'm flying home tomorrow. One last stop. unskippable." },
  //{ photo: "assets/CienNights.JPG", caption: "Everyone in their own conversation, nobody on their phone. That's the one right there." },
  { photo: "assets/CrewBarce.JPG", caption: "walked the whole city, and stumbled on this garden, can't miss the photo op. it's just who we are." },
  { photo: "assets/Crewmadrid.JPEG", caption: "Game night. Got wholesome fast." },
  { photo: "assets/crews.JPG", caption: "Some of the crew.Life of the party and I'm not just saying that." },
  { photo: "assets/CREWWW.jpg", caption: "Taco Tuesday. Someone's usually always missing. This time everybody showed up. huge moment." },
  { photo: "assets/DJA.JPG", caption: "Cal, LSU, and University of Toronto all ended up in the same spot. I love this place man." },
  { photo: "assets/DSLouvre.jpeg", caption: "we planned to get there early and skip the line. Got there at 1pm. so that was done." },
  { photo: "assets/EfDJ.JPG", caption: "you really can't make this up. Joker in the wild." },
  { photo: "assets/efrenandme.JPG", caption: "Efren and I at a cathedral in Segovia. the history here was shocking." },
  { photo: "assets/eiffel.jpeg", caption: "nobody told me it sparkles at night. i thought they did it for me" },
  { photo: "assets/erikbird.JPG", caption: "he said he's the bird whisperer. i mean I can't argue with that." },
  { photo: "assets/ErikCast.jpg", caption: "Didn't know either of them six weeks before this. Now they're two of my best friends. This place does something to you." },
  { photo: "assets/erikdj.jpg", caption: "Mandatory pic" },
  { photo: "assets/escargot.jpeg", caption: "It's snail meat. I wanted to try. i'd do it again without hesitation." },
  { photo: "assets/f1car.JPG", caption: "this is lewis hamilton's actual Mercedes. Five championships in this car. i'm standing a foot away from it trying not to fan out. give me the keys and i'll make six." },
  { photo: "assets/f1enzo.JPG", caption: "these cars literally changed the history of racing. they built fortunes." },
  { photo: "assets/f1mus.jpeg", caption: "left the F1 museum fully convinced I could've been the coldest driver out there." },
  { photo: "assets/f12050.JPG", caption: "they're already creating concepts for AI implemented F1 cars. stood there realizing the world really doesn't wait for anyone. " },
  { photo: "assets/flightport.jpg", caption: "OTW to Lisbon for Castro's birthday. had no idea how good that weekend was about to be." },
  { photo: "assets/FoodMadrid.JPEG", caption: "Friendsgiving 2024. the options were insane. what'd did I bring? vibes. I can't cook too good.." },
  { photo: "assets/Friends.JPG", caption: "roommates from Mexico and France, and friends from everywhere else. not the most random group possible." },
  { photo: "assets/Friends1stWed.jpg", caption: "blurry but this is the crew early on. look what all that nervousness led to be." },
  { photo: "assets/friendsandfriends.JPG", caption: "guess what we were saying." },
  { photo: "assets/friendsgiving.jpeg", caption: " exclusive BTS of friendsgiving. let us cook." },
  { photo: "assets/goodeats.jpeg", caption: " the Best pho I've ever had and I'm from SF. amsterdam just does everything to the max." },
  { photo: "assets/GroceryRun.jpg", caption: "first real picture of me in Madrid. Took me getting here to realize they don't have Safeway. El Corte Inglés became my everything." },
 // { photo: "assets/hostelmom.JPG", caption: null, date: null },
  { photo: "assets/IMG_6721.PNG", caption: "Me in my Madrid shirt. I love this city man." },
  { photo: "assets/inart.JPG", caption: "forgot who was calling me but the lighting had me covered." },
  { photo: "assets/infronttower.jpeg", caption: "in front of the Eiffel Tower on Christmas. I still don't fully understand how I got here." },
  { photo: "assets/Itwas.JPG", caption: "I hope not man." },
  { photo: "assets/joker.JPG", caption: "We could defeat the Avengers. Light work." },
  { photo: "assets/lalaland.jpeg", caption: "the bar from La La Land. spent the whole night talking to strangers and learning how to dance. That's just what this trip was." },
  { photo: "assets/Lastday.jpg", caption: "All packed up. Luis was the last one left. Five months ago I had no idea what was in store. now I'm leaving a different person. feeling on top of the world" },
  { photo: "assets/lisboa.jpeg", caption: "Proof I was in Portugal. Pretty cool shot too if i say so myself." },
  { photo: "assets/library.jpg", caption: "i read all of these by the way." },
  { photo: "assets/lisboaart.jpg", caption: "these people were insanely talented. traveling makes you appreciate things you'd normally walk right past." },
  { photo: "assets/lisboafood.jpg", caption: "found a mom and pop spot in the middle of Lisbon. they brought out the biggest serving we'd ever seen. we tried." },
  { photo: "assets/lisboanights.jpg", caption: "Some college students roaming around Lisbon at night. That's literally all this was." },
  { photo: "assets/lisboasunset.jpg", caption: "most beautiful sunset I've ever seen in my life. i didn't even say anything I just watched." },
  { photo: "assets/lisboaviews.jpg", caption: "caught Castro taking a picture of the view. let me cook" },
  { photo: "assets/londoboy.jpeg", caption: "Asked some strangers to take a picture while solo in London. i got the memory." },
  { photo: "assets/londonmarket.jpg", caption: "Borough Market in London. Tried everything including those chocolate strawberries everyone talks about. They were gas." },
  { photo: "assets/londontown.jpeg", caption: "First picture in London. Being alone in a city you've always heard about is wild." },
  { photo: "assets/Louvre.jpeg", caption: "In front of the Louvre. Did we go in? No. Got there at 1pm the day after Christmas. got pics outside though." },
  { photo: "assets/Love.JPG", caption: "our last night in Barcelona. What I didn't know yet was that I was about to break my phone and be without one for a month and a half." },
  { photo: "assets/Loveonbeach.jpg", caption: "wholesome moment in Lisbon. me one day." },
  { photo: "assets/LoveTG.JPG", caption: "this was our friend's place. Movie nights, debriefs, study sessions — we called it the Orphanage. literally our second home." },
  { photo: "assets/MADcathe.jpeg", caption: "Got my new phone, took a walk, and stumbled on this cathedral. Madrid had so many gems. " },
  { photo: "assets/madtree.jpeg", caption: "Giant Christmas tree in the center of Madrid. Five minute walk from my apartment. I walked past this almost every day." },
  { photo: "assets/matcha.jpeg", caption: " i've hated matcha my whole life until this exact moment. I understand it now." },
  { photo: "assets/mcdonalds.JPG", caption: "We lived across the street from a McDonald's. They hated to see us coming." },
  { photo: "assets/MEandG.jpg", caption: "Her camera wasn't working so we had to figure it out. We figured it out." },
  { photo: "assets/MeLuis.JPG", caption: "Me and Luis at the Cien, our second home. He's from Mexico. Random roommate selection paired us together and I'm grateful for it daily." },
  { photo: "assets/metower.jpeg", caption: "straight from the Eiffel Tower. we didn't even have passes, the lady just let us through. my goat." },
  { photo: "assets/muesviews.jpeg", caption: "Natural History Museum in London. i was everywhere that trip haha and I'm proud of every single stop." },
  { photo: "assets/mycrew.jpeg", caption: "whenever we were together the vibes were always right." },
  { photo: "assets/mycrew.JPG", caption: "Dropping legendary lore. Just know we won in the end." },
  { photo: "assets/NHM.jpg", caption: "it's crazy how small we really are when you think about it" },
  { photo: "assets/nightviews.jpeg", caption: "late night boat tour with the Eiffel Tower in the background. sponsor me Apple?" },
  { photo: "assets/notre.jpeg", caption: "just admiring the art" },
  { photo: "assets/Offguardss.JPG", caption: "Behind the scenes. Mondays were rough. That's all I'll say." },
  { photo: "assets/PAriseanEats.jpeg", caption: "french food. honestly pretty solid for fair food. " },
  { photo: "assets/ParisTD.jpeg", caption: "just landed in Paris. quin had been there for hours already. lost service immediately. couldn't even call an Uber. great start right." },
  { photo: "assets/phone.jpeg", caption: "the proof my phone broke out of nowhere. the hoops I had to jump through to replace it almost derailed the whole thing. Almost. try again." },
  { photo: "assets/Photographer.JPG", caption: "What a guy. I wish I was that guy." },
  { photo: "assets/preflight.jpg", caption: "last meal in Portugal. Amazing trip. Until next time." },
  { photo: "assets/quindj.jpeg", caption: "My LSU brother. Two of four LSU UC3M exchange students in one place. Geaux Tigers baby." },
  { photo: "assets/racedrivers.JPG", caption: "3rd place is better than last. those go karts were little rockets by the way." },
  { photo: "assets/RacetrackMad.JPG", caption: "The guys. pre-race energy was there." },
{ photo: "assets/Roomies.JPG", caption: "All from completely different cultures. All clicked immediately. Still can't explain it." },
  { photo: "assets/Sagrada.JPG", caption: "show me a better picture with a better group of people. Sagrada Família views." },
  { photo: "assets/Solotrip.jpg", caption: "Stayed at a hostel one night of my solo trip. super interesting experience. Honestly didn't mind it much." },
  { photo: "assets/SwissBut.HEIC", caption: "Stalked this place's website for weeks waiting for an opening. Nothing came up so I just walked in. Snagged a seat at the bar. A little awkward sitting alone but exactly what I needed." },
  { photo: "assets/tapas.JPG", caption: "In Toledo getting tapas. Actually pretty good. Extremely messy. Worth it, kinda?" },
  { photo: "assets/TheBoys.JPG", caption: "The guys at Cien again. Legendary nights in that place man." },
  { photo: "assets/thecrew.jpg", caption: "Post Taco Tuesday. Big group, everybody locked in. Just a regular night for us." },
  { photo: "assets/thespot.jpeg", caption: "If you're ever in Madrid and want to meet people from everywhere — this is the spot. You're welcome." },
  { photo: "assets/tikitakoo.JPG", caption: "tiki tako was incredible. that's really all i can say about it there." },
  { photo: "assets/ToledoTrip.JPG", caption: "that's the real view, nothing moreto add." },
  { photo: "assets/towerview.jpeg", caption: "I was on Top of the Eiffel Tower on Christmas Eve. Fog was so thick I couldn't see a light, but I was up there. so it counts." },
  { photo: "assets/transport.jpeg", caption: "Saw this at an art exhibit in Amsterdam. felt like it was talking directly to me." },
  { photo: "assets/viewss.JPG", caption: "going abroad made me realize the benefit to capturing. so it never stopped!!" },
  { photo: "assets/work.jpeg", caption: "Proof I actually got work done. we would go to this italian coffee shop downstairs and it was great." },
];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let queue = [];

function refillQueue() {
  queue = memories.slice(); // copy
  shuffle(queue);
}

function showNextMemory() {
  if (queue.length === 0) refillQueue();
  const memory = queue.pop();
  document.getElementById("photo").src = memory.photo;
  document.getElementById("caption").textContent = memory.caption || "";
  document.getElementById("date").textContent = memory.date || "";
}

document.getElementById("newMemory").addEventListener("click", showNextMemory);

// show one on load
refillQueue();
showNextMemory();
// ...existing code...