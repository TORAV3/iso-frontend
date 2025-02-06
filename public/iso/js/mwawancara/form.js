function loadClassData(classId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/class/detail/" + classId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("id").setValue(datanya.data.id);
      $$("title").setValue(datanya.data.title);
      $$("subtitle").setValue(datanya.data.subtitle);
      $$("type").setValue(datanya.data.type);
      $$("level").setValue(datanya.data.level);
      $$("mentorId").setValue(datanya.data.mentorId);
      $$("format").setValue(datanya.data.format);
      $$("duration").setValue(datanya.data.duration);
      $$("month").setValue(datanya.data.month);
      $$("description").setValue(datanya.data.description);

      if (datanya.data.thumbnail && datanya.data.thumbnailBase64) {
        const videoURL = datanya.data.thumbnailBase64;
        const videoPreview = document.getElementById("uploaded-img__preview");
        const uploadedImgContainer = document.querySelector(".uploaded-img");

        videoPreview.src = videoURL;
        uploadedImgContainer.classList.remove("d-none");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadSubsectionData(sectionId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/subsection/sectionId/" + sectionId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (item) {
          return {
            id: item.id,
            value: item.value,
          };
        });

        $$("subsectionTable").clearAll();
        $$("subsectionTable").hideOverlay();
        $$("subsectionTable").parse(transformedData);
      } else {
        $$("subsectionTable").clearAll();
        $$("subsectionTable").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function getSubsectionDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/subsection/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("subsectionId").setValue(datanya.data.id);
      $$("sectionIdCombo").setValue(datanya.data.sectionId);
      $$("subsectionValue").setValue(datanya.data.value);
      $$("subsectionMateri").setValue(datanya.data.materi);

      if (datanya.data.video && datanya.data.videoUrl) {
        const videoURL = "http://localhost:3000" + datanya.data.videoUrl;
        const videoPreview = document.getElementById(
          "uploaded-video-subsection__preview"
        );
        const uploadedImgContainer = document.querySelector(
          ".uploaded-video-subsection"
        );

        videoPreview.src = videoURL;
        uploadedImgContainer.classList.remove("d-none");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadSectionData(classId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/section/classId/" + classId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (item) {
          return {
            id: item.id,
            value: item.value,
          };
        });

        $$("sectionTable").clearAll();
        $$("sectionTable").hideOverlay();
        $$("sectionTable").parse(transformedData);
        $$("subsectionContainer").enable();

        const sectionCombo = $$("sectionIdCombo");
        sectionCombo.define("options", transformedData);
        sectionCombo.refresh();
      } else {
        $$("sectionTable").clearAll();
        $$("sectionTable").showOverlay("Maaf, data tidak ditemukan");
        $$("subsectionContainer").disable();
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function getSectionDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/section/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("sectionId").setValue(datanya.data.id);
      $$("sectionValue").setValue(datanya.data.value);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function deleteSectionDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .del("http://localhost:3000/iso/api/section/" + id)
    .then(function (data) {
      const classForm = $$("classForm");
      const classId = classForm.getValues().id;
      loadSectionData(classId);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadTopicData(classId) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/topic/classId/" + classId)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (item) {
          return {
            id: item.id,
            value: item.value,
          };
        });

        $$("topicTable").clearAll();
        $$("topicTable").hideOverlay();
        $$("topicTable").parse(transformedData);
      } else {
        $$("topicTable").clearAll();
        $$("topicTable").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function getTopicDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/topic/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("topicId").setValue(datanya.data.id);
      $$("topicValue").setValue(datanya.data.value);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function deleteTopicDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .del("http://localhost:3000/iso/api/topic/" + id)
    .then(function (data) {
      const classForm = $$("classForm");
      const classId = classForm.getValues().id;
      loadTopicData(classId);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

var form = {
  view: "form",
  id: "classForm",
  margin: 40,
  elements: [
    {
      id: "formres",
      rows: [
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  type: "hidden",
                  name: "id",
                  id: "id",
                  height: 0,
                },
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "title",
                          id: "title",
                          label: "Judul Kelas",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        {
                          view: "text",
                          name: "subtitle",
                          id: "subtitle",
                          label: "Subjudul Kelas",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "combo",
                          label: "Tipe Kelas",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "trial", value: "Kelas Trial" },
                            { id: "member", value: "Kelas Khusus" },
                          ],
                          minWidth: 300,
                          name: "type",
                          id: "type",
                          required: true,
                        },
                        {
                          view: "combo",
                          label: "Level Kelas",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "pemula", value: "Level Pemula" },
                            { id: "kompeten", value: "Level Kompeten" },
                            { id: "mahir", value: "Level Mahir" },
                          ],
                          minWidth: 300,
                          name: "level",
                          id: "level",
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "combo",
                          label: "Mentor",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "MNT250124001", value: "Ahmad Muzakir" },
                            { id: "MNT250124002", value: "Muza Alkindi" },
                          ],
                          minWidth: 300,
                          name: "mentorId",
                          id: "mentorId",
                          required: true,
                        },
                        {
                          view: "combo",
                          label: "Format Kelas",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "online", value: "Kelas Online" },
                            { id: "offline", value: "Kelas Offline" },
                          ],
                          minWidth: 300,
                          name: "format",
                          id: "format",
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "text",
                          type: "number",
                          name: "duration",
                          id: "duration",
                          label: "Durasi Waktu",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        {
                          view: "text",
                          type: "number",
                          name: "month",
                          id: "month",
                          label: "Lama Kelas",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      view: "label",
                      label:
                        "<span>Deskripsi<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      responsive: "row5",
                      cols: [
                        {
                          view: "ckeditor5",
                          name: "description",
                          id: "description",
                          required: true,
                          minWidth: 300,
                          minHeight: 400,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row7",
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "thumbnail",
                      id: "thumbnail",
                      readonly: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Thumbnail<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadthumbstyle",
                      template: `
                        <div class="upload-image-wrapper d-flex align-items-center gap-3">
                          <div class="uploaded-img d-none position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                            <button type="button" class="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex">
                              <iconify-icon icon="radix-icons:cross-2" class="text-xl text-danger-600"></iconify-icon>
                            </button>
                            <img id="uploaded-img__preview" class="w-100 h-100 object-fit-cover" src="/assets/images/user.png" alt="image">
                          </div>

                          <label class="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1" for="upload-file">
                            <iconify-icon icon="solar:camera-outline" class="text-xl text-secondary-light"></iconify-icon>
                            <span class="fw-semibold text-secondary-light">Upload</span>
                            <input id="upload-file" type="file" hidden>
                          </label>
                        </div>
                      `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("upload-file");
                          const imagePreview = document.getElementById(
                            "uploaded-img__preview"
                          );
                          const uploadedImgContainer =
                            document.querySelector(".uploaded-img");
                          const removeButton = document.querySelector(
                            ".uploaded-img__remove"
                          );

                          const thumbnail = $$("thumbnail");

                          fileInput.addEventListener("change", (e) => {
                            if (e.target.files.length) {
                              const file = e.target.files[0];
                              const reader = new FileReader();

                              reader.onload = function (event) {
                                const base64String = event.target.result;

                                thumbnail.setValue(base64String);

                                imagePreview.src = base64String;
                                uploadedImgContainer.classList.remove("d-none");
                              };

                              reader.readAsDataURL(file);
                            }
                          });

                          removeButton.addEventListener("click", () => {
                            imagePreview.src = "";
                            uploadedImgContainer.classList.add("d-none");
                            fileInput.value = "";

                            thumbnail.setValue("");
                          });
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Simpan",
          css: "btnSimpan",
          autowidth: true,
          click: submit_class,
        },
      ],
    },
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    subtitle: webix.rules.isNotEmpty,
    mentorId: webix.rules.isNotEmpty,
    type: webix.rules.isNotEmpty,
    level: webix.rules.isNotEmpty,
    format: webix.rules.isNotEmpty,
    duration: webix.rules.isNotEmpty,
    month: webix.rules.isNotEmpty,
    description: webix.rules.isNotEmpty,
  },
};

