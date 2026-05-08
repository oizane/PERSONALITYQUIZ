// --- CONFIGURATION ---

const gptModel = "gpt-4o-mini";

// --- GAME VARIABLES ---
let powerWords = ""; // MUST BE AT THE TOP

let orcsKilled = 0;

let bulletsFired = [];

let targetOrcs = [];

let hero;

let mapImg, heroImg, orcImg, arrowImg;

let gameActive = false;

let aiGeneratedResult = "Analyzing your performance...";

let aiMotto = ""; // Add this here

let compatibleClass = ""; // Add this near 'let aiMotto'

let aiGrowthPoints = []; // Add this at the top with other game variables

let userAPIKey = "";

let playerName = "";

let gameStartTime = 0;

let classCircles = {};

let canvasOffsetX, canvasOffsetY; // Add this at the very top

let enterBtnScale = 1.0; // Starts at normal size

let bgMusic, revealSound, typeSound, hitSound, hoverSound, clickSound;
let isTypewriterPlaying = false;

let infoHoverTriggered = false;

let normalMusic, fightMusic; // Add these to your top variables


let clickHereBtn; // Add this at the top
let handImg;
let isHoveringAbout = false;
let isHoveringClickHere = false; // For the Result Class Card

let aboutImg; // Add this at the top with other variables

// ADDED FOR COUNTDOWN

let countdownTimer = 5;

let lastCountTime = 0;

// 1. VIDEO CALIBRATION

let vidX = 260;

let vidY = 269;

let vidW = 580;

let vidH = 305;

// Quiz & Narrative State

let quizState = "apikey";

let currentStep = 0;

let userAnswers = [];

let traitScores = { tank: 0, mage: 0, rogue: 0, support: 0 };

let finalImg, arcadeImg;

let pixelFont, pixelFontBold;

// --- TYPEWRITER VARIABLES ---

let displayedText = "";

let typeIndex = 0;

let typeSpeed = 2;

// Neon Color Variables

let neonPink, neonBlue;

let fallingBlocks = [];

// Assets & UI

let currentVideo;

let videos = {};

let classImages = {};

let apiKeyInput,
  saveButton,
  nextBtn,
  portalEnterBtn,
  walkAwayBtn,
  reflectionInput,
  submitBtn,
  restartBtn;

let optionButtons = [];

function injectPixelFont() {
  let fontStyle = document.createElement("style");

  fontStyle.innerHTML = `

    @font-face { font-family: 'PixeloidSansCustom'; src: url('FONT/PixeloidSans-lxa3y.ttf'); }

    @font-face { font-family: 'PixeloidSansBoldCustom'; src: url('FONT/PixeloidSansBold-1jpBg.ttf'); }

  `;

  document.head.appendChild(fontStyle);
}

