function loadClassData(status = "all", type = "all", topicParam = "all") {
  $$("table").showProgress({
    type: "icon",
  });

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
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          var classFormat, classType, classLevel;

          switch (item.format) {
            case "offline":
              classFormat = "Kelas Offline";
              break;
            default:
              classFormat = "Kelas Online";
              break;
          }

          switch (item.type) {
            case "trial":
              classType = "Kelas Trial";
              break;
            default:
              classType = "Kelas Khusus Member";
              break;
          }

          switch (item.level) {
            case "pemula":
              classLevel = "Level Pemula";
              break;
            case "pemula":
              classLevel = "Level Kompeten";
              break;
            default:
              classLevel = "Level Mahir";
              break;
          }

          return {
            id: item.id,
            title: item.title.toUpperCase(),
            mentorId: item.mentorId,
            duration: item.duration + " menit",
            level: classLevel,
            month: item.month + " bulan",
            format: classFormat,
            type: classType,
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

function changeStatus(id, status) {
  axios
    .put(
      `http://localhost:3000/iso/api/class/edit/status/${id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadClassData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function deleteClass(id) {
  axios
    .delete(`http://localhost:3000/iso/api/class/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadClassData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var typeCombo = {
  view: "combo",
  id: "typeCombo",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "trial", value: "Kelas Trial" },
    { id: "member", value: "Kelas Khusus Member" },
  ],
  width: 200,
  name: "type",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadClassData($$("statusCombo").getValue(), newValue);
    },
  },
};

var statusCombo = {
  view: "combo",
  id: "statusCombo",
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
      loadClassData(newValue, $$("typeCombo").getValue());
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
  cols: [statusCombo, typeCombo, {}, searchForm],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";
var changeActive =
  "<span class='webix_icon me-1 activeBtn' style='cursor:pointer;'><iconify-icon icon='solar:check-circle-outline' style='color:#6e006e;'></iconify-icon></span>";
var changeInactive =
  "<span class='webix_icon me-1 inactiveBtn' style='cursor:pointer;'><iconify-icon icon='solar:shield-cross-outline' style='color:#6e006e;'></iconify-icon></span>";

var tabcols = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "title",
    header: "Nama Kelas",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
  { id: "mentorId", header: "Nama Mentor", width: 240, sort: "string" },
  {
    id: "duration",
    header: { text: "Durasi Kelas", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
  {
    id: "level",
    header: { text: "Level Kelas", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 130,
    sort: "string",
  },
  {
    id: "month",
    header: { text: "Lama Kelas", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 130,
    sort: "string",
  },
  {
    id: "format",
    header: { text: "Format Kelas", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 120,
    sort: "string",
  },
  {
    id: "type",
    header: { text: "Tipe Kelas", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 180,
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
      deleteClass(id.row);
    },
    editBtn: function (event, id, node) {
      window.location.href = `/manajemen-kelas/edit/${id.row}`;
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
  template: "Daftar Kelas",
  autoheight: true,
  css: "title",
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, toolbar, datatable],
  });

  $$("table").registerFilter(
    $$("textSearch"),
    { columnId: "title" },
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

  loadClassData();
});
