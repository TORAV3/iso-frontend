function loadData() {
  webix.ajax().get(
    `http://localhost:3000/iso/api/class/detail/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        var datanya = JSON.parse(text);

        var topicsHtml = `
        <div class="d-flex flex-wrap align-items-center gap-3" style='margin-top: 28px; margin-bottom: 6px'>
            ${datanya.data.topics
              .map(
                (topic) => `
                <span class="badge fw-normal text-sm rounded-pill bg-primary-600 px-20 py-9 radius-4 text-white">${topic.value}</span>
              `
              )
              .join("")}
        </div>`;

        var sectionsHtml = `
        <div class="accordion" id="accordionExample">
          ${datanya.data.sections
            .map(
              (section) => `
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button text-primary-light text-sm fw-normal collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
                        section.id
                      }" aria-expanded="false" aria-controls="collapse${
                section.id
              }">
                        ${section.value}
                      </button>
                    </h2>
                    <div id="collapse${
                      section.id
                    }" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <ul class="list-group radius-8 mt-3">
                            ${section.subsections
                              .map(
                                (subsection, index) => `
                                <li class="list-group-item border text-secondary-light p-16 bg-neutral-50 border-bottom-0">
                                    ${index + 1}. ${subsection.value}
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                      </div>
                    </div>
                  </div>
              `
            )
            .join("")}
        </div>`;

        const transformedData = {
          ...datanya.data,
          topics: topicsHtml,
          sections: sectionsHtml,
        };

        $$("dataview1").parse(transformedData);
      },
      error: function (text, data, xhr) {
        console.log(text);
      },
    }
  );
}

// webix.ready(function () {
//   loadData();

//   webix.ui({
//     id: "left-container",
//     container: "left-container",
//     rows: [
//       {
//         view: "template",
//         css: "classTitle",
//         template:
//           "At hear lot let only protocol die old baked. Resources principles yet.",
//         autoheight: true,
//       },
//       {
//         height: 20,
//       },
//       {
//         cols: [
//           {
//             view: "template",
//             minHeight: 80,
//             minWidth: 80,
//             maxHeight: 80,
//             maxWidth: 80,
//             css: "profimgcontainer",
//             template: `
//               <div class='profimg'>
//                   <img class='imgprof' src='/iso/images/logo-icon-iso.png'/>
//               </div>`,
//           },
//           {
//             rows: [
//               {},
//               {
//                 view: "template",
//                 width: 120,
//                 css: "authorcont",
//                 template: "ISO Jepang",
//                 autoheight: true,
//               },
//               {},
//             ],
//           },
//           {
//             rows: [
//               {},
//               {
//                 view: "template",
//                 css: "starcont",
//                 template: "Tanda Bintang",
//                 autoheight: true,
//               },
//               {},
//             ],
//           },
//         ],
//       },
//     ],
//   });

//   webix.ui({
//     container: "right-container",
//     rows: [
//       {
//         view: "template",
//         template:
//           "At hear lot let only protocol die old baked. Resources principles yet.",
//         autoheight: true,
//       },
//       {
//         height: 20,
//       },
//       {
//         view: "template",
//         template:
//           "At hear lot let only protocol die old baked. Resources principles yet.",
//         autoheight: true,
//       },
//     ],
//   });
// });

// var layout = {
//   id: "res",
//   rows: [
//     {
//       responsive: "res",
//       cols: [
//         {
//           rows: [
//             {
//               view: "template",
//               css: "classTitle",
//               template:
//                 "At hear lot let only protocol die old baked. Resources principles yet.",
//               autoheight: true,
//               minWidth: 500,
//             },
//             // {
//             //   height: 20,
//             // },
//             // {
//             //   rows: [
//             //     {
//             //       cols: [
//             //         {
//             //           view: "template",
//             //           minHeight: 80,
//             //           minWidth: 80,
//             //           maxHeight: 80,
//             //           maxWidth: 80,
//             //           css: "profimgcontainer",
//             //           template: `
//             //             <div class='profimg'>
//             //                 <img class='imgprof' src='/iso/images/logo-icon-iso.png'/>
//             //             </div>`,
//             //         },
//             //         {
//             //           rows: [
//             //             {
//             //               cols: [
//             //                 {
//             //                   rows: [
//             //                     {},
//             //                     {
//             //                       view: "template",
//             //                       width: 100,
//             //                       template: "ISO Jepang",
//             //                       autoheight: true,
//             //                     },
//             //                     {},
//             //                   ],
//             //                 },
//             //                 { width: 20 },
//             //                 {
//             //                   rows: [
//             //                     {},
//             //                     {
//             //                       maxWidth: 150,
//             //                       view: "template",
//             //                       template: "Tanda Bintang",
//             //                       autoheight: true,
//             //                     },
//             //                     {},
//             //                   ],
//             //                 },
//             //               ],
//             //             },
//             //           ],
//             //         },
//             //       ],
//             //     },
//             //   ],
//             // },
//           ],
//         },
//         {
//           minWidth: 300,
//           maxWidth: 300,
//           rows: [
//             {
//               view: "template",
//               template:
//                 "At hear lot let only protocol die old baked. Resources principles yet.",
//               autoheight: true,
//             },
//             {
//               height: 20,
//             },
//             {
//               view: "template",
//               template:
//                 "At hear lot let only protocol die old baked. Resources principles yet.",
//               autoheight: true,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// webix.ready(function () {
//   grid = webix.ui({
//     container: "index-page",
//     rows: [layout],
//   });

