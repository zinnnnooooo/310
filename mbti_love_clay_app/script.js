const questions = [
  { text: "좋아하는 사람이 생기면 나는?", a: "먼저 다가가서 말을 건다", b: "상대가 다가오길 기다린다", typeA: "E", typeB: "I" },
  { text: "데이트 장소를 고를 때 나는?", a: "핫플이나 사람 많은 곳이 좋다", b: "조용하고 편한 공간이 좋다", typeA: "E", typeB: "I" },
  { text: "상대의 마음을 확인할 때 나는?", a: "행동과 현실적인 표현을 본다", b: "말투와 분위기, 숨은 의미를 본다", typeA: "S", typeB: "N" },
  { text: "연애에서 더 중요한 것은?", a: "지금의 안정감", b: "앞으로의 가능성", typeA: "S", typeB: "N" },
  { text: "연인과 다툼이 생기면 나는?", a: "문제의 원인을 논리적으로 해결한다", b: "상대의 감정을 먼저 이해하려 한다", typeA: "T", typeB: "F" },
  { text: "상대가 고민을 말하면 나는?", a: "해결 방법을 바로 제시한다", b: "공감과 위로를 먼저 해준다", typeA: "T", typeB: "F" },
  { text: "데이트 약속을 잡을 때 나는?", a: "미리 계획을 세워야 편하다", b: "그날 기분에 따라 정하고 싶다", typeA: "J", typeB: "P" },
  { text: "연애 스타일에 가까운 것은?", a: "확실하고 안정적인 관계", b: "자유롭고 자연스러운 관계", typeA: "J", typeB: "P" },
  { text: "썸을 탈 때 나는?", a: "표현을 자주 하는 편이다", b: "속으로 많이 생각하는 편이다", typeA: "E", typeB: "I" },
  { text: "기념일을 챙길 때 나는?", a: "실용적인 선물이 좋다", b: "의미 있는 이벤트가 좋다", typeA: "S", typeB: "N" },
  { text: "연애에서 나는?", a: "솔직한 피드백이 중요하다", b: "따뜻한 말과 배려가 중요하다", typeA: "T", typeB: "F" },
  { text: "주말 데이트는?", a: "미리 정해진 코스대로 움직이기", b: "즉흥적으로 하고 싶은 것 하기", typeA: "J", typeB: "P" }
];