function preload() {
  pixelFont = loadFont('FONT/PixeloidSans-lxa3y.ttf');
  pixelFontBold = loadFont('FONT/PixeloidSansBold-1jpBg.ttf'); 
  arcadeImg = loadImage('SCENE/WALLPAPER SCENE1.png'); 
  
  mapImg = loadImage('GAME/MAP.png');
  heroImg = loadImage('GAME/HERO.png');
  orcImg = loadImage('GAME/ORC.png');
  arrowImg = loadImage('GAME/ARROW.png');
    handImg = loadImage("SCENE/HAND.png"); 
  classCircles['tank'] = loadImage('HEROCIRCLE/TANKCIRCLE.png');
  classCircles['mage'] = loadImage('HEROCIRCLE/MAGECIRCLE.png');
  classCircles['rogue'] = loadImage('HEROCIRCLE/ROGUECIRCLE.png');
  classCircles['support'] = loadImage('HEROCIRCLE/SUPPORTCIRCLE.png');
  
  classImages['tank'] = loadImage('IMAGES/tank.png');
  classImages['mage'] = loadImage('IMAGES/mage.png');
  classImages['rogue'] = loadImage('IMAGES/rogue.png');
  classImages['support'] = loadImage('IMAGES/support.png');
  aboutImg = loadImage('SCENE/ABOUT1.png');
  
  bgMusic = loadSound('AUDIO/SONG.mp3');
    revealSound = loadSound('AUDIO/REVEAL.mp3');
    typeSound = loadSound('AUDIO/TYPEWR.mp3');
    hitSound = loadSound('AUDIO/HITENER.mp3');
    hoverSound = loadSound('AUDIO/BUTTONSOUND.mp3');
    clickSound = loadSound('AUDIO/SOUNDEFFECT.mp3');
  
  // ... your other assets ...
  normalMusic = loadSound('AUDIO/NORMAL.mp3'); // Update extension if needed
  fightMusic = loadSound('AUDIO/FIGHTMUSIC.mp3');
  startMusic = loadSound('AUDIO/STARTMUSIC.mp3');
  

  // Story Videos
  videos['api'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771258681/api_kh1i4p.mp4');
  videos['intro1'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253282/INTRODUCTION_1_fd8piq.mp4');
  videos['intro2'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253283/INTRODUCTION_2_wzufoo.mp4');
  videos['q1'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253282/QUESTION_1_bsrpg2.mp4');
  videos['q2'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253282/QUESTION_2_louy94.mp4');
  videos['q3'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253285/QUESTION_3_bbdjo7.mp4');
  videos['q4'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253285/QUESTION_4_retisa.mp4');
  videos['q5'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253285/QUESTION_5_cypvsi.mp4');
  videos['q6'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253285/QUESTION_5_cypvsi.mp4'); 
  videos['q7'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253282/QUESTION_7_l1bkez.mp4');
  videos['q8'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771253287/QUESTION_8_dphsbw.mp4');

  // Result Videos
  videos['mage_res'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771518014/RESULTMAGE_nfqyob.mp4');
  videos['tank_res'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771518010/RESULTTANK_ti78yg.mp4');
  videos['rogue_res'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771518010/RESULTROGUE_yavokj.mp4');
  videos['support_res'] = createVideo('https://res.cloudinary.com/dkhkggkdj/video/upload/v1771518010/RESULTSUPPORT_tc7hjt.mp4');

  Object.values(videos).forEach(v => { v.hide(); v.loop(); v.volume(0); });
}

function setup() {
  injectPixelFont();

  // 1. MUST BE FIRST: Create Canvas and Calculate Offsets
  createCanvas(1920, 828.57);
  canvasOffsetX = (width - 1100) / 2;
  canvasOffsetY = (height - 828.57) / 2;

  angleMode(DEGREES);
  neonPink = color(255, 50, 150);
  neonBlue = color(50, 200, 255);
  
  // --- AUDIO SETUP ---
  // Prevents the "Kill" sound from lagging if you hit multiple orcs fast
  if (hitSound) hitSound.playMode('restart'); 
  
  // Typewriter sound setup
  if (typeSound) typeSound.setVolume(0.5);

  // START MENU MUSIC
  if (startMusic) {
    startMusic.loop();
    startMusic.setVolume(0.4);
  }

  // 2. INITIALIZE ASSETS
  // Updated to width/height to cover the full 1920x828 canvas
  for (let i = 0; i < 100; i++) {
    fallingBlocks.push({
      x: random(width), 
      y: random(height),
      size: random(4, 14),
      speed: random(0.5, 2.5),
      rot: random(360),
      rotSpeed: random(0.01, 0.08),
    });
  }
  
  

  // --- API KEY INPUT ---
 apiKeyInput = createInput("").attribute("placeholder", "ENTER API KEY");
  apiKeyInput.position(canvasOffsetX + (1100 / 1.97 - 105), canvasOffsetY + 450);
  apiKeyInput.style("padding", "12px");
  apiKeyInput.style("background", "#111");
  apiKeyInput.style("color", "#0ff");
  apiKeyInput.style("border", "2px solid #0ff");
  apiKeyInput.style("font-family", "PixeloidSansCustom");
  apiKeyInput.style("text-align", "center");
  apiKeyInput.style("box-shadow", "0 0 10px #0ff");

  // --- SAVE / INSERT COIN BUTTON ---
  saveButton = createButton("INSERT COIN");
  saveButton.position(canvasOffsetX + (1100 / 1.97 - 90), canvasOffsetY + 730);
  styleArcadeButton(saveButton, 180, 50, 18);
  saveButton.mousePressed(startNarrative);

  // --- NEXT BUTTON ---
  nextBtn = createButton("NEXT");
  nextBtn.position(canvasOffsetX + (1100 / 2 - 110), canvasOffsetY + 700);
  nextBtn.mousePressed(advance);
  nextBtn.hide();
  styleArcadeButton(nextBtn, 220, 60, 18);

  // --- PORTAL ENTER BUTTON ---
  portalEnterBtn = createButton("ENTER");
  portalEnterBtn.position(canvasOffsetX + (1100 / 2 - 230), canvasOffsetY + 700);
  portalEnterBtn.mousePressed(advance);
  portalEnterBtn.hide();
  styleArcadeButton(portalEnterBtn, 220, 60, 18);

// --- WALK AWAY BUTTON (With Grow Effect) ---
  walkAwayBtn = createButton("WALK AWAY");
  walkAwayBtn.position(canvasOffsetX + (1100 / 2 + 10), canvasOffsetY + 700);
  walkAwayBtn.hide();
  styleArcadeButton(walkAwayBtn, 220, 60, 18);

  // Your existing move-on-hover logic
  walkAwayBtn.mouseOver(() => {
    let randomX = random(300, 800); 
    let randomY = random(400, 700);
    walkAwayBtn.position(canvasOffsetX + randomX, canvasOffsetY + randomY);
  });

  // NEW: When clicked, make the ENTER button grow
  walkAwayBtn.mousePressed(() => {
    enterBtnScale += 0.2; // Increase size by 50% each click
    
    // Update the Enter button's CSS in real-time
    portalEnterBtn.style("transform", `scale(${enterBtnScale})`);
    portalEnterBtn.style("transform-origin", "center");
    
    // Optional: Make it glow even brighter as it gets bigger
    let glow = 15 + (enterBtnScale * 5);
    portalEnterBtn.style("box-shadow", `0 0 ${glow}px #f0f, inset 0 0 10px #f0f`);
  });

  // --- REFLECTION INPUT ---
  reflectionInput = createElement("textarea", "").hide();
  reflectionInput.position(canvasOffsetX + (1100 / 2 - 250), canvasOffsetY + 580);
  reflectionInput.size(500, 120);
  reflectionInput.style("background", "rgba(17, 17, 17, 0.9)");
  reflectionInput.style("color", "#0ff");
  reflectionInput.style("border", "2px solid #0ff");
  reflectionInput.style("font-family", "PixeloidSansCustom");
  reflectionInput.style("font-size", "18px");
  reflectionInput.style("padding", "10px");
  reflectionInput.style("box-shadow", "0 0 15px #0ff");
  reflectionInput.attribute("placeholder", "PLEASE SHARE YOUR NAME AND YOUR STORY...");

// --- SUBMIT BUTTON ---
submitBtn = createButton("SUBMIT").hide();
submitBtn.position(canvasOffsetX + (1100 / 2 - 110), canvasOffsetY + 720);
styleArcadeButton(submitBtn, 220, 80, 22);

submitBtn.mousePressed(() => {
  let userInput = reflectionInput.value().trim();
  
  if (userInput !== "") {
    // Labeling this "PLAYER_IDENTITY" makes it much easier for the AI to find
    userAnswers.push(`PLAYER_IDENTITY: ${userInput}`);
  } else {
    userAnswers.push(`PLAYER_IDENTITY: A Mysterious Hero`);
  }
  
  if (clickSound) clickSound.play();
  advance();
});

  // --- RESTART BUTTON ---
  restartBtn = createButton("RESTART");
  restartBtn.position(canvasOffsetX + (1100 / 2 - 90), canvasOffsetY + 750);
  restartBtn.mousePressed(() => location.reload());
  restartBtn.hide();
  styleArcadeButton(restartBtn, 180, 50, 18);

  // --- INITIAL VIDEO ---
  currentVideo = videos["api"];
  currentVideo.play();

  hero = new Hero(vidX + vidW / 2, vidY + vidH / 2);
}

function styleArcadeButton(btn, w, h, fSize) {
  btn.style("width", w + "px");

  btn.style("height", h + "px");

  btn.style("font-size", fSize + "px");

  btn.style("font-family", "PixeloidSansCustom");

  btn.style("background", "#111");

  btn.style("color", "white");

  btn.style("border", "2px solid #f0f");

  btn.style("cursor", "pointer");

  btn.style("border-radius", "4px");

  btn.style("box-shadow", "0 0 15px #f0f, inset 0 0 10px #f0f");

  btn.style("transition", "all 0.4s ease");

  btn.style("line-height", "1.1");

btn.mouseOver(() => {
    // PLAY HOVER SOUND HERE
    if (hoverSound && !hoverSound.isPlaying()) {
      hoverSound.play();
    }

    btn.style("box-shadow", "0 0 25px #0ff, inset 0 0 15px #0ff");
    btn.style("border", "2px solid #0ff");
    btn.style("color", "#0ff");
  });

  btn.mouseOut(() => {
    btn.style("box-shadow", "0 0 15px #f0f, inset 0 0 10px #f0f");

    btn.style("border", "2px solid #f0f");

    btn.style("color", "white");
  });
}

function showHorizontalMCQ(options) {
  if (optionButtons.length === 0) {
    let monitorWidth = 580;
    // We use the local 1100-width coordinate system here
    let monitorStart = 1100 / 2 - 280; 

    let btnW = 240;
    let btnH = 70;
    let fSize = 16;
    let gap = 50;
    let posY = 650;

    let totalWidth = options.length * btnW + (options.length - 1) * gap;
    let startX = monitorStart + (monitorWidth - totalWidth) / 2;

    for (let i = 0; i < options.length; i++) {
      let btn = createButton(options[i].txt)
        // Add the offsets here so the button moves with the machine
        .position(canvasOffsetX + startX + i * (btnW + gap), canvasOffsetY + posY)
        .size(btnW, btnH);

      styleArcadeButton(btn, btnW, btnH, fSize);

      btn.mousePressed(() => {
        // 1. Update the numerical score for classification
        if (options[i].trait) {
            traitScores[options[i].trait]++;
        }
        
        // 2. Store the full text for the LLM journey log
        // This ensures ChatGPT sees the context of the user's choices
        userAnswers.push(`Choice: ${options[i].txt} (Trait: ${options[i].trait})`);
        
        // 3. Audio feedback
        if (clickSound) {
            clickSound.play();
        }

        // 4. Move to next scene
        advance();
      });

      optionButtons.push(btn);
    }
  }
}

function draw() {
  background(0); // Outer letterboxing stays black

  // --- 1. NEON CALCULATION (Global) ---
  let neonTime = frameCount * 1.2;
  let currentColor = lerpColor(neonPink, neonBlue, (sin(neonTime) + 1) / 2);

  // --- 2. LAYER 1: NEON BLOCKS (Backmost - Full Screen) ---
  rectMode(CENTER);
  noStroke();
  for (let b of fallingBlocks) {
    fill(red(currentColor), green(currentColor), blue(currentColor), 180);
    push();
    translate(b.x, b.y); 
    rotate(b.rot);
    rect(0, 0, b.size, b.size);
    pop();

    b.y += b.speed;
    b.rot += b.rotSpeed;

    if (b.y > height + 20) {
      b.y = -20;
      b.x = random(width);
    }
  }
  rectMode(CORNER);

  // --- 3. START THE ARCADE TRANSLATION ---
  push();
  translate(canvasOffsetX, canvasOffsetY);

  // --- 4. LAYER 2: THE ARCADE AURA ---
  let pulse = sin(neonTime * 0.5) * 40;
  drawingContext.shadowBlur = 120 + pulse;
  drawingContext.shadowColor = currentColor;
  fill(0);
  rect(1100 / 2 - 280, 100, 580, 750, 50);
  drawingContext.shadowBlur = 0;

  // --- 5. LAYER 3: MONITOR AREA ---
  if (quizState === "game") {
    image(mapImg, vidX, vidY, vidW, vidH);
    runShootingMiniGame();
  } else if (quizState === "loading") {
    fill(10, 10, 15);
    rect(vidX, vidY, vidW, vidH);
  } else if (quizState === "result") {
    if (currentVideo) image(currentVideo, vidX, vidY, vidW, vidH);
  } else {
    if (currentVideo) image(currentVideo, vidX, vidY, vidW, vidH);
  }

  // --- 6. LAYER 4: ARCADE WALLPAPER ---
  image(arcadeImg, 0, 0, 1100, 828.57);

  // --- 7. LAYER 5: UI & TEXT ---
  textAlign(CENTER, CENTER);
  let marqueeY = 54;
  let arcadeMidX = 1100 / 1.97; 

  if (quizState === "narrative" || quizState === "game") {
    drawProgressBar();
  }

  // --- STATE: API KEY ---
  if (quizState === "apikey") {
    let flash = sin(frameCount * 12) > 0 ? 255 : 100;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = currentColor;
    textFont(pixelFontBold); fill(currentColor); textSize(40);
    text("CAREER QUEST", arcadeMidX, marqueeY + 15);
    textFont(pixelFont); textSize(18);
    text("DISCOVER THE ROLE YOU WERE MEANT TO PLAY", arcadeMidX, marqueeY + 60);
    drawingContext.shadowBlur = 0;
    fill(255, flash); textSize(16);
    text("PLEASE INPUT ACCESS KEY TO START", arcadeMidX, 430);

  // --- STATE: LOADING ---
  } else if (quizState === "loading") {
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = currentColor;
    textFont(pixelFontBold); fill(currentColor); textSize(24);
    text("ANALYZING PERFORMANCE...", arcadeMidX, vidY + vidH / 2 - 20);
    let barWidth = 200;
    let progress = (frameCount * 3) % barWidth;
    noFill(); stroke(currentColor); strokeWeight(2);
    rect(arcadeMidX - barWidth / 2, vidY + vidH / 2 + 20, barWidth, 15);
    fill(currentColor); noStroke();
    rect(arcadeMidX - barWidth / 2, vidY + vidH / 2 + 20, progress, 15);
    drawingContext.shadowBlur = 0;

  // --- STATE: RESULT ---
  } else if (quizState === "result") {
    drawResult(); 

  // --- STATE: NARRATIVE ---
  } else if (quizState === "narrative") {
    let step = storyFlow[currentStep];

    if (step.type === "gameTrigger") {
      if (typeSound) typeSound.stop(); 
      
      // --- MUSIC SWAP: NORMAL TO FIGHT ---
      if (normalMusic && normalMusic.isPlaying()) normalMusic.pause();
      if (fightMusic && !fightMusic.isPlaying()) fightMusic.loop();

      quizState = "game";
      countdownTimer = 5;
      lastCountTime = millis();
      gameStartTime = millis();
      pop(); 
      return;
    }

    let fullText = step.text || step.story;
    
    // --- TYPEWRITER AUDIO LOGIC ---
    if (typeIndex < fullText.length) {
      if (frameCount % typeSpeed === 0) {
        typeIndex++;
        if (typeSound && !typeSound.isPlaying()) {
          typeSound.loop(); 
        }
      }
    } else {
      if (typeSound && typeSound.isPlaying()) {
        typeSound.stop(); 
      }
    }

    displayedText = fullText.substring(0, typeIndex);

    fill(currentColor); textFont(pixelFontBold); textSize(18);
    text(step.title || step.q, arcadeMidX, marqueeY + 60);
    fill(255); textFont(pixelFont); textSize(15);
    rectMode(CENTER);
    text(displayedText, arcadeMidX, marqueeY + 20, 520, 200);
    rectMode(CORNER);

    if (typeIndex >= fullText.length) {
      if (step.type === "openQ") { reflectionInput.show(); submitBtn.show(); }
      else if (step.type === "quiz") showHorizontalMCQ(step.options);
      else if (step.type === "intro1") nextBtn.show();
      else if (step.type === "intro2") { portalEnterBtn.show(); walkAwayBtn.show(); }
    }
  }
  
  // --- STATE: MINI GAME HUD ---
  if (quizState === "game") {
    push();
    textAlign(CENTER, CENTER);
    textFont(pixelFontBold); 
    textSize(40);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = neonPink; 
    fill(255, 50, 150); 
    text("KILLS: " + orcsKilled, arcadeMidX, marqueeY + 15);
    pop();
  }

  // --- NEON SNAKE INFO BUTTON (Conditional Hide) ---
  // Only draw if NOT hovering over the result card information button
  if (!isHoveringClickHere) {
    let infoW = 300; 
    let infoH = 28;   
    let infoX = (1100 / 1.97) - (infoW / 2);
    let infoY = 174; 
    let radius = 8; 

    let overInfo = (mouseX - canvasOffsetX > infoX && mouseX - canvasOffsetX < infoX + infoW &&
                    mouseY - canvasOffsetY > infoY && mouseY - canvasOffsetY < infoY + infoH);
    
    push();
    if (overInfo) {
      if (!infoHoverTriggered) {
        if (hoverSound) hoverSound.play();
        infoHoverTriggered = true; 
      }
      isHoveringAbout = true;
      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = currentColor; 
    } else {
      isHoveringAbout = false;
      infoHoverTriggered = false;
    }
    
    noStroke();
    fill(10, 10, 15, 180);
    rect(infoX, infoY, infoW, infoH, radius);

    // Border Snake Effect
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = currentColor;
    stroke(currentColor);
    strokeWeight(3);
    noFill();
    drawingContext.setLineDash([80, 5]); 
    drawingContext.lineDashOffset = -frameCount * 1.5; 
    rect(infoX, infoY, infoW, infoH, radius);
    drawingContext.setLineDash([]); 

    // Button Text
    drawingContext.shadowBlur = 0;
    noStroke();
    fill(overInfo ? currentColor : 255); 
    textFont(pixelFontBold);
    textSize(10);
    text("<  R E V E A L   G A M E   M A N U A L  >", infoX + infoW/2, infoY + infoH/2);
    pop();
  } else {
    // Failsafe: if the manual was open when the switch happened, hide it.
    isHoveringAbout = false;
  }

  pop(); // End Arcade Translation

  // --- FULL CANVAS OVERLAY ---
  if (isHoveringAbout && aboutImg) {
    image(aboutImg, 0, 0, width, height);
  }
}

function advance() {
  
  if (typeSound) typeSound.stop(); // Kill audio immediately on click
  // --- RESET SCALE ---
  enterBtnScale = 1.0; 
  if (portalEnterBtn) portalEnterBtn.style("transform", "scale(1.0)");

  // --- REST OF YOUR ADVANCE CODE ---
  optionButtons.forEach((b) => b.remove());
  optionButtons = [];

  nextBtn.hide();
  portalEnterBtn.hide();
  walkAwayBtn.hide();
  reflectionInput.hide();
  submitBtn.hide();

  typeIndex = 0;
  displayedText = "";

currentStep++;

  if (currentStep < storyFlow.length) {
    // NEW: If this is the last question, ask the AI for a prompt
    if (storyFlow[currentStep].type === "openQ" && currentStep === storyFlow.length - 1) {
      generatePersonalizedQuestion();
    }
    syncVideo();
  } else {
    finalizeQuiz();
  }
}

function syncVideo() {
  let step = storyFlow[currentStep];

  if (step && step.vid) {
    if (currentVideo) currentVideo.pause();

    currentVideo = videos[step.vid];

    currentVideo.loop();
    currentVideo.play();
  }
}
function startNarrative() {
  if (apiKeyInput.value()) {
    // 1. STOP the menu music
    if (startMusic && startMusic.isPlaying()) {
      startMusic.stop();
    }
    
    // 2. START the main quest music
    if (normalMusic && !normalMusic.isPlaying()) {
      normalMusic.loop();
      normalMusic.setVolume(0.5);
    }

    // 3. CHANGE STATE
    quizState = "narrative";
    apiKeyInput.hide();
    saveButton.hide();
    
    syncVideo();
  }
}


async function generatePersonalizedQuestion() {
  let answersSummary = userAnswers.join("\n");
  let userKey = apiKeyInput.value();
  
const prompt = `You are a wise, mystical Arcade AI. You have observed the player's journey and want to help them realize their true potential.
  
  PLAYER HISTORY:
  ${answersSummary}
  
  TASK:
  1. Pick one positive choice or an impressive stat (like ${orcsKilled} kills).
  2. Ask a deep, encouraging reflection question that connects their game choice to their real-world character.
  3. Frame it like: "You showed great [Trait] when you [Action]. How does this inner strength help you overcome challenges in your own world?"
  4. Max 20 words. Be warm, philosophical, and inspiring.
  
  ONLY return the question text.`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userKey}`,
      },
      body: JSON.stringify({
        model: gptModel,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    let aiQuestion = data.choices[0].message.content;

    // Update the storyFlow dynamically!
    storyFlow[currentStep].q = "THE FINAL WHISPER...";
    storyFlow[currentStep].story = aiQuestion;

    // Reset typewriter to show the new AI question
    typeIndex = 0; 
  } catch (e) {
    storyFlow[currentStep].story = "What did you discover about yourself in the mist?";
  }
}

async function finalizeQuiz() {
  quizState = "loading";
  
  // 1. Determine the top class based on scores
  let topClass = Object.keys(traitScores).reduce((a, b) =>
    traitScores[a] > traitScores[b] ? a : b
  );

  // --- NEW: Define Thematic Keywords based on Class for the "3 Power Words" ---
  let classTheme = "";
  if (topClass === 'tank') classTheme = "Protection, Resilience, and Unwavering Fortitude";
  else if (topClass === 'mage') classTheme = "Arcane Wisdom, Strategic Insight, and Mastery";
  else if (topClass === 'rogue') classTheme = "Precision, Agility, and Calculated Risk";
  else if (topClass === 'support') classTheme = "Synergy, Restoration, and Empowering Others";
  else classTheme = "Balance, Versatility, and Adaptability";

  userAPIKey = apiKeyInput.value();

  // 2. CONVERT THE ARRAY OF ANSWERS INTO A SINGLE STRING FOR THE AI
  let answersSummary = userAnswers.join("\n");
  
  console.log("DEBUG - Class:", topClass);
  console.log("DEBUG - Journey Log:", answersSummary);

  // 3. ENHANCED PROMPT (Merging Class Theme with Journey Log)
  const prompt = `The player was classified as the hero class: ${topClass.toUpperCase()}.
  Battle Performance: ${orcsKilled} orcs defeated.
  
  THEME: Base the final 3 Power Words strictly on these traits: ${classTheme}.

  USER'S JOURNEY LOG (Specific choices and self-reflection):
  ${answersSummary}

  Based on the class and the "Journey Log" (especially the final reflection in PLAYER_IDENTITY), generate:
  
  1. NAME: Search PLAYER_IDENTITY for the player's name. If no name is found, use "Traveller".
  2. MOTTO: A bold, self-motivational quote (5-10 words) addressed to the player.
  3. INSIGHT: A 2-sentence professional personality description. 
     - Sentence 1: Start with "Hey [NAME] As a [CLASS NAME], you..." 
     - Sentence 2: Abstract and integrate [Journey Log] and "strength" they wrote in PLAYER_IDENTITY into a career context. (e.g., "Your self-identified resilience translates to...").
     - Use "You/Your" exclusively. Do not copy-paste; rephrase the reflection into a career insight.
  4. WORDS: Three powerful traits following the THEME, formatted as Word1 | Word2 | Word3.
  5. GROWTH: 3 specific suggestions (Team, Skill, Leadership).

  Format your response EXACTLY like this:
  NAME: [Extracted Name]
  MOTTO: [The Quote]
  INSIGHT: [The 3-Sentence Description]
  GROWTH: [Team] | [Skill] | [Leadership]
  WORDS: [The Power Words]`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAPIKey}`,
      },
      body: JSON.stringify({
        model: gptModel,
        messages: [{ role: "user", content: prompt }],
      }),
    });

const data = await response.json();
    let rawContent = data.choices[0].message.content;

    let lines = rawContent.split('\n').filter(l => l.trim() !== "");
    
    // --- ADD THIS: Extract Name ---
    let nameLine = lines.find(l => l.toUpperCase().startsWith("NAME:"));
    playerName = nameLine ? nameLine.replace(/NAME:/i, "").trim() : "MYSTERIOUS HERO";

    // Extract Motto (Existing logic)
    let mottoLine = lines.find(l => l.toUpperCase().startsWith("MOTTO:"));
    aiMotto = mottoLine ? mottoLine.replace(/MOTTO:/i, "").trim() : "A LEGEND IN THE MAKING";

    // Extract Insight (Existing logic - this will now contain the abstracted Q8 data)
    let insightLine = lines.find(l => l.toUpperCase().startsWith("INSIGHT:"));
    aiGeneratedResult = insightLine ? insightLine.replace(/INSIGHT:/i, "").trim() : "Your destiny is still unfolding.";

    // Extract Growth
    let growthLine = lines.find(l => l.toUpperCase().startsWith("GROWTH:"));
    if (growthLine) {
      aiGrowthPoints = growthLine.replace(/GROWTH:/i, "").split('|').map(p => p.trim());
    } else {
      aiGrowthPoints = ["Work closer with the team", "Master your current tools", "Take initiative on projects"];
    }

    // Extract Words (Now Class-Themed)
    let wordsLine = lines.find(l => l.toUpperCase().startsWith("WORDS:"));
    powerWords = wordsLine ? wordsLine.replace(/WORDS:/i, "").trim().toUpperCase() : "STRENGTH | HONOR | DUTY";

  } catch (error) {
    console.error("API Error:", error);
    aiMotto = "THE PROPHECY IS WRITTEN";
    aiGeneratedResult = "THE STARS HAVE ALIGNED.";
    aiGrowthPoints = ["Build trust", "Learn constantly", "Lead by example"]; 
    powerWords = "COURAGE | STRENGTH | HONOR";
  }

  // 4. TRANSITION TO RESULT STATE
  quizState = "result";
  let classes = ['tank', 'mage', 'rogue', 'support'];
  let otherClasses = classes.filter(c => c !== topClass);
  compatibleClass = random(otherClasses); 

  if (currentVideo) currentVideo.pause();
  currentVideo = videos[topClass + "_res"];
  currentVideo.play();

  finalImg = classImages[topClass];
  restartBtn.show();

  // 5. SETUP RESULT UI BUTTON
  if (clickHereBtn) clickHereBtn.remove();

  clickHereBtn = createButton("CLASS INFORMATION");
  clickHereBtn.position(canvasOffsetX + (1100 / 2 - 110), canvasOffsetY + 650);
  styleArcadeButton(clickHereBtn, 220, 60, 18);
  
  isHoveringClickHere = false;

  clickHereBtn.mouseOver(() => { 
    isHoveringClickHere = true; 
  });
  
  clickHereBtn.mouseOut(() => { 
    isHoveringClickHere = false; 
  });
}

function drawResult() {
  let topClass = Object.keys(traitScores).reduce((a, b) =>
    traitScores[a] > traitScores[b] ? a : b
  );

  // --- MARQUEE TITLE: Strictly the Class (No Name) ---
  let titleText = topClass.toUpperCase();
  
  let neonTime = frameCount * 1.2;
  let currentColor = lerpColor(neonPink, neonBlue, (sin(neonTime) + 1) / 2);
  let marqueeY = 54;
  let arcadeMidX = 1100 / 1.97; 

  // --- 1. DRAW THE TOP MARQUEE ---
  textAlign(CENTER, CENTER);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = currentColor;
  textFont(pixelFontBold);
  fill(currentColor);
  
  textSize(40); // Marquee Title
  text(titleText, arcadeMidX, marqueeY + 15);

  drawingContext.shadowBlur = 0;
  textFont(pixelFont);
  fill(255);
  textSize(16);

  let subtitle = powerWords ? powerWords : "HOVER BELOW TO REVEAL CARD";
  text(subtitle, arcadeMidX, marqueeY + 60);

  // --- 2. DRAW THE RESULT CARD (Triggers on Button Hover) ---
  if (isHoveringClickHere && handImg) {
    image(handImg, -50, 0, 1200, 828.57);

    // Hero Icon
    if (classCircles[topClass]) {
      image(classCircles[topClass], 200, 110, 170, 170); 
    }

    // AI Motto (Self Motivational Quote)
    fill(40);
    textFont(pixelFontBold); 
    textSize(36); 
    textAlign(LEFT, CENTER);
let displayMotto = aiMotto.toUpperCase();
text(displayMotto, 380, 195, 600);

    // AI Insight (Where "Bob" and his strength are abstracted)
    textFont(pixelFont);
    textSize(16.5); 
    textAlign(LEFT, TOP);
    text(aiGeneratedResult, 220, 280, 700, 150); 

// --- 3. STATS VISUALIZATION (Replacing Growth Suggestions) ---
    let statsY = 400; 
    let leftSideX = 220; 
    let barMaxWidth = 230; 

    fill(40);
    textFont(pixelFontBold);
    textSize(18);
    textAlign(LEFT, TOP);
    text("CHARACTER STATS:", leftSideX, statsY);

    // This creates the data for your 4 bars using your game scores
    let stats = [
      { label: "STRENGTH", val: map(traitScores.tank, 0, 5, 45, 95) },
      { label: "INTELLECT", val: map(traitScores.mage, 0, 5, 45, 98) },
      { label: "AGILITY", val: map(traitScores.rogue, 0, 5, 45, 92) },
      { label: "SYNERGY", val: map(traitScores.support, 0, 5, 45, 99) }
    ];

// 1. Find the highest value in the stats array first
    let highestVal = Math.max(...stats.map(s => s.val));

stats.forEach((s, i) => {
      let y = statsY + 35 + (i * 32); 
      let barH = 16; 
      let barX = leftSideX + 110; // The starting X of the bars
      
      // --- 1. STAT LABEL ALIGNMENT ---
      textFont(pixelFont); 
      textSize(14.5); 
      fill(60);
      textAlign(LEFT, CENTER); // Use CENTER vertical alignment
      // Draw text at (y + barH/2) to perfectly center it with the bar's height
      text(s.label, leftSideX, y + barH / 2);

      // --- 2. BACKGROUND BAR ---
      fill(220);
      noStroke();
      rect(barX, y, barMaxWidth, barH, 8);

      // --- 3. DYNAMIC COLOR LOGIC ---
      let barColor;
      if (s.label === "STRENGTH") barColor = color(255, 100, 100);
      else if (s.label === "INTELLECT") barColor = color(50, 200, 255); // Neon Blue
      else if (s.label === "AGILITY") barColor = color(0, 150, 80);
      else barColor = color(255, 200, 100);

      if (s.val === highestVal) {
        let pulse = (sin(frameCount * 2) + 1) / 2;
        let glowColor = lerpColor(barColor, color(255), pulse); 
        fill(glowColor);
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = glowColor;
      } else {
        fill(barColor);
        drawingContext.shadowBlur = 0;
      }

      // --- 4. DRAW FILLED BAR ---
      let fillWidth = (s.val / 100) * barMaxWidth;
      rect(barX, y, fillWidth, barH, 8);
      drawingContext.shadowBlur = 0;

      // --- 5. SHINE OVERLAY ---
      fill(255, 255, 255, 100);
      rect(barX, y, fillWidth, barH / 2, 8);

      // --- 6. PERCENTAGE IN THE MIDDLE ---
      fill(0); // White looks better inside the colored bars
      textFont(pixelFontBold); 
      textSize(11);
      textAlign(CENTER, CENTER); // Center both horizontally and vertically
      
      // Position is barX + (barMaxWidth / 2) to put it in the dead center of the bar
let percentText = floor(s.val) + "%";
      if (s.val === highestVal) percentText = "HIGHEST " + percentText;
      
      text(percentText, barX + barMaxWidth / 2, y + barH / 2);
    });
    
// --- 4. COMPATIBILITY SECTION ---
    let compatibilityX = 720; // Adjusted right to give stats more room
    let iconSize = 95;
    
    fill(40);
    textFont(pixelFontBold);
    textSize(18);
    textAlign(CENTER, TOP); // Center-align text for this column
    
    // 1. Heading
    text("COMPATIBILITY:", compatibilityX, statsY); 

    if (compatibleClass && classCircles[compatibleClass]) {
        // 2. The Hero Circle Image
        // (Positioned to center the image on the compatibilityX line)
        imageMode(CENTER);
        image(classCircles[compatibleClass], compatibilityX, statsY + 65, iconSize, iconSize);
        imageMode(CORNER); // Reset to default so it doesn't break other images

        // 3. The Class Name Label (e.g., "SUPPORT")
        textFont(pixelFont);
        textSize(14);
        fill(60);
        // Positioned below the circle icon
        text(compatibleClass.toUpperCase(), compatibilityX, statsY + 115);
    }
  }
}

const storyFlow = [
  {
    type: "intro1",
    vid: "intro1",
    title: "WHERE DO I BELONG...?",
    text:
      "The city lights shimmer across the bay as you leave work. You did what was expected… yet something feels incomplete.",
  },

  {
    type: "intro2",
    vid: "intro2",
    title: "COME FORWARD...",
    text: "You spot a soft blue portal opens, A whisper calls from the portal",
  },

  {
    type: "quiz",
    vid: "q1",
    q: "WHAT DO YOU DO?",
    story:
      "The portal fades. You spot a castle rises through the mist. Strange enough, it feels as if you were meant to arrive here.",
    options: [
      { txt: "A) Find a shortcut toward the castle", trait: "rogue" },
      { txt: "B) Analyze and identify potential risks", trait: "mage" },
      { txt: "C) Look for a weapon first", trait: "tank" },
    ],
  },

  {
    type: "quiz",
    vid: "q2",
    q: "HOW DO YOU RESPOND?",
    story:
      "Inside, members of the guild gather within the great hall. As you step through the heavy wooden gate, all eyes turn to you.",
    options: [
      { txt: "A) Go straight to the King to demand a mission", trait: "tank" },
      { txt: "B) Keep your distance and strategize before engaging.", trait: "mage" },
      { txt: "C) Make friends and sync with others", trait: "support" },
    ],
  },

  {
    type: "quiz",
    vid: "q3",
    q: "YOUR APPROACH?",
    story:
      "As you wander the castle halls, you find a hidden chamber where a glowing scroll rests on a stone table",
    options: [
      { txt: "A) Use AI to Analyze the data", trait: "mage" },
      { txt: "B) Take it and run away", trait: "rogue" },
      { txt: "C) Ask others about the scroll", trait: "support" },
    ],
  },

  {
    type: "quiz",
    vid: "q4",
    q: "WHAT ITEM DO YOU GRAB?",
    story:
      "Horns echo through the castle, enemies are approaching.You rush to the armory, where the guild prepares for battle.",
    options: [
      { txt: "A) A Fork & Knife", trait: "tank" },
      { txt: "B) A Slingshot", trait: "rogue" },
      { txt: "C) A Bandage", trait: "support" },
    ],
  },

  {
    type: "quiz",
    vid: "q5",
    q: "WHAT DO YOU DO NEXT?",
    story:
      "Battle erupts at the gate. Your guild struggles to hold the line. With only a helmet, you step forward to fight.",
    options: [
      { txt: "A) Hold the line at all cost", trait: "tank" },
      { txt: "B) Strike the enemy backline", trait: "rogue" },
      { txt: "C) Take command and push forward", trait: "mage" },
    ],
  },

  {
    type: "gameTrigger",
    vid: "q6",
    title: "BATTLE START",
    text: "THE ORCS ARE BREACHING THE GATE! \n\n(WASD: Move | Click: Shoot)",
  },

  {
    type: "quiz",
    vid: "q7",
    q: "BEFORE YOU GO, WHAT CARRIED YOU THIS FAR?",
    story: "Victory settles, As the portal opens, your allies calls you out..",
    options: [
      { txt: "A) Strength within me", trait: "tank" },
      { txt: "B) Courage to take risk", trait: "rogue" },
      { txt: "C) The power of teamwork", trait: "support" },
    ],
  },

{
    type: "openQ",
    vid: "q8",
    q: "A FINAL MOMENT OF CLARITY...",
    story: "..."
  }
];

class Hero {
  constructor(x, y) {
    this.x = x;

    this.y = y;

    this.speed = 3;

    this.size = 60; // New variable to easily change size later
  }

  display() {
    if (heroImg) {
      // We use this.size for width/height, and half of it (30) for the offset

      image(
        heroImg,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }
  }

  move() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.x -= this.speed;

    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.x += this.speed;

    if (keyIsDown(87) || keyIsDown(UP_ARROW)) this.y -= this.speed;

    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.y += this.speed;

    // UPDATED CONSTRAIN: Uses half of the new size (30) so he touches the edges perfectly

    let margin = this.size / 2;

    this.x = constrain(this.x, vidX + margin, vidX + vidW - margin);

    this.y = constrain(this.y, vidY + margin, vidY + vidH - margin);
  }
}

class Bullet {
  constructor(x, y, angle) {
    this.x = x;

    this.y = y;

    this.angle = angle;

    this.speed = 8;

    this.active = true; // Added to track if the bullet is still "on screen"
  }

  display() {
    let sidePadding = 40; // Half of your 48px arrow width

    // CHANGE THIS LINE BELOW:

    if (
      this.x > vidX + sidePadding &&
      this.x < vidX + vidW - sidePadding &&
      this.y > vidY &&
      this.y < vidY + vidH
    ) {
      push();

      translate(this.x, this.y);

      rotate(this.angle);

      if (arrowImg) image(arrowImg, 0, 0, 48, 19);

      pop();
    }
  }

  update() {
    this.x += cos(this.angle) * this.speed;

    this.y += sin(this.angle) * this.speed;

    // ADJUSTMENT: Kill the bullet 5 pixels BEFORE the absolute edge

    if (
      this.x < vidX + 5 ||
      this.x > vidX + vidW - 5 ||
      this.y < vidY + 5 ||
      this.y > vidY + vidH - 5
    ) {
      this.active = false;
    }
  }

  hits(orc) {
    return dist(this.x, this.y, orc.x, orc.y) < 35;
  }
}

class Orc {
  constructor() {
    let side = floor(random(4));

    let spawnPadding = 40;

    if (side === 0) {
      // TOP

      this.x = random(vidX + spawnPadding, vidX + vidW - spawnPadding);

      this.y = vidY + spawnPadding;
    } else if (side === 1) {
      // BOTTOM

      this.x = random(vidX + spawnPadding, vidX + vidW - spawnPadding);

      this.y = vidY + vidH - spawnPadding;
    } else if (side === 2) {
      // LEFT

      this.x = vidX + spawnPadding;

      this.y = random(vidY + spawnPadding, vidY + vidH - spawnPadding);
    } else {
      // RIGHT

      this.x = vidX + vidW - spawnPadding;

      this.y = random(vidY + spawnPadding, vidY + vidH - spawnPadding);
    }

    // FIX: Change 'this.speed' to 'this.baseSpeed' so calculateSpeed() can find it

    this.baseSpeed = random(1.5, 2.5);
  }

  calculateSpeed() {
    // This variable 'elapsed' determines how many seconds have passed since the 5s countdown ended.

    let elapsed = (millis() - (gameStartTime + 5000)) / 1000;

    // Safety check for negative time

    if (elapsed < 0) return 0.7;

    // --- STAGE 1: THE START (First 5 seconds of gameplay) ---

    if (elapsed <= 5) {
      return 0.85; // <-- CHANGE THIS for Stage 1 speed (e.g., 1.0 for faster start)
    }

    // --- STAGE 2: THE MID-GAME (Between 5 and 8 seconds) ---
    else if (elapsed > 5 && elapsed <= 7) {
      return this.baseSpeed; // <-- This uses the random(1.5, 2.5) from your constructor
    }

    // --- STAGE 3: THE RAMP UP (After 8 seconds) ---
    else {
      // 0.15 is the "intensity" of the ramp.

      // Higher = Orcs get faster much more quickly.

      let ramp = (elapsed - 7) * 0.15;

      return this.baseSpeed + ramp;
    }
  }

  display() {
    if (orcImg) {
      push();

      image(orcImg, this.x - 36, this.y - 36, 72, 72);

      pop();
    }
  }

  update(hx, hy) {
    let currentSpeed = this.calculateSpeed();

    let angle = atan2(hy - this.y, hx - this.x);

    this.x += cos(angle) * currentSpeed;

    this.y += sin(angle) * currentSpeed;
  }
}

function runShootingMiniGame() {
  // --- 1. COUNTDOWN LOGIC ---
  if (countdownTimer > 0) {
    fill(0, 150);
    rect(vidX, vidY, vidW, vidH);

    fill(0, 255, 255);
    textFont(pixelFontBold);
    textAlign(CENTER);

    textSize(30);
    text("DEFEND THE CASTLE!", 550, vidY + 80);

    textSize(20);
    text("SHOOT DOWN THE ORCS", 550, vidY + 120);

    fill(255);
    textFont(pixelFont);

    textSize(16);
    text("WASD : MOVE", 550, vidY + 170);
    text("AIM & LEFT CLICK : SHOOT", 550, vidY + 200);

    fill(255, 50, 150);
    textSize(50);
    text(countdownTimer, 550, vidY + 260);

    if (millis() - lastCountTime > 1000) {
      countdownTimer--;
      lastCountTime = millis();
    }
    return; 
  }

  // --- 2. HERO & SPAWNING ---
  hero.display();
  hero.move();

  // Spawn a new orc every 60 frames (1 second) if under the limit
  if (frameCount % 60 === 0 && targetOrcs.length < 10) {
    targetOrcs.push(new Orc());
  }

  // --- 3. BULLET LOGIC ---
  for (let i = bulletsFired.length - 1; i >= 0; i--) {
    bulletsFired[i].display();
    bulletsFired[i].update();

    if (!bulletsFired[i].active) {
      bulletsFired.splice(i, 1);
      continue;
    }

    // Check bullet collision with orcs
    for (let j = targetOrcs.length - 1; j >= 0; j--) {
      if (bulletsFired[i] && bulletsFired[i].hits(targetOrcs[j])) {
        targetOrcs.splice(j, 1);
        bulletsFired.splice(i, 1);
        orcsKilled++;

        if (hitSound) {
          hitSound.play(); 
        }
        break;
      }
    }
  }

  // --- 4. ORC UPDATES & COLLISION (With Safety Checks) ---
  for (let i = targetOrcs.length - 1; i >= 0; i--) {
    // Check if orc exists (prevents error if endMiniGame clears the array)
    if (targetOrcs[i]) { 
      targetOrcs[i].display();
      targetOrcs[i].update(hero.x, hero.y);

      // Check for Game Over (Orc touches Hero)
      if (dist(targetOrcs[i].x, targetOrcs[i].y, hero.x, hero.y) < 45) {
        endMiniGame("GAME OVER");
        return; // EXIT the function immediately
      }
    }
  }

  // --- 5. WIN CONDITION ---
  if (orcsKilled >= 50) {
    endMiniGame("ALL ORCS ELIMINATED");
    return; // EXIT the function immediately
  }
}

function endMiniGame(reason) {
  userAnswers.push(`Battle Performance: ${orcsKilled} orcs defeated. Reason: ${reason}`);
  
  // 1. SCORING LOGIC
  if (orcsKilled >= 15) traitScores.rogue++;
  else if (orcsKilled >= 10) traitScores.mage++;
  else if (orcsKilled >= 5) traitScores.tank++;
  else traitScores.support++;

  // 2. STOP THE FIGHT MUSIC
  if (fightMusic && fightMusic.isPlaying()) {
    fightMusic.stop();
  }

  // 3. RESUME THE NORMAL MUSIC
  if (normalMusic && !normalMusic.isPlaying()) {
    normalMusic.loop();
    normalMusic.setVolume(0.5); // Ensure it's at a comfortable level
  }

  // 4. FEEDBACK & STATE UPDATE
  alert(reason + "! Score: " + orcsKilled);
  
  // Clear game assets so they don't linger
  targetOrcs = [];
  bulletsFired = [];

  quizState = "narrative";

  // 5. MOVE TO THE NEXT STEP IN THE STORY
  advance();
}

function mousePressed() {
  if (quizState === "game" && countdownTimer <= 0) {
    // We must subtract the offsets because the Hero is inside the translated push/pop
    let adjustedMouseX = mouseX - canvasOffsetX;
    let adjustedMouseY = mouseY - canvasOffsetY;

    let angle = atan2(adjustedMouseY - hero.y, adjustedMouseX - hero.x);
    bulletsFired.push(new Bullet(hero.x, hero.y, angle));
  }
}

function drawProgressBar() {
  let barW = 330;
  let barH = 17;
  
  // Use the arcade's internal center (approx 558)
  let arcadeMidX = 1100 / 1.97; 
  let barX = arcadeMidX - barW / 2;
  let barY = 240;

  // 1. Draw the Beveled Arcade Casing
  stroke(200);
  strokeWeight(3);
  fill(20, 20, 25);
  rect(barX, barY, barW, barH, 5);

  // 2. Define the segments
  let totalSegments = 10;
  let currentProgress = currentStep + 1;
  let padding = 4;
  let segW = (barW - (totalSegments + 1) * padding) / totalSegments;

  // 3. Draw the Blocks
  for (let i = 0; i < totalSegments; i++) {
    let x = barX + padding + i * (segW + padding);
    
    if (i < currentProgress) {
      noStroke();
      fill(red(neonBlue), green(neonBlue), blue(neonBlue));
      rect(x, barY + padding, segW, barH - padding * 2, 2);

      // Glassy Highlight
      fill(255, 100);
      rect(x, barY + padding, segW, (barH - padding * 2) / 2, 2);
    } else {
      noFill();
      stroke(50);
      strokeWeight(1);
      rect(x, barY + padding, segW, barH - padding * 2, 2);
    }
  }

  // 4. Progress Text
  let percentage = floor((currentProgress / totalSegments) * 100);
  textFont(pixelFont);
  textSize(10);
  textAlign(CENTER);
  fill(255);
  noStroke(); // Ensure text doesn't have the bar's stroke
  
  // FIXED: Changed 'width / 2' to 'arcadeMidX' to keep it centered on the bar
  text(`PROGRESS: ${percentage}%`, arcadeMidX, barY + 7); 
}