var editTopic =
  "<span class='webix_icon me-1 editTopicBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trashTopic =
  "<span class='webix_icon delTopicBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcols = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "value",
    header: "Topik",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
];

var table = {
  view: "datatable",
  id: "topicTable",
  css: "topicTableStyle",
  columns: tabcols,
  autoheight: true,
  minHeight: 100,
  navigation: true,
  pager: "pager",
  onClick: {
    delTopicBtn: function (event, id, node) {
      deleteTopicDataById(id.row);
    },
    editTopicBtn: function (event, id, node) {
      getTopicDataById(id.row);
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = editTopic + trashTopic;
    },
  },
};

var pagination = {
  view: "pager",
  id: "pager",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatable = {
  margin: 5,
  minWidth: 300,
  rows: [table, pagination],
};

var topicContainer = {
  id: "topicContainer",
  rows: [
    {
      responsive: "topicContainer",
      cols: [
        {
          view: "form",
          id: "topicForm",
          minWidth: 150,
          maxWidth: 550,
          elements: [
            {
              margin: 15,
              rows: [
                {
                  view: "text",
                  type: "hidden",
                  name: "topicId",
                  id: "topicId",
                  height: 0,
                },
                {
                  view: "text",
                  name: "topicValue",
                  id: "topicValue",
                  label: "Nama Topik",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "button",
                  value: "Simpan",
                  css: "btnSimpan",
                  autowidth: true,
                  click: submit_topic,
                },
              ],
            },
          ],
          rules: {
            topicValue: webix.rules.isNotEmpty,
          },
        },
        datatable,
      ],
    },
  ],
};

var editSection =
  "<span class='webix_icon me-1 editSectionBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trashSection =
  "<span class='webix_icon delSectionBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcolsSection = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "value",
    header: "Bab",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
];

