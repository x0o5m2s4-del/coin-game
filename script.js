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

  const name =
    document.getElementById("name").value.trim();

  const studentId =
    document.getElementById("studentId").value.trim();

  const choice =
    document.getElementById("choice").value;



  if (!name || !studentId || !choice) {

    alert("이름, 학번, 선택을 모두 입력해줘!");

    return;

  }



  selectedChoice = choice;



  // 시작화면 숨기기
  document.getElementById("start-screen")
    .style.display = "none";



  // 게임화면 보이기
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



  // 동전 결과 표시
  if (result === "앞면") {

    coin.textContent = "🙂";

  } else {

    coin.textContent = "🦁";

  }



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



  const name =
    document.getElementById("name").value;

  const studentId =
    document.getElementById("studentId").value;



  // Firebase 저장
  await db.collection("coinGame").add({

    name: name,

    studentId: studentId,

    choice: selectedChoice,

    result: result,

    score: score,

    time: new Date()

  });

}
