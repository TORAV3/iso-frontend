function handleClick(element) {
  const subsectionId = element.getAttribute("data-id");
  console.log("Clicked subsection ID:", subsectionId);

  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/subsection/" + subsectionId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());
      console.log(datanya);

      var newThumbsHtml = `
      <video controls class="video-container">
        <source src="http://localhost:3000${datanya.data.videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      `;

      var newMateriHtml = `
      <div class="w-100" style='margin-top: 28px'>
          ${datanya.data.materi}
      </div>
      `;

      const dataviewId = Object.keys($$("dataview1").data.pull)[0];
      let currentData = $$("dataview1").data.pull[dataviewId];

      $$("dataview1").updateItem(currentData.id, {
        ...currentData,
        emptyMateri: newMateriHtml,
        emptyThumbs: newThumbsHtml,
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

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

        var emptyThumbsHtml = `
        <div class="emptythumbs" >
            <span>Pilih Sub Bab Untuk Menampilkan Video</span>
        </div>`;

        var emptyMateriHtml = `
        <div class="emptymateri" >
            <span>Pilih Sub Bab Untuk Menampilkan Materi</span>
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
                                <li class="list-group-item border text-secondary-light p-16 bg-neutral-50 border-bottom-0" data-id="${
                                  subsection.id
                                }" onclick="handleClick(this)">
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
          testId: datanya.data.tests[0].id,
          emptyThumbs: emptyThumbsHtml,
          emptyMateri: emptyMateriHtml,
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
      <div class='col-lg-7'>
        #emptyThumbs#
        <ul class="nav button-tab nav-pills mb-16" id="pills-tab-three" role="tablist" style='margin-top: 28px;'>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-primary-light radius-4 px-16 py-10 active" id="pills-button-materi-tab" data-bs-toggle="pill" data-bs-target="#pills-button-materi" type="button" role="tab" aria-controls="pills-button-materi" aria-selected="true">Materi</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tab-threeContent">
          <div class="tab-pane fade show active" id="pills-button-materi" role="tabpanel" aria-labelledby="pills-button-materi-tab" tabindex="0">
            #emptyMateri#
          </div>
        </div>
      </div>
      <div class='col-lg-5 mt-3 mt-lg-0'>
        #sections#
        <a href="/kelas/ujian/#testId#" class='btn btn-primary mt-5'>Ikuti Ujian</a>
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

  loadData();
});