//   webix.event(window, "resize", function () {
//     grid.adjust();
//   });
// });

var dataview = {
  view: "dataview",
  id: "dataview1",
  autoheight: true,
  css: "dataviewcont",
  xCount: 1,
  type: {
    height: 1500,
    width: "auto",
  },
  template: `
    <div class='row'>
      <div class='col-lg-8'>
        <h6 class='classTitle'>#title#</h6>
        <div class='d-flex align-items-end gap-3'>
          <img class='imgprof mt-3' src='/iso/images/logo-icon-iso.png'/>
          <span class='authorcont mb-3'>ISO Jepang</span>
          <span class='starcont mb-3'>4.9</span>
        </div>
        #topics#
        <img class='imgthumb' src='#thumbnailBase64#'/>
        <ul class="nav button-tab nav-pills mb-16" id="pills-tab-three" role="tablist" style='margin-top: 28px;'>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-primary-light radius-4 px-16 py-10 active" id="pills-button-deskripsi-tab" data-bs-toggle="pill" data-bs-target="#pills-button-deskripsi" type="button" role="tab" aria-controls="pills-button-deskripsi" aria-selected="true">Deskripsi</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-primary-light radius-4 px-16 py-10" id="pills-button-kurikulum-tab" data-bs-toggle="pill" data-bs-target="#pills-button-kurikulum" type="button" role="tab" aria-controls="pills-button-kurikulum" aria-selected="false">Kurikulum</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tab-threeContent">
          <div class="tab-pane fade show active" id="pills-button-deskripsi" role="tabpanel" aria-labelledby="pills-button-deskripsi-tab" tabindex="0">
            #description#
          </div>
          <div class="tab-pane fade" id="pills-button-kurikulum" role="tabpanel" aria-labelledby="pills-button-kurikulum-tab" tabindex="0">
              #sections#
          </div>
        </div>
      </div>
      <div class='col-lg-4'>
        <div class='mt-3 mt-lg-0' style='display:flex; flex-direction:column; row-gap:10px; border: 1px solid #d4d4d4; padding:28px; border-radius: 10px'>
          <div class='d-flex align-items-end gap-1'>
            <h5 style='font-weight:500;color:#316AFF; margin-bottom:0px'>Populer</h5>
            <span>/Kelas</span>
          </div>
          <hr/>
          <div class='d-flex align-items-center gap-3'>
            <iconify-icon icon='solar:user-bold' style='font-size: 16px;color: #316AFF'></iconify-icon>
            <span>Mentor : #mentorId#</span>
          </div>
          <hr/>
          <div class='d-flex align-items-center gap-3'>
            <iconify-icon icon='solar:clock-circle-bold' style='font-size: 16px;color: #316AFF'></iconify-icon>
            <span>Durasi : #duration# Jam</span>
          </div>
          <hr/>
          <div class='d-flex align-items-center gap-3'>
            <iconify-icon icon='solar:sort-from-bottom-to-top-bold' style='font-size: 16px;color: #316AFF'></iconify-icon>
            <span>Level : #level#</span>
          </div>
          <hr/>
          <div class='d-flex align-items-center gap-3'>
            <iconify-icon icon='solar:file-bold' style='font-size: 16px;color: #316AFF'></iconify-icon>
            <span>Pelatihan : #month# Bulan</span>
          </div>
          <hr/>
          <div class='d-flex align-items-center gap-3'>
            <iconify-icon icon='solar:laptop-linear' style='font-size: 16px;color: #316AFF'></iconify-icon>
            <span>Format : #format#</span>
          </div>
          <a href="/kelas/join/#id#" class='btn btn-primary mt-5' id="btnDaftarKelas">Daftar Kelas</a>
        </div>
        <div class='mt-3' style='display:flex; flex-direction:column; row-gap:14px; padding:28px; border-radius: 10px;'>
          <h6 style='font-weight:500;color:#316AFF; margin-bottom:0px'>Ada Pertanyaan ?</h6>
          <span>
                Jika teman-teman ingin bertanya seputar
                magang, tokutei ginou, dan sekolah di
                Jepang silahkan meneka tombol whatsapp
                berwarna hijau atau hubungi nomor
                dibawah ini yah.
          </span>
          <div class='d-flex flex-column gap-1'>
              <div class='d-flex align-items-center gap-3'>
                  <iconify-icon icon='solar:phone-bold' style='font-size: 16px;color: #316AFF'></iconify-icon>
                  <span>
                      (+62) 811 9776 887
                  </span>
              </div>
              <div class='d-flex align-items-center gap-3'>
                  <iconify-icon icon='fa-solid:envelope' style='font-size: 16px;color: #316AFF'></iconify-icon>
                  <span>
                      isojepang@gmail.com
                  </span>
              </div>
          </div>
        </div>
      </div>
    </div>`,
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [dataview],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  // document
  //   .getElementById("btnDaftarKelas")
  //   .addEventListener("click", function () {
  //     window.location.href = "/kelas/join/" + id;
  //   });

  loadData();
});
