function loadQuestionData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/iso/api/interview/question?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            question: item.question,
            status: item.status,
          };
        });

        $$("table").clearAll();
        $$("table").hideOverlay();
        $$("table").parse(transformedData);
      } else {
        $$("table").clearAll();
        $$("table").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch((err) => {
      $$("table").clearAll();
      $$("table").showOverlay("Failed to load data.");
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    })
    .finally(function () {
      $$("table").hideProgress();
    });
}

function getQuestionDataById(id) {
  webix
    .ajax()
    .headers({
      Authorization: "Bearer " + token,
    })
    .get("http://localhost:3000/iso/api/interview/question/detail/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("question").setValue(datanya.data.question);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function changeStatus(id, status) {
  axios
    .put(
      `http://localhost:3000/iso/api/interview/question/edit/status/${id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadQuestionData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function deleteQuestion(id) {
  axios
    .delete(`http://localhost:3000/iso/api/interview/question/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadQuestionData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var form = {
  view: "form",
  id: "questionForm",
  elements: [
    {
      view: "text",
      hidden: true,
      name: "id",
      id: "id",
    },
    {
      view: "text",
      name: "question",
      id: "question",
      label: "Pertanyaan Wawancara",
      labelPosition: "top",
      required: true,
      minWidth: 300,
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
          click: submit_question,
        },
      ],
    },
  ],
  rules: {
    question: webix.rules.isNotEmpty,
  },
};

var myWin = webix.ui({
  view: "window",
  id: "myWin",
  position: "center",
  head: {
    cols: [
      { template: "Form", type: "header", borderless: true },
      {
        view: "icon",
        icon: "wxi-close",
        click: function () {
          $$("questionForm").clear();
          myWin.hide();
        },
      },
    ],
  },
  body: form,
});

var statusCombo = {
  view: "combo",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "0", value: "Inactive" },
    { id: "1", value: "Active" },
  ],
  width: 100,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadQuestionData(newValue);
    },
  },
};

var searchForm = {
  maxWidth: 230,
  minWidth: 160,
  view: "text",
  id: "textSearch",
  placeholder: "Ketik disini untuk mencari data",
  align: "right",
  on: {
    onTimedKeyPress: function () {
      $$("table").filterByAll();
    },
  },
};

var toolbar = {
  view: "toolbar",
  paddingY: 2,
  cols: [statusCombo, {}, searchForm],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";
var changeActive =
  "<span class='webix_icon me-1 activeBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-check-rounded-outline' style='color:#6e006e;'></iconify-icon></span>";
var changeInactive =
  "<span class='webix_icon me-1 inactiveBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-cross-linear' style='color:#6e006e;'></iconify-icon></span>";

var tabcols = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "question",
    header: "Pertanyaan",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
];

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  autoheight: true,
  onClick: {
    delBtn: function (event, id, node) {
      deleteQuestion(id.row);
    },
    editBtn: function (event, id, node) {
      $$("myWin").show();
      $$("id").setValue(id.row);
      getQuestionDataById(id.row);
    },
    activeBtn: function (event, id, node) {
      changeStatus(id.row, "1");
    },
    inactiveBtn: function (event, id, node) {
      changeStatus(id.row, "0");
    },
  },
  scheme: {
    $change: function (obj) {
      if (obj.status === "1") {
        obj.action = edit + changeInactive + trash;
        obj.status = `<div class="row-green">ACTIVE</div>`;
      } else {
        obj.action = edit + changeActive + trash;
        obj.status = `<div class="row-red">INACTIVE</div>`;
      }
    },
  },
  navigation: true,
  pager: "pager",
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
  rows: [table, pagination],
};

var title = {
  view: "template",
  template: `<div style='display:flex; align-items:center; justify-content: space-between'>
                <span style='font-size: 1.5rem'>Daftar Pertanyaan Wawancara</span>
                <button class='btn btn-primary' id="tambahBtn">Tambah</button>
            </div>`,
  autoheight: true,
  css: "title",
};

function submit_question() {
  const form = $$("questionForm");
  if (form.validate()) {
    var formData = form.getValues();

    if (formData.id === "") {
      webix
        .ajax()
        .headers({ Authorization: "Bearer " + token })
        .post("http://localhost:3000/iso/api/interview/question", formData)
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Pertanyaan wawancara berhasil ditambahkan",
          });
          loadQuestionData();
          form.clear();
          $$("myWin").hide();
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
          "http://localhost:3000/iso/api/interview/question/edit/" +
            formData.id,
          formData
        )
        .then(function (data) {
          webix.message({
            type: "success",
            text: "Pertanyaan wawancara berhasil diperbaharui",
          });
          loadQuestionData();
          form.clear();
          $$("myWin").hide();
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, toolbar, datatable],
  });

  $$("table").registerFilter(
    $$("textSearch"),
    { columnId: "fullname" },
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
    }
  );

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  document.getElementById("tambahBtn").addEventListener("click", function () {
    $$("myWin").show();
  });

  loadQuestionData();
});
