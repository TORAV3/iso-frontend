function loadQuestionData(status = "1") {
  axios
    .get(`http://localhost:3000/iso/api/interview/question?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const questionForms = res.data.data.map((q, index) =>
        createQuestionForm(q, index)
      );

      var multiview = {
        id: "multiStepForm",
        view: "multiview",
        cells: questionForms,
      };

      var bodyIntWin = {
        rows: [
          {
            view: "template",
            template: `<div class='d-flex flex-column align-items-start justify-content-center px-3 gap-3 mt-3'>
                        <img style='width:200px' src='/iso/images/logo-iso.png'/>
                        <hr style="width:100%"/>
                        <div>
                          <span style='font-size:17px; font-weight:600;color: black; letter-spacing: 1px;'>Daftar Pertanyaan Wawancara</span>
                          <span style='font-size:11px;'>Setelah lolos seleksi berkas, Anda akan melalui tahapan wawancara. Baca pertanyaan dengan detail dan jawab dengan mengupload video anda!</span>
                        </div>
                    </div>`,
            autoheight: true,
            css: "title",
          },
          multiview,
        ],
      };

      var intWin = webix.ui({
        view: "window",
        id: "intWin",
        position: "center",
        scroll: true,
        resize: true,
        head: {
          cols: [
            { template: "Notifikasi", type: "header", borderless: true },
            {
              view: "icon",
              icon: "wxi-close",
              click: function () {
                intWin.close();
              },
            },
          ],
        },

        height: 430,
        body: bodyIntWin,
      });

      intWin.show();

      $$("multiStepForm").setValue(questionForms[0].id);
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

// function createQuestionForm(question, index) {
//   return {
//     id: `questionForm${index}`,
//     view: "form",
//     css: "removeBorderForm",
//     margin: 10,
//     elements: [
//       {
//         view: "template",
//         template: `
//           <span style='font-size:17px; font-weight:600;color: #316AFF; letter-spacing: 1px;'>Pertanyaan #${
//             index + 1
//           }</span>
//           <span style='font-size:11px;'>${question.question}</span>
//         `,
//         autoheight: true,
//         css: "title",
//       },
//       {
//         view: "text",
//         hidden: true,
//         name: `questionVideo${index}`,
//         id: `questionVideo${index}`,
//         readonly: true,
//       },
//       {
//         view: "text",
//         name: `answer${index}`,
//         placeholder: "Jawaban Anda...",
//       },
//       {
//         view: "button",
//         value: index === "Selanjutnya",
//         // value: index === questions.length - 1 ? "Selesai" : "Selanjutnya",
//         // css: "btnnext",
//         // click: function () {
//         //   if (index < questions.length - 1) {
//         //     $$("multiStepForm").setValue(`questionForm${index + 1}`);
//         //   } else {
//         //     webix.message("Selesai!");
//         //     $$("interviewWin").close(); // Close window on finish
//         //   }
//         // },
//       },
//     ],
//   };
// }

function createQuestionForm(question, index) {
  return {
    id: `questionForm${index}`,
    view: "form",
    css: "removeBorderForm",
    margin: 10,
    elements: [
      {
        view: "text",
        hidden: true,
        name: `question${index + 1}Video`,
        id: `question${index + 1}Video`,
        readonly: true,
      },
      {
        view: "template",
        template: `
                      <div style="display:flex; flex-direction:column; gap:5px">
                        <span style='font-size:17px; font-weight:600;color: #316AFF; letter-spacing: 1px;'>Pertanyaan #${
                          index + 1
                        }</span>
                        <span style='font-size:11px;'>${
                          question.question
                        }</span>
                      </div>
                    `,
        autoheight: true,
        css: "title",
      },
      {
        view: "template",
        css: "title",
        template: `
                <div class="input-container">
                      <input type="text" name="videoFilename${
                        index + 1
                      }" class="form-control" readonly id="videoText${
          index + 1
        }">
                      <label for="videoUpload${
                        index + 1
                      }" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                      <input type="file" id="videoUpload${
                        index + 1
                      }" accept="video/*">
                      <hr style="width:100%; margin-top:20px"/>
                </div>
              `,
        autoheight: true,
        on: {
          onAfterRender: function () {
            const videoInput = document.getElementById(
              `videoUpload${index + 1}`
            );
            const videoText = document.getElementById(`videoText${index + 1}`);
            const videoTextWebix = $$(`question${index + 1}Video`);

            videoInput.addEventListener("change", (e) => {
              if (e.target.files.length) {
                const file = e.target.files[0];
                videoTextWebix.config.file = file;
                videoTextWebix.setValue(file.name);
                videoText.value = file.name;
              }
            });
          },
        },
      },
      { view: "button", value: "Selanjutnya", css: "btnnext" },
    ],
  };
}

function loadClassData(type, status = "all", topicParam = "all") {
  axios
    .get(
      `http://localhost:3000/iso/api/class?type=${type}&status=${status}&topicParam=${topicParam}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.l;
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            thumbnailBase64: item.thumbnailBase64,
          };
        });

        $$("dataview1").parse(transformedData);
      } else {
        console.log("kosong");
      }
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

// var dataview = {
//   view: "dataview",
//   id: "dataview1",
//   height: 350,
//   xCount: 2,
//   select: true,
//   type: {
//     height: 60,
//     width: "auto",
//   },
//   template: "<div class='webix_strong'>#title#</div> Year: #subtitle#",
// };

var dataview = {
  view: "dataview",
  id: "dataview1",
  minHeight: 350,
  xCount: 2,
  select: true,
  type: {
    height: 350,
    width: "auto",
  },
  css: "dataviewstyle",
  template: `
    <div class='class_content'>
      <div class='class_content_left'>
        <div class='class_content_left_text'>
          <h6>#title#</h6>
          <span>#subtitle#</span>
        </div>
        <button class='btn btn-primary' onclick='goToPage(#id#)'>Ikuti</button>
      </div>
      <div class='class_content_right'>
        <img class='thumbimg' src='#thumbnailBase64#'/>
      </div>
    </div>`,
};

function goToPage(id) {
  window.location.href = `kelas/detail/${id}`;
}

function adjustDataviewLayout() {
  const width = window.innerWidth;
  const dataview = $$("dataview1");

  if (width < 1024) {
    dataview.define("xCount", 1);
  } else {
    dataview.define("xCount", 2);
  }

  dataview.resize();
}

var title = {
  view: "template",
  template: `
    <div class='title'>
      <h6>Kelas Online ISO Jepang</h6>
      <div class='text'>
        <span>Di Kelas Online, Para Peserta Didik Mendapatkan Berbagai Materi Pendidikan yang Menjadi Dasar untuk Mengikuti Program SSW (Specified Skill Worker) diantaranya Kurikulum Pendidikan Kemampuan Bahasa Jepang JF-Test A2 dan Kurikulum Pendidikan Skill SSW di Berbagai Bidang.</span>
      </div>
    </div>`,
  autoheight: true,
  css: "title",
};

var myWin = webix.ui({
  view: "window",
  id: "myWin",
  position: "center",
  head: {
    cols: [
      { template: "Notifikasi", type: "header", borderless: true },
      {
        view: "icon",
        icon: "wxi-close",
        click: function () {
          myWin.close();
        },
      },
    ],
  },

  height: 430,
  body: `
  <div class='d-flex flex-column align-items-center justify-content-center gap-3 mt-3'>
      <img style='width:50px' src='/iso/images/checkModal.png'/>
      <span class='text-center' style='font-size:15px; font-weight:500;'>Pendaftaran Anda di Aplikasi ISO JEPANG telah diterima!</span>
      <span class='text-center' style='font-size:11px;'>Setelah pendaftaran, Anda akan melalui beberapa tahap seleksi, yaitu: pemeriksaan dokumen, ujian masuk, wawancara, dan MCU. Informasi lebih lanjut mengenai jadwal dan detail setiap tahap akan segera kami informasikan melalui email. Mohon persiapkan diri Anda dengan baik!</span>
      <div class="d-grid gap-2 w-100">
        <a class="btn btn-primary" type="button" href="/member/register">Selanjutnya</a>
        <button class="btn btn-primary-outline" type="button" id="closeBtn">Nanti saja</button>
      </div>
  </div>`,
});

// const question1Form = {
//   view: "form",
//   id: "question1Form",
//   css: "removeBorderForm",
//   margin: 10,
//   elements: [
//     {
//       view: "text",
//       hidden: true,
//       name: "question1Video",
//       id: "question1Video",
//       readonly: true,
//     },
//     {
//       view: "template",
//       template: `
//                   <span style='font-size:17px; font-weight:600;color: #316AFF; letter-spacing: 1px;'>Pertanyaan #1</span>
//                   <span style='font-size:11px;'>Arcu nam mollis vel blandit viverra cras. Leo nibh feugiat ultrices elementum ut blandit tincidunt eu. Diam tellus diam in nec eu faucibus. Cursus.</span>
//                 `,
//       autoheight: true,
//       css: "title",
//     },
//     {
//       view: "template",
//       css: "title",
//       template: `
//             <div class="input-container">
//                   <input type="text" name="pasFotoFilename" class="form-control" readonly id="pasFotoText">
//                   <label for="pasFotoUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
//                   <input type="file" id="pasFotoUpload" accept="image/*">
//                   <hr style="width:100%; margin-top:20px"/>
//             </div>
//           `,
//       autoheight: true,
//     },
//     { view: "button", value: "Selanjutnya", css: "btnnext" },
//   ],
//   rules: {
//     fullname: webix.rules.isNotEmpty,
//     email: webix.rules.isEmail,
//     phone: webix.rules.isNotEmpty,
//     nik: webix.rules.isNotEmpty,
//     trainbef: webix.rules.isNotEmpty,
//     gender: webix.rules.isNotEmpty,
//     height: webix.rules.isNotEmpty,
//     weight: webix.rules.isNotEmpty,
//     birthplace: webix.rules.isNotEmpty,
//     birthdate: webix.rules.isNotEmpty,
//     lastedu: webix.rules.isNotEmpty,
//     program: webix.rules.isNotEmpty,
//     city: webix.rules.isNotEmpty,
//     address: webix.rules.isNotEmpty,
//   },
// };

// var multiview = {
//   id: "multiStepForm",
//   view: "multiview",
//   cells: [question1Form],
// };

// var bodyIntWin = {
//   rows: [
//     {
//       view: "template",
//       template: `<div class='d-flex flex-column align-items-start justify-content-center px-3 gap-3 mt-3'>
//                   <img style='width:200px' src='/iso/images/logo-iso.png'/>
//                   <hr style="width:100%"/>
//                   <div>
//                     <span style='font-size:17px; font-weight:600;color: black; letter-spacing: 1px;'>Daftar Pertanyaan Wawancara</span>
//                     <span style='font-size:11px;'>Setelah lolos seleksi berkas, Anda akan melalui tahapan wawancara. Baca pertanyaan dengan detail dan jawab dengan mengupload video anda!</span>
//                   </div>
//               </div>`,
//       autoheight: true,
//       css: "title",
//     },
//     multiview,
//   ],
// };

// var intWin = webix.ui({
//   view: "window",
//   id: "intWin",
//   position: "center",
//   scroll: true,
//   resize: true,
//   head: {
//     cols: [
//       { template: "Notifikasi", type: "header", borderless: true },
//       {
//         view: "icon",
//         icon: "wxi-close",
//         click: function () {
//           myWin.close();
//         },
//       },
//     ],
//   },

//   height: 430,
//   body: bodyIntWin,
// });

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, dataview],
  });

  adjustDataviewLayout();

  webix.event(window, "resize", function () {
    adjustDataviewLayout();
    grid.adjust();
  });

  if (userStatus === "approve") {
    loadQuestionData();
  } else if (userStatus === "register") {
    myWin.show();

    document.getElementById("closeBtn").addEventListener("click", function () {
      $$("myWin").close();
    });
  }

  loadClassData("trial");
});
