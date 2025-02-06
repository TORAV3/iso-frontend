function loadClassData(status = "1", type = "all", topicParam = "all") {
  axios
    .get(
      `http://localhost:3000/iso/api/class?status=${status}&type=${type}&topicParam=${topicParam}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      const transformedData = res.data.data.map(function (item) {
        return {
          id: item.id,
          value: item.title.toUpperCase(),
        };
      });
      const classOption = $$("class");
      classOption.define("options", transformedData);
      classOption.refresh();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function loadTestData(testId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/test/detail/" + testId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("id").setValue(datanya.data.id);
      $$("title").setValue(datanya.data.title);
      $$("desc").setValue(datanya.data.desc);
      $$("class").setValue(datanya.data.classId);

      loadSoalData(testId);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadSoalData(testId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/soal/testId/" + testId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());
      generateForm(datanya.data);
      // console.log(datanya);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function generateForm(data) {
  let soalForm = $$("soalSection");
  data.forEach((soal, index) => {
    let soalIndex = index + 1;
    let jawabans = soal.jawabans.map((jawaban) => ({
      view: "text",
      name: "jawaban" + jawaban.opsi + soalIndex,
      label: "Jawaban " + jawaban.opsi,
      labelPosition: "top",
      required: true,
      minWidth: 200,
      value: jawaban.value,
    }));
    let jawabanBenars = soal.jawabanBenars.map((jawabanBenar) => ({
      view: "text",
      name: "jawaban" + soalIndex,
      label: "Jawaban " + soalIndex,
      labelPosition: "top",
      required: true,
      minWidth: 200,
      value: jawabanBenar.value,
    }));
    soalForm.addView({
      margin: 10,
      rows: [
        { type: "section", template: "Soal " + soalIndex },
        {
          view: "text",
          name: "soal" + soalIndex,
          label: "Soal " + soalIndex,
          labelPosition: "top",
          required: true,
          minWidth: 300,
          value: soal.value,
        },
        { type: "section", template: "Jawaban " + soalIndex },
        {
          id: "formres" + soalIndex,
          margin: 10,
          rows: [
            {
              responsive: "formres" + soalIndex,
              cols: jawabans,
            },
            {
              view: "text",
              name: "jawaban" + soalIndex,
              label: "Jawaban " + soalIndex,
              labelPosition: "top",
              required: true,
              minWidth: 200,
              value: jawabanBenars[0].value,
            },
          ],
        },
      ],
    });
  });
}

var formHeaderSoal = {
  view: "form",
  id: "headerForm",
  margin: 10,
  elements: [
    {
      view: "text",
      hidden: true,
      name: "id",
      id: "id",
    },
    {
      view: "text",
      name: "title",
      id: "title",
      label: "Judul Tes",
      labelPosition: "top",
      required: true,
      minWidth: 300,
    },
    {
      view: "combo",
      label: "Kelas",
      value: "",
      labelPosition: "top",
      options: [],
      minWidth: 300,
      name: "classId",
      id: "class",
    },
    {
      view: "textarea",
      id: "desc",
      name: "desc",
      height: 120,
      label: "Deskripsi Tes",
      labelPosition: "top",
      required: true,
      minWidth: 300,
    },
    {
      margin: 10,
      cols: [
        {},
        {},
        {
          view: "button",
          value: "Simpan",
          css: "btnSimpan",
          autowidth: true,
          click: submit_header_form,
        },
      ],
    },
  ],
  rules: { classId: webix.rules.isNotEmpty },
};

function submit_header_form() {
  const form = $$("headerForm");
  if (form.validate()) {
    var formData = form.getValues();

    if (formData.id === "") {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .post("http://localhost:3000/iso/api/test", formData)
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          $$("id").setValue(datanya.data.id);
          webix.message({
            type: "success",
            text: "Kelas sudah didaftarkan untuk soal",
          });
          $$("soalForm").enable();
          loadSoalData(datanya.data.id);
          // loadSectionData(datanya.data.id);
          // $$("sectionContainer").enable();
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    } else {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .put("http://localhost:3000/iso/api/test/edit/" + formData.id, formData)
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          webix.message({
            type: "success",
            text: "Kelas untuk soal berhasil diperbaharui",
          });
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

var formDetailSoal = {
  view: "form",
  id: "soalForm",
  margin: 10,
  elements: [
    {
      margin: 10,
      cols: [
        {
          view: "button",
          value: "Tambah Soal",
          css: "btnSimpan",
          autowidth: true,
          click: function () {
            let soalForm = $$("soalSection");
            let index = soalForm.getChildViews().length;
            index++;
            let newRules = soalForm.config.rules;

            soalForm.addView({
              margin: 10,
              rows: [
                { type: "section", template: "Soal " + index },
                {
                  view: "text",
                  name: "soal" + index,
                  label: "Soal " + index,
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                { type: "section", template: "Jawaban " + index },
                {
                  id: "formres" + index,
                  margin: 10,
                  rows: [
                    {
                      responsive: "formres" + index,
                      cols: [
                        {
                          view: "text",
                          name: "jawabanA" + index,
                          label: "Jawaban A",
                          labelPosition: "top",
                          required: true,
                          minWidth: 200,
                        },
                        {
                          view: "text",
                          name: "jawabanB" + index,
                          label: "Jawaban B",
                          labelPosition: "top",
                          required: true,
                          minWidth: 200,
                        },
                        {
                          view: "text",
                          name: "jawabanC" + index,
                          label: "Jawaban C",
                          labelPosition: "top",
                          required: true,
                          minWidth: 200,
                        },
                        {
                          view: "text",
                          name: "jawabanD" + index,
                          label: "Jawaban D",
                          labelPosition: "top",
                          required: true,
                          minWidth: 200,
                        },
                        {
                          view: "text",
                          name: "jawabanE" + index,
                          label: "Jawaban E",
                          labelPosition: "top",
                          required: true,
                          minWidth: 200,
                        },
                      ],
                    },
                    {
                      view: "text",
                      name: "jawaban" + index,
                      label: "Jawaban " + index,
                      labelPosition: "top",
                      required: true,
                      minWidth: 200,
                    },
                  ],
                },
              ],
            });

            // Dynamically add validation rules
            newRules["soal" + index] = webix.rules.isNotEmpty;
            newRules["jawabanA" + index] = webix.rules.isNotEmpty;
            newRules["jawabanB" + index] = webix.rules.isNotEmpty;
            newRules["jawabanC" + index] = webix.rules.isNotEmpty;
            newRules["jawabanD" + index] = webix.rules.isNotEmpty;
            newRules["jawabanE" + index] = webix.rules.isNotEmpty;
            newRules["jawaban" + index] = webix.rules.isNotEmpty;

            // Update form rules
            soalForm.define("rules", newRules);
            soalForm.refresh(); // Ensure form updates
          },
        },
        {},
        {},
      ],
    },
    {
      id: "soalSection",
      rows: [],
    },
    {
      margin: 10,
      cols: [
        {},
        {},
        {
          view: "button",
          value: "Simpan",
          css: "btnSimpan",
          autowidth: true,
          click: submit_form,
        },
      ],
    },
  ],
  rules: {},
};

// var btnTambah = {
//   margin: 10,
//   cols: [
//     {
//       view: "button",
//       value: "Tambah Soal",
//       css: "btnSimpan",
//       autowidth: true,
//       click: function () {
//         let soalForm = $$("soalForm");
//         let index = soalForm.getChildViews().length;
//         index++;
//         let newRules = soalForm.config.rules;

//         soalForm.addView({
//           margin: 10,
//           rows: [
//             { type: "section", template: "Soal " + index },
//             {
//               view: "text",
//               name: "soal" + index,
//               label: "Soal " + index,
//               labelPosition: "top",
//               required: true,
//               minWidth: 300,
//             },
//             { type: "section", template: "Jawaban " + index },
//             {
//               id: "formres" + index,
//               margin: 10,
//               rows: [
//                 {
//                   responsive: "formres" + index,
//                   cols: [
//                     {
//                       view: "text",
//                       name: "jawabanA" + index,
//                       label: "Jawaban A",
//                       labelPosition: "top",
//                       required: true,
//                       minWidth: 200,
//                     },
//                     {
//                       view: "text",
//                       name: "jawabanB" + index,
//                       label: "Jawaban B",
//                       labelPosition: "top",
//                       required: true,
//                       minWidth: 200,
//                     },
//                     {
//                       view: "text",
//                       name: "jawabanC" + index,
//                       label: "Jawaban C",
//                       labelPosition: "top",
//                       required: true,
//                       minWidth: 200,
//                     },
//                     {
//                       view: "text",
//                       name: "jawabanD" + index,
//                       label: "Jawaban D",
//                       labelPosition: "top",
//                       required: true,
//                       minWidth: 200,
//                     },
//                     {
//                       view: "text",
//                       name: "jawabanE" + index,
//                       label: "Jawaban E",
//                       labelPosition: "top",
//                       required: true,
//                       minWidth: 200,
//                     },
//                   ],
//                 },
//                 {
//                   view: "text",
//                   name: "jawaban" + index,
//                   label: "Jawaban " + index,
//                   labelPosition: "top",
//                   required: true,
//                   minWidth: 200,
//                 },
//               ],
//             },
//           ],
//         });

//         // Dynamically add validation rules
//         newRules["soal" + index] = webix.rules.isNotEmpty;
//         newRules["jawabanA" + index] = webix.rules.isNotEmpty;
//         newRules["jawabanB" + index] = webix.rules.isNotEmpty;
//         newRules["jawabanC" + index] = webix.rules.isNotEmpty;
//         newRules["jawabanD" + index] = webix.rules.isNotEmpty;
//         newRules["jawabanE" + index] = webix.rules.isNotEmpty;
//         newRules["jawaban" + index] = webix.rules.isNotEmpty;

//         // Update form rules
//         soalForm.define("rules", newRules);
//         soalForm.refresh(); // Ensure form updates
//       },
//     },
//     {},
//     {},
//   ],
// };

// var btnSave = {
//   margin: 10,
//   cols: [
//     {},
//     {
//       view: "button",
//       value: "Kembali",
//       css: "btnKembali",
//       autowidth: true,
//       click: function () {
//         window.location.href = "/user-access";
//       },
//     },
//     {
//       view: "button",
//       value: "Simpan",
//       css: "btnSimpan",
//       autowidth: true,
//       click: submit_form,
//     },
//   ],
// };

function submit_form() {
  const form = $$("soalForm");
  var formData = form.getValues();
  const headerForm = $$("headerForm");
  const testId = headerForm.getValues().id;
  let jsonData = [];

  let index = 1;
  while (formData["soal" + index]) {
    let soalObj = {
      testId,
      soal: formData["soal" + index],
      opsi: [
        { opsi: "A", value: formData["jawabanA" + index] },
        { opsi: "B", value: formData["jawabanB" + index] },
        { opsi: "C", value: formData["jawabanC" + index] },
        { opsi: "D", value: formData["jawabanD" + index] },
        { opsi: "E", value: formData["jawabanE" + index] },
      ],
      jawaban: formData["jawaban" + index].toUpperCase(),
    };

    jsonData.push(soalObj);
    index++;
  }

  console.log(jsonData);

  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    })
    .post("http://localhost:3000/iso/api/soal", JSON.stringify(jsonData))
    .then(function (data) {
      var datanya = JSON.parse(data.text());
      console.log(datanya);
      // $$("soalSection").clear();
      // $$("soalSection").define("rows", []);
      // $$("soalSection").refresh();
      // loadSoalData(testId);
      // webix.message({
      //   type: "success",
      //   text: datanya.data,
      // });
      // $$("id").setValue(datanya.data.id);
      // webix.message({
      //   type: "success",
      //   text: "Kelas berhasil ditambahkan",
      // });
      // loadTopicData(datanya.data.id);
      // $$("topicContainer").enable();
      // loadSectionData(datanya.data.id);
      // $$("sectionContainer").enable();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
      webix.message({ type: "error", text: err.responseText });
    });
  // if (formData.id === "") {
  // }
  // else {
  //   if (formData.thumbnail === "") {
  //     delete formData.thumbnail;
  //   }

  //   webix
  //     .ajax()
  //     .headers({ Authorization: "Bearer " + token })
  //     .put("http://localhost:3000/iso/api/class/" + formData.id, formData)
  //     .then(function (data) {
  //       var datanya = JSON.parse(data.text());
  //       webix.message({
  //         type: "success",
  //         text: "Kelas berhasil diperbaharui",
  //       });
  //     })
  //     .catch(function (err) {
  //       console.error("Error loading data:", err);
  //       webix.message({ type: "error", text: err.responseText });
  //     });
  // }
  // console.log(jsonData);
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [
      // btnTambah,
      // { height: 15 },
      { margin: 15, rows: [formHeaderSoal, formDetailSoal] },
      // { height: 15 },
      // btnSave,
    ],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadClassData();

  if (window.pageId) {
    loadTestData(window.pageId);
    $$("soalForm").enable();
  } else {
    $$("soalForm").disable();
  }

  // loadUserDetailData();
});