var tableSection = {
  view: "datatable",
  id: "sectionTable",
  css: "sectionTableStyle",
  columns: tabcolsSection,
  autoheight: true,
  minHeight: 100,
  navigation: true,
  pager: "pagerSection",
  onClick: {
    delSectionBtn: function (event, id, node) {
      deleteSectionDataById(id.row);
    },
    editSectionBtn: function (event, id, node) {
      getSectionDataById(id.row);
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = editSection + trashSection;
    },
  },
};

var paginationSection = {
  view: "pager",
  id: "pagerSection",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatableSection = {
  margin: 5,
  minWidth: 300,
  rows: [tableSection, paginationSection],
};

var sectionContainer = {
  id: "sectionContainer",
  rows: [
    {
      responsive: "sectionContainer",
      cols: [
        {
          view: "form",
          id: "sectionForm",
          minWidth: 150,
          maxWidth: 550,
          elements: [
            {
              margin: 15,
              rows: [
                {
                  view: "text",
                  type: "hidden",
                  name: "sectionId",
                  id: "sectionId",
                  height: 0,
                },
                {
                  view: "text",
                  name: "sectionValue",
                  id: "sectionValue",
                  label: "Nama Bab",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "button",
                  value: "Simpan",
                  css: "btnSimpan",
                  autowidth: true,
                  click: submit_section,
                },
              ],
            },
          ],
          rules: {
            sectionValue: webix.rules.isNotEmpty,
          },
        },
        datatableSection,
      ],
    },
  ],
};

var editSubsection =
  "<span class='webix_icon me-1 editSubsectionBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trashSubsection =
  "<span class='webix_icon delSubsectionBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcolsSubsection = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "value",
    header: "Sub Bab",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
];

var tableSubsection = {
  view: "datatable",
  id: "subsectionTable",
  css: "subsectionTableStyle",
  columns: tabcolsSubsection,
  autoheight: true,
  minHeight: 100,
  navigation: true,
  pager: "pagerSubsection",
  onClick: {
    delSubsectionBtn: function (event, id, node) {
      deleteSubsectionDataById(id.row);
    },
    editSubsectionBtn: function (event, id, node) {
      getSubsectionDataById(id.row);
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = editSubsection + trashSubsection;
    },
  },
};

