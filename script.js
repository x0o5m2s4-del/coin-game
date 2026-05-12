const firebaseConfig = {

  apiKey: "AIzaSyD2ZvVaN_ZWrTKvQdWGpdLyt0jb1FHnVp4",

  authDomain: "cardgame-ed26e.firebaseapp.com",

  projectId: "cardgame-ed26e",

  storageBucket: "cardgame-ed26e.firebasestorage.app",

  messagingSenderId: "830034089374",

  appId: "1:830034089374:web:7c00cf947426a813f8b28f"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let selectedChoice = "";

function startGame() {

  const studentId =
    document.getElementById("studentId").value.trim();

  const name =
    document.getElementById("name").value.trim();

  const choice =
    document.getElementById("choice").value;

  if (!studentId || !name || !choice) {

    alert("이름, 학번, 선택을 모두 입력해줘!");

    return;

  }

  selectedChoice = choice;

  document.getElementById("start-screen")
    .style.display = "none";

  document.getElementById("game-screen")
    .style.display = "block";

}

async function flipCoin() {

  const result =
    Math.random() < 0.5
      ? "앞면"
      : "뒷면";

  const coin =
    document.getElementById("coin");



  // 던져진 결과 그림
  coin.textContent =
    result === "앞면"
      ? "🙂"
      : "🦁";



  let score = 0;

  if (result === selectedChoice) {

    score = 1;

    document.getElementById("result-text")
      .textContent =
        "예상 성공! 1점 🎉";

  } else {

    document.getElementById("result-text")
      .textContent =
        "예상 실패! 0점 😢";

  }



  const studentId =
    document.getElementById("studentId").value;

  const name =
    document.getElementById("name").value;



  await db.collection("coinGame").add({

    studentId: studentId,

    name: name,

    choice: selectedChoice,

    result: result,

    score: score,

    time: new Date()

  });

}
