document.getElementById("fileUpload").onchange = (evt) => {
  let reader = new FileReader();

  reader.addEventListener("loadend", (evt) => {
    let workbook = XLSX.read(evt.target.result, { type: "binary" }),
      worksheet = workbook.Sheets[workbook.SheetNames[0]],
      range = XLSX.utils.decode_range(worksheet["!ref"]);

    let data = [];
    for (let row = range.s.r; row <= range.e.r; row++) {
      let i = data.length;
      data.push([]);
      for (let col = range.s.c; col <= range.e.c; col++) {
        let cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
        data[i].push(cell.v);
      }
    }

    let question, a, b, c, d, correct;

    let questions = data.shift();

    [question, a, b, c, d, correct] = questions;

    let quizData = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      let obj = {
        question: element[0],
        a: element[1],
        b: element[2],
        c: element[3],
        d: element[4],
        correct: element[5],
      };

      quizData.push(obj);
    }

    localStorage.removeItem("quizData");
    localStorage.setItem("quizData", JSON.stringify(quizData));
  });

  reader.readAsArrayBuffer(evt.target.files[0]);

  location.href = "quiz.html";
};
