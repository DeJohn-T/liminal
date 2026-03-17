document.addEventListener('DOMContentLoaded', () => {

  // ── BOOT ENTER ──
  document.getElementById('enterBtn').addEventListener('click', () => {
    const boot = document.getElementById('boot');
    const site = document.getElementById('site');
    const music = document.getElementById('bgMusic');

    music.volume = 0;
    music.play();
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.15);
      music.volume = vol;
      if (vol >= 0.15) clearInterval(fadeIn);
    }, 80);

    boot.classList.add('exiting');
    setTimeout(() => {
      boot.style.display = 'none';
      site.classList.add('visible');
    }, 1200);
  });

  // ── MUTE BUTTON ──
  const muteBtn = document.getElementById('muteBtn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const music = document.getElementById('bgMusic');
      music.muted = !music.muted;
      muteBtn.textContent = music.muted ? '⟁ Unmute' : '⟁ Mute';
    });
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // ── MEMORIES ──
  const memories = [
    { photo: "assets/1stPic.jpg", caption: "straight off the plane in Madrid. I didn't know yet. But I was about to find out." },
    { photo: "assets/AMSEXP.png", caption: "what a quote." },
    { photo: "assets/amslook.jpeg", caption: "the architecture here was nothing short of surreal. SF catch up.." },
    { photo: "assets/amsterdam.JPG", caption: "christmas lights through the canals. our boat driver was from Sweden and talked to me the whole ride. never got his name. hope he's doing well." },
    { photo: "assets/Amsterdameats.jpeg", caption: "ate alone in Amsterdam and had the time of my life doing it. I didn't really see this coming at all." },
    { photo: "assets/ArtSS.jpg", caption: "met them all the day before and said yes to the day trip to Segovia anyway. Honestly what did I have to lose? haha" },
    { photo: "assets/Barber.JPG", caption: "my barber in madrid, Gustavo spoke two words of English. My Spanish was rough. yet we still figured it out. light work." },
    { photo: "assets/Beachboys.jpg", caption: "The beach. Portugal. the boys. I remember thinking there's no way this is actually our life right now." },
    { photo: "assets/beachview.JPG", caption: "debriefing in Barcelona. way too much traveling." },
    { photo: "assets/blurry.JPG", caption: "blurry because we weren't stopping for anything." },
    { photo: "assets/brekview.jpeg", caption: "Only reservation left was 6am. I took it. Ate duck for the first time with this view. legendary." },
    { photo: "assets/brothers.JPG", caption: "Barcelona with Castro 5am. We were literally waiting for McDonald's to open before our ride back. I love this trip man." },
    { photo: "assets/CameraPic.jpg", caption: "Me and my Fujifilm. bought it the day before leaving. Best decision I made going into any of this." },
    { photo: "assets/castroo.JPG", caption: "Post friendsgiving. Someone may or may not have fallen down the stairs. Everyone made it home though." },
    { photo: "assets/CHM.jpeg", caption: "Christmas Eve in Paris! My semester is over, friends are gone, and I'm flying home tomorrow. One last stop. unskippable." },
    { photo: "assets/CrewBarce.JPG", caption: "walked the whole city, and stumbled on this garden, can't miss the photo op. it's just who we are." },
    { photo: "assets/Crewmadrid.JPEG", caption: "Game night. Got wholesome fast." },
    { photo: "assets/crews.JPG", caption: "Some of the crew. Life of the party and I'm not just saying that." },
    { photo: "assets/CREWWW.jpg", caption: "Taco Tuesday. Someone's usually always missing. This time everybody showed up. huge moment." },
    { photo: "assets/DJA.JPG", caption: "Cal, LSU, and University of Toronto all ended up in the same spot. I love this place man." },
    { photo: "assets/DSLouvre.jpeg", caption: "we planned to get there early and skip the line. Got there at 1pm. so that was done." },
    { photo: "assets/EfDJ.JPG", caption: "you really can't make this up. Joker in the wild." },
    { photo: "assets/efrenandme.JPG", caption: "Efren and I at a cathedral in Segovia. the history here was mind-boggling." },
    { photo: "assets/eiffel.jpeg", caption: "nobody told me it sparkles at night. i thought they were celebrating me" },
    { photo: "assets/erikbird.JPG", caption: "he said he's the bird whisperer. I can't argue with that." },
    { photo: "assets/ErikCast.jpg", caption: "Didn't know either of them six weeks before this. Now they're two of my best friends. This place does something to you." },
    { photo: "assets/erikdj.jpg", caption: "Mandatory pic" },
    { photo: "assets/escargot.jpeg", caption: "It's snail meat. I wanted to try. I'd do it again without hesitation." },
    { photo: "assets/f1car.JPG", caption: "this is Lewis Hamilton's actual Mercedes. Five championships in this car. I'm standing a foot away from it trying not to fan out. give me the keys and I'll make six. fact." },
    { photo: "assets/f1enzo.JPG", caption: "these cars literally changed the history of racing. they built fortunes." },
    { photo: "assets/f1mus.jpeg", caption: "left the F1 museum fully convinced I could've been the coldest driver out there." },
    { photo: "assets/f12050.JPG", caption: "they're already creating concepts for AI implemented F1 cars. stood there realizing the world really doesn't wait for anyone." },
    { photo: "assets/flightport.jpg", caption: "OTW to Lisbon for Castro's birthday. had no idea how good that weekend was about to be." },
    { photo: "assets/FoodMadrid.JPEG", caption: "Friendsgiving 2024. the options were insane. what did I bring? vibes. I can't cook too good.." },
    { photo: "assets/Friends.JPG", caption: "roommates from Mexico and France, and friends from everywhere else. not the most random group possible." },
    { photo: "assets/friendsandfriends.JPG", caption: "guess what we were laughing at." },
    { photo: "assets/friendsgiving.jpeg", caption: "exclusive BTS of friendsgiving. let us cook." },
    { photo: "assets/goodeats.jpeg", caption: "the best pho I've ever had and I'm from SF. Amsterdam just does everything to the max." },
    { photo: "assets/GroceryRun.jpg", caption: "first real picture of me in Madrid. Took me getting here to realize they don't have Safeway. El Corte Inglés became the spot" },
    { photo: "assets/IMG_6721.PNG", caption: "Me in my Madrid shirt. I love this city man." },
    { photo: "assets/inart.JPG", caption: "forgot who was calling me but the lighting had me covered." },
    { photo: "assets/infronttower.jpeg", caption: "in front of the Eiffel Tower on Christmas. I still don't fully understand how I got here." },
    { photo: "assets/Itwas.JPG", caption: "I hope not man." },
    { photo: "assets/joker.JPG", caption: "We could defeat the Avengers. Light work." },
    { photo: "assets/lalaland.jpeg", caption: "the bar from La La Land. spent the whole night talking to strangers and learning how to dance. That's just what this trip was." },
    { photo: "assets/Lastday.jpg", caption: "All packed up. Luis was the last one left. Five months ago I had no idea what was in store. now I'm leaving a different person. feeling on top of the world" },
    { photo: "assets/lisboa.jpg", caption: "Proof I was in Portugal. Pretty cool shot too if I say so myself." },
    { photo: "assets/library.jpeg", caption: "I read all of these by the way." },
    { photo: "assets/lisboaart.jpg", caption: "these people were insanely talented. traveling makes you appreciate things you'd normally walk right past." },
    { photo: "assets/lisboafood.jpg", caption: "found a mom and pop spot in the middle of Lisbon. they brought out the biggest serving we'd ever seen. we tried." },
    { photo: "assets/lisboanights.jpg", caption: "Some college students roaming around Lisbon at night. wow, what a blessing." },
    { photo: "assets/lisboasunset.jpg", caption: "most beautiful sunset I've ever seen in my life. I didn't even say anything, I just watched." },
    { photo: "assets/lisboaviews.jpg", caption: "caught Castro taking a picture of the view. let me cook" },
    { photo: "assets/londoboy.jpeg", caption: "Asked some strangers to take a picture while solo in London. I got the memory." },
    { photo: "assets/londonmarket.jpg", caption: "Borough Market in London. Tried everything including those chocolate strawberries everyone talks about. They were gas." },
    { photo: "assets/londontown.jpeg", caption: "First picture in London. Being alone in a city you've always heard about is wild." },
    { photo: "assets/Louvre.jpeg", caption: "In front of the Louvre. Did we go in? No. Got there at 1pm the day after Christmas. got pics outside though." },
    { photo: "assets/Love.JPG", caption: "our last night in Barcelona. What I didn't know yet was that I was about to break my phone and be without one for a month and a half." },
    { photo: "assets/Loveonbeach.jpg", caption: "wholesome moment in Lisbon." },
    { photo: "assets/LoveTG.JPG", caption: "this was our friend's place. Movie nights, debriefs, study sessions — we called it the Orphanage. literally our second home." },
    { photo: "assets/MADcathe.jpeg", caption: "Got my new phone, took a walk, and stumbled on this cathedral. Madrid had so many gems." },
    { photo: "assets/madtree.jpeg", caption: "Giant Christmas tree in the center of Madrid. Five minute walk from my apartment. I walked past this almost every day." },
    { photo: "assets/matcha.jpeg", caption: "I've hated matcha my whole life until this exact moment. I understand it now." },
    { photo: "assets/mcdonalds.JPG", caption: "We lived across the street from a McDonald's. They hated to see us coming." },
    { photo: "assets/MEandG.jpg", caption: "Her camera wasn't working so we had to figure it out. We figured it out." },
    { photo: "assets/MeLuis.JPG", caption: "Me and Luis at the Cien, our second home. He's from Mexico. Random roommate selection paired us together and I'm grateful for it daily." },
    { photo: "assets/metower.jpeg", caption: "straight from the Eiffel Tower. we didn't even have passes, the lady just let us through. my goat." },
    { photo: "assets/muesviews.jpeg", caption: "Natural History Museum in London. I was everywhere that trip, I literally rented a bike and explored. I'm actually really proud of every single move." },
    { photo: "assets/mycrew.jpeg", caption: "whenever we were together the vibes were always right." },
    { photo: "assets/mycrew.JPG", caption: "Dropping legendary lore. Just know we won in the end." },
    { photo: "assets/NHM.jpg", caption: "it's crazy how small we really are when you think about it" },
    { photo: "assets/nightviews.jpeg", caption: "late night boat tour with the Eiffel Tower in the background. sponsor me Apple?" },
    { photo: "assets/notre.jpeg", caption: "just admiring the art" },
    { photo: "assets/Offguardss.JPG", caption: "Behind the scenes. Mondays were rough. That's all I'll say." },
    { photo: "assets/PAriseanEats.jpeg", caption: "french food. honestly pretty solid for fair food." },
    { photo: "assets/ParisTD.jpeg", caption: "just landed in Paris. Quin had been there for hours already. lost service immediately. couldn't even call an Uber. great start right?" },
    { photo: "assets/phone.jpeg", caption: "proof my phone broke out of nowhere. the hoops I had to jump through to replace it almost derailed the whole thing. Almost. try again." },
    { photo: "assets/Photographer.JPG", caption: "What a guy. I wish I was that guy." },
    { photo: "assets/preflight.jpg", caption: "last meal in Portugal. Amazing trip. Until next time." },
    { photo: "assets/quindj.jpeg", caption: "My LSU brother. Two of four LSU UC3M exchange students in one place. Geaux Tigers baby." },
    { photo: "assets/racedrivers.JPG", caption: "3rd place is better than last. those go karts were little rockets by the way. love these guys" },
    { photo: "assets/RacetrackMad.JPG", caption: "The guys. pre-race energy was there. who was going to win though? me right.." },
    { photo: "assets/Roomies.JPG", caption: "All from completely different cultures. All clicked immediately. Still can't explain it." },
    { photo: "assets/Sagrada.JPG", caption: "show me a better picture with a better group of people. Sagrada Família views." },
    { photo: "assets/Solotrip.jpg", caption: "Stayed at a hostel one night of my solo trip. super interesting experience. Honestly didn't mind it much." },
    { photo: "assets/SwissBut.HEIC", caption: "Stalked this place's website for weeks waiting for an opening. Nothing came up so I just walked in. Snagged a seat at the bar. A little awkward sitting alone but exactly what I needed." },
    { photo: "assets/tapas.JPG", caption: "In Toledo getting tapas. Actually pretty good. Extremely messy. Worth it, kinda?" },
    { photo: "assets/TheBoys.JPG", caption: "The guys at Cien again. Legendary nights in that place man." },
    { photo: "assets/thecrew.jpg", caption: "Post Taco Tuesday. Big group, everybody locked in. Just a regular night for us." },
    { photo: "assets/thespot.jpeg", caption: "If you're ever in Madrid and want to meet people from everywhere — this is the spot. You're welcome." },
    { photo: "assets/tikitakoo.JPG", caption: "Tiki Tako was incredible. that's really all I can say about it." },
    { photo: "assets/ToledoTrip.JPG", caption: "that's the real view, nothing more to add." },
    { photo: "assets/towerview.jpeg", caption: "I was on top of the Eiffel Tower on Christmas Eve. Fog was so thick I couldn't see a light, but I was up there. so it counts." },
    { photo: "assets/transport.jpeg", caption: "Saw this at an art exhibit in Amsterdam. felt like it was talking directly to me." },
    { photo: "assets/viewss.JPG", caption: "going abroad made me realize the benefit to capturing. so it never stopped!! These moments live forever." },
    { photo: "assets/work.jpeg", caption: "Proof I actually got work done. we would go to this Italian coffee shop downstairs and it was great." },
  ];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  let queue = [], seen = 0;
  let firstCycleDone = false;
  let finalNoteShown = false;
  const total = memories.length;

  function refillQueue() { queue = memories.slice(); shuffle(queue); }
  function pad(n) { return String(n).padStart(3, '0'); }

  // ── FINAL NOTE ──
  function showFinalNote() {
    if (finalNoteShown) return;
    finalNoteShown = true;
    const note = document.getElementById('finalNote');
    if (!note) return;
    note.classList.add('visible');
    // show the read note button in the footer now
    const readBtn = document.getElementById('readNoteBtn');
    if (readBtn) readBtn.style.opacity = '1';
  }

  function closeFinalNote() {
    const note = document.getElementById('finalNote');
    if (!note) return;
    note.classList.remove('visible');
  }

  document.getElementById('closeNote')?.addEventListener('click', closeFinalNote);
  document.getElementById('keepGoingBtn')?.addEventListener('click', () => {
    closeFinalNote();
    showNext();
  });
  document.getElementById('readNoteBtn')?.addEventListener('click', () => {
    const note = document.getElementById('finalNote');
    if (note) note.classList.add('visible');
  });

  // ── SHOW NEXT ──
  function showNext() {
    // trigger final note after first full cycle
    if (queue.length === 0) {
      if (!firstCycleDone) {
        firstCycleDone = true;
        refillQueue();
        showFinalNote();
        return;
      }
      refillQueue();
    }

    const memory = queue.pop();
    seen = Math.min(seen + 1, total);

    const photoEl = document.getElementById('photo');
    const captionEl = document.getElementById('caption');

    photoEl.style.opacity = '0';
    photoEl.style.transform = 'scale(1.025)';
    captionEl.classList.add('fade-out');

    setTimeout(() => {
      captionEl.textContent = memory.caption || '';
      document.getElementById('counter').textContent = `${pad(seen)} / ${pad(total)}`;

      // scrubber dot position
      const pct = seen / total;
      document.getElementById('progress').style.width = `${pct * 100}%`;
      const scrubber = document.getElementById('scrubDot');
      if (scrubber) scrubber.style.left = `${pct * 100}%`;

      photoEl.onload = () => {
        if (photoEl.naturalWidth < photoEl.naturalHeight) {
          photoEl.style.objectFit = 'contain';
        } else {
          photoEl.style.objectFit = 'cover';
        }
        photoEl.style.objectPosition = memory.position || 'center center';
        photoEl.style.transition = 'opacity 0.45s ease, transform 0.5s ease';
        photoEl.style.opacity = '1';
        photoEl.style.transform = 'scale(1)';
      };
      photoEl.onerror = () => {
        photoEl.style.opacity = '1';
        photoEl.style.transform = 'scale(1)';
      };

      photoEl.src = memory.photo;
      captionEl.classList.remove('fade-out');
    }, 380);
  }

  // ── SCRUBBER ──
  // drag the dot on the progress bar to jump to any photo
  const track = document.getElementById('progressTrack');
  const dot = document.getElementById('scrubDot');

  if (track && dot) {
    let dragging = false;

    function scrubTo(clientX) {
      const rect = track.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const index = Math.floor(pct * total);
      // jump queue to that position
      seen = index;
      queue = memories.slice(index);
      shuffle(queue);
      document.getElementById('progress').style.width = `${pct * 100}%`;
      dot.style.left = `${pct * 100}%`;
      showNext();
    }

    dot.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
    document.addEventListener('mousemove', (e) => { if (dragging) scrubTo(e.clientX); });
    document.addEventListener('mouseup', () => { dragging = false; });

    // touch support
    dot.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); });
    document.addEventListener('touchmove', (e) => { if (dragging) scrubTo(e.touches[0].clientX); });
    document.addEventListener('touchend', () => { dragging = false; });

    // click anywhere on track to jump
    track.addEventListener('click', (e) => scrubTo(e.clientX));
  }

  document.getElementById('newMemory').addEventListener('click', showNext);
  refillQueue();
  showNext();

}); // end DOMContentLoaded