const results = {
  ISTJ: { title: "천천히 깊어지는 믿음형 연애", keywords: "#책임감 #안정감 #신뢰 #꾸준함", best: "ESFP, ESTP", hard: "ENFP, ENTP", score: 86, style: "쉽게 마음을 열지는 않지만, 한 번 좋아하면 오래 진심을 다하는 스타일입니다.", strength: "성실하고 약속을 잘 지키며 상대에게 안정감을 줍니다.", weakness: "감정 표현이 부족해 차갑게 보일 수 있습니다." },
  ISFJ: { title: "다정함으로 사랑을 지키는 보호자형", keywords: "#배려 #헌신 #섬세함 #안정", best: "ESFP, ESTP", hard: "ENTP, ENFP", score: 92, style: "상대의 작은 변화도 잘 알아차리고 조용히 챙겨주는 연애를 합니다.", strength: "따뜻하고 세심해서 상대를 편안하게 만듭니다.", weakness: "자기 마음을 참다가 혼자 지칠 수 있습니다." },
  INFJ: { title: "운명 같은 사랑을 꿈꾸는 감성형", keywords: "#진심 #깊이 #공감 #이상형", best: "ENFP, ENTP", hard: "ESTP, ESTJ", score: 94, style: "가벼운 연애보다 마음이 깊게 통하는 관계를 선호합니다.", strength: "상대의 마음을 잘 이해하고 진정성 있게 사랑합니다.", weakness: "기대가 높아 실망도 크게 느낄 수 있습니다." },
  INTJ: { title: "사랑도 진지하게 설계하는 전략가형", keywords: "#계획 #진중함 #성장 #독립", best: "ENFP, ENTP", hard: "ESFJ, ISFP", score: 84, style: "감정보다 관계의 방향성과 미래를 중요하게 생각합니다.", strength: "연애를 가볍게 여기지 않고 책임감 있게 대합니다.", weakness: "표현이 직설적이라 상대가 서운할 수 있습니다." },
  ISTP: { title: "쿨하지만 은근히 챙기는 현실형", keywords: "#자유 #현실감 #담백함 #독립", best: "ESFJ, ESTJ", hard: "ENFJ, INFJ", score: 82, style: "간섭받는 것을 싫어하지만 좋아하는 사람에게는 행동으로 마음을 보여줍니다.", strength: "담백하고 부담 없는 연애를 잘합니다.", weakness: "감정 표현이 적어 무심해 보일 수 있습니다." },
  ISFP: { title: "말보다 분위기로 사랑하는 감성형", keywords: "#감성 #배려 #자유 #설렘", best: "ENFJ, ESFJ", hard: "ENTJ, INTJ", score: 90, style: "부드럽고 편안한 분위기 속에서 자연스럽게 사랑을 키워갑니다.", strength: "상대를 배려하고 따뜻한 분위기를 만듭니다.", weakness: "갈등을 피하려다 속마음을 숨길 수 있습니다." },
  INFP: { title: "영화 같은 사랑을 꿈꾸는 로맨티스트", keywords: "#상상력 #진심 #감성 #이상", best: "ENFJ, ENTJ", hard: "ESTJ, ISTJ", score: 95, style: "마음이 통하는 특별한 사랑을 원하며 진심 어린 관계를 중요하게 생각합니다.", strength: "순수하고 깊은 애정을 보여줍니다.", weakness: "현실적인 문제에 쉽게 상처받을 수 있습니다." },
  INTP: { title: "생각은 많지만 사랑은 진심인 탐구형", keywords: "#호기심 #독립 #분석 #솔직함", best: "ENTJ, ENFJ", hard: "ESFJ, ISFJ", score: 81, style: "감정 표현은 서툴 수 있지만, 좋아하는 사람에 대해 깊이 알고 싶어합니다.", strength: "상대의 생각을 존중하고 자유로운 관계를 만듭니다.", weakness: "감정보다 논리를 앞세워 차갑게 느껴질 수 있습니다." },
  ESTP: { title: "설렘을 바로 행동으로 보여주는 직진형", keywords: "#자신감 #활동적 #즉흥 #매력", best: "ISFJ, ISTJ", hard: "INFJ, INFP", score: 88, style: "좋아하면 바로 표현하고 함께 즐거운 경험을 만드는 스타일입니다.", strength: "에너지가 넘치고 연애에 활기를 줍니다.", weakness: "즉흥적이라 상대가 불안해할 수 있습니다." },
  ESFP: { title: "함께 있으면 즐거운 러블리형", keywords: "#표현 #즐거움 #인기 #감각", best: "ISFJ, ISTJ", hard: "INTJ, INTP", score: 91, style: "연애를 즐겁고 밝게 만드는 데 능숙하며 표현도 적극적입니다.", strength: "애정 표현이 풍부하고 분위기를 잘 살립니다.", weakness: "감정 기복이 커 보일 수 있습니다." },
  ENFP: { title: "설렘을 몰고 다니는 자유로운 사랑꾼", keywords: "#열정 #상상력 #표현 #자유", best: "INFJ, INTJ", hard: "ISTJ, ISFJ", score: 96, style: "새로운 감정과 설렘을 좋아하고 사랑을 적극적으로 표현합니다.", strength: "밝고 따뜻해서 상대에게 큰 에너지를 줍니다.", weakness: "쉽게 들뜨고 금방 식어 보일 수 있습니다." },
  ENTP: { title: "밀당도 대화도 즐기는 매력형", keywords: "#재치 #대화 #자극 #자유", best: "INFJ, INTJ", hard: "ISFJ, ESFJ", score: 87, style: "재미있는 대화와 새로운 자극이 있는 연애를 좋아합니다.", strength: "센스 있고 유쾌해서 지루하지 않은 관계를 만듭니다.", weakness: "장난이 지나쳐 상대가 진심을 의심할 수 있습니다." },
  ESTJ: { title: "확실하고 든든한 리더형 연애", keywords: "#책임 #계획 #현실 #안정", best: "ISFP, ISTP", hard: "INFP, INFJ", score: 85, style: "관계를 분명하게 정리하고 책임감 있게 이끌어가는 스타일입니다.", strength: "믿음직하고 현실적인 안정감을 줍니다.", weakness: "자기 기준이 강해 상대를 답답하게 할 수 있습니다." },
  ESFJ: { title: "사랑을 아낌없이 표현하는 다정형", keywords: "#친절 #표현 #배려 #관계", best: "ISFP, ISTP", hard: "INTP, ENTP", score: 93, style: "상대를 챙기고 주변 사람들과도 잘 어울리는 따뜻한 연애를 합니다.", strength: "표현이 많고 상대를 외롭지 않게 합니다.", weakness: "상대의 반응에 예민해질 수 있습니다." },
  ENFJ: { title: "상대의 성장을 응원하는 따뜻한 리더형", keywords: "#공감 #응원 #진심 #배려", best: "INFP, ISFP", hard: "ISTP, ESTP", score: 97, style: "사랑하는 사람을 위해 아낌없이 응원하고 관계를 잘 이끌어갑니다.", strength: "상대에게 자신감을 주고 관계를 따뜻하게 만듭니다.", weakness: "상대를 너무 챙기다 본인을 놓칠 수 있습니다." },
  ENTJ: { title: "사랑도 목표처럼 진심인 카리스마형", keywords: "#리더십 #성장 #확신 #추진력", best: "INFP, INTP", hard: "ISFP, ISFJ", score: 89, style: "연애에서도 방향성과 성장을 중요하게 생각하며 적극적으로 관계를 이끕니다.", strength: "확신 있는 태도로 상대에게 믿음을 줍니다.", weakness: "주도권이 강해 상대가 부담을 느낄 수 있습니다." }
};

const questionList = document.getElementById("questionList");
const form = document.getElementById("testForm");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <h3>${index + 1}. ${q.text}</h3>
    <label class="option"><input type="radio" name="q${index}" value="${q.typeA}" required /> ${q.a}</label>
    <label class="option"><input type="radio" name="q${index}" value="${q.typeB}" required /> ${q.b}</label>
  `;
  questionList.appendChild(div);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const formData = new FormData(form);

  for (const value of formData.values()) {
    score[value]++;
  }

  const mbti =
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.N ? "S" : "N") +
    (score.T >= score.F ? "T" : "F") +
    (score.J >= score.P ? "J" : "P");

  const data = results[mbti];

  document.getElementById("resultTitle").textContent = data.title;
  document.getElementById("mbtiType").textContent = `당신의 연애 MBTI는 ${mbti}`;
  document.getElementById("loveScore").textContent = `${data.score}점`;
  document.getElementById("scoreFill").style.width = `${data.score}%`;
  document.getElementById("keywords").textContent = data.keywords;
  document.getElementById("bestMatch").textContent = data.best;
  document.getElementById("hardMatch").textContent = data.hard;
  document.getElementById("styleText").textContent = data.style;
  document.getElementById("strength").textContent = data.strength;
  document.getElementById("weakness").textContent = data.weakness;

  form.classList.add("hidden");
  result.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

resetBtn.addEventListener("click", function () {
  form.reset();
  result.classList.add("hidden");
  form.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