var paginationSubsection = {
  view: "pager",
  id: "pagerSubsection",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatableSubsection = {
  margin: 5,
  minWidth: 300,
  rows: [tableSubsection, paginationSubsection],
};

var subsectionContainer = {
  id: "subsectionContainer",
  rows: [
    {
      responsive: "subsectionContainer",
      cols: [
        {
          view: "form",
          id: "subsectionForm",
          minWidth: 150,
          maxWidth: 550,
          elements: [
            {
              margin: 15,
              rows: [
                {
                  view: "text",
                  type: "hidden",
                  name: "subsectionId",
                  id: "subsectionId",
                  height: 0,
                },
                {
                  view: "combo",
                  label: "Bab",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "sectionId",
                  id: "sectionIdCombo",
                  on: {
                    onChange: function (newValue) {
                      loadSubsectionData(newValue);
                    },
                  },
                },
                {
                  view: "text",
                  name: "subsectionValue",
                  id: "subsectionValue",
                  label: "Nama Sub Bab",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  id: "rowMateriSubsection",
                  margin: 10,
                  rows: [
                    {
                      view: "label",
                      label:
                        "<span>Materi<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      responsive: "rowMateriSubsection",
                      cols: [
                        {
                          view: "ckeditor5",
                          name: "subsectionMateri",
                          id: "subsectionMateri",
                          required: true,
                          minWidth: 300,
                          minHeight: 400,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "rowVideoSubsection",
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "subsectionVideo",
                      id: "subsectionVideo",
                      readonly: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Video Pembelajaran<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadthumbstyle",
                      template: `
                        <div class="upload-image-wrapper d-flex align-items-center gap-3">
                          <div class="uploaded-video-subsection d-none position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                            <button type="button" class="uploaded-video-subsection__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex">
                              <iconify-icon icon="radix-icons:cross-2" class="text-xl text-danger-600"></iconify-icon>
                            </button>
                            <video id="uploaded-video-subsection__preview" class="w-100 h-100 object-fit-cover" controls>
                              <source src="" type="video/mp4">
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          <label class="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1" for="upload-video-subsection">
                            <iconify-icon icon="solar:camera-outline" class="text-xl text-secondary-light"></iconify-icon>
                            <span class="fw-semibold text-secondary-light">Upload</span>
                            <input id="upload-video-subsection" type="file" accept="video/*" hidden>
                          </label>
                        </div>
                      `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput = document.getElementById(
                            "upload-video-subsection"
                          );
                          const imagePreview = document.getElementById(
                            "uploaded-video-subsection__preview"
                          );
                          const uploadedImgContainer = document.querySelector(
                            ".uploaded-video-subsection"
                          );
                          const removeButton = document.querySelector(
                            ".uploaded-video-subsection__remove"
                          );

                          const subsectionVideo = $$("subsectionVideo");

                          fileInput.addEventListener("change", (e) => {
                            if (e.target.files.length) {
                              const file = e.target.files[0];

                              subsectionVideo.config.file = file;
                              subsectionVideo.setValue(file.name);

                              const fileURL = URL.createObjectURL(file);
                              imagePreview.src = fileURL;
                              uploadedImgContainer.classList.remove("d-none");
                            }
                          });

                          removeButton.addEventListener("click", () => {
                            imagePreview.src = "";
                            uploadedImgContainer.classList.add("d-none");
                            fileInput.value = "";

                            subsectionVideo.setValue("");
                            delete subsectionVideo.config.file;
                          });
                        },
                      },
                    },
                  ],
                },
                {
                  view: "button",
                  value: "Simpan",
                  css: "btnSimpan",
                  autowidth: true,
                  click: submit_subsection,
                },
              ],
            },
          ],
          rules: {
            sectionId: webix.rules.isNotEmpty,
            subsectionValue: webix.rules.isNotEmpty,
            subsectionMateri: webix.rules.isNotEmpty,
          },
        },
        datatableSubsection,
      ],
    },
  ],
};

function submit_class() {
  const form = $$("classForm");
  if (form.validate()) {
    var formData = form.getValues();
    formData.duration = parseInt(formData.duration);
    formData.month = parseInt(formData.month);

    if (formData.id === "") {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .post("http://localhost:3000/iso/api/class", formData)
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          $$("id").setValue(datanya.data.id);
          webix.message({
            type: "success",
            text: "Kelas berhasil ditambahkan",
          });
          loadTopicData(datanya.data.id);
          $$("topicContainer").enable();
          loadSectionData(datanya.data.id);
          $$("sectionContainer").enable();
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    } else {
      if (formData.thumbnail === "") {
        delete formData.thumbnail;
      }

      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .put("http://localhost:3000/iso/api/class/" + formData.id, formData)
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          webix.message({
            type: "success",
            text: "Kelas berhasil diperbaharui",
          });
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

function submit_topic() {
  const form = $$("topicForm");
  if (form.validate()) {
    const classForm = $$("classForm");
    const classId = classForm.getValues().id;

    var formData = form.getValues();

    const formSubmit = {
      value: formData.topicValue,
      classId,
    };

    if (formData.topicId === "") {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .post("http://localhost:3000/iso/api/topic", formSubmit)
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Topik berhasil ditambahkan",
          });
          form.clear();
          loadTopicData(classId);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    } else {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .put(
          "http://localhost:3000/iso/api/topic/" + formData.topicId,
          formSubmit
        )
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Topik berhasil diperbaharui",
          });
          form.clear();
          loadTopicData(classId);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

function submit_section() {
  const form = $$("sectionForm");
  if (form.validate()) {
    const classForm = $$("classForm");
    const classId = classForm.getValues().id;

    var formData = form.getValues();

    const formSubmit = {
      value: formData.sectionValue,
      classId,
    };

    if (formData.sectionId === "") {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .post("http://localhost:3000/iso/api/section", formSubmit)
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Bab berhasil ditambahkan",
          });
          form.clear();
          loadSectionData(classId);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    } else {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .put(
          "http://localhost:3000/iso/api/section/" + formData.topicId,
          formSubmit
        )
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Bab berhasil diperbaharui",
          });
          form.clear();
          loadSectionData(classId);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

function submit_subsection() {
  const form = $$("subsectionForm");
  if (form.validate()) {
    var formValues = form.getValues();
    const formData = new FormData();

    formData.append("sectionId", formValues.sectionId || "");
    formData.append("value", formValues.subsectionValue || "");
    formData.append("materi", formValues.subsectionMateri || "");

    if ($$("subsectionVideo").config.file) {
      formData.append("video", $$("subsectionVideo").config.file);
    }

    const url =
      formValues.subsectionId === ""
        ? "http://localhost:3000/iso/api/subsection"
        : `http://localhost:3000/iso/api/subsection/${formValues.subsectionId}`;

    const method = formValues.subsectionId === "" ? "POST" : "PUT";

    fetch(url, {
      method: method,
      headers: { Authorization: "Bearer " + token },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        webix.message({
          type: "success",
          text:
            method === "POST"
              ? "Sub bab berhasil ditambahkan"
              : "Bab berhasil diperbaharui",
        });

        $$("subsectionForm").setValues({
          subsectionId: "",
          sectionIdCombo: formValues.sectionId,
          subsectionValue: "",
          subsectionMateri: "",
          subsectionVideo: "",
        });

        const fileInput = document.getElementById("upload-video-subsection");
        const imagePreview = document.getElementById(
          "uploaded-video-subsection__preview"
        );
        const uploadedImgContainer = document.querySelector(
          ".uploaded-video-subsection"
        );

        uploadedImgContainer.classList.add("d-none");
        imagePreview.src = "";

        fileInput.value = "";

        $$("subsectionVideo").setValue("");
        delete $$("subsectionVideo").config.file;

        if (method === "POST") {
          loadSubsectionData(formValues.sectionId);
        } else {
          loadSubsectionData(formValues.sectionId);
        }
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        webix.message({ type: "error", text: "Terjadi kesalahan pada server" });
      });
  }
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [
      form,
      { height: 10 },
      topicContainer,
      { height: 10 },
      sectionContainer,
      { height: 10 },
      subsectionContainer,
    ],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  if (window.pageId) {
    loadClassData(window.pageId);
    loadTopicData(window.pageId);
    $$("topicContainer").enable();
    loadSectionData(window.pageId);
    $$("sectionContainer").enable();
  }

  // $$("topicContainer").disable();
  // $$("sectionContainer").disable();
  // $$("subsectionContainer").disable();
});